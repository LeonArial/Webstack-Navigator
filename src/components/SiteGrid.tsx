import { useState, useEffect } from "react";
import { SiteCard } from "./SiteCard";
import { CATEGORY_MAP, CATEGORIES } from "@/constants/categories";

interface Site {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  rating: number;
}

interface SiteGridProps {
  searchQuery: string;
}

export function SiteGrid({ searchQuery }: SiteGridProps) {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSites = async () => {
      try {
        // 使用新的API接口
        const apiUrl = searchQuery 
          ? `http://localhost:5010/api/v1/sites?q=${encodeURIComponent(searchQuery)}`
          : 'http://localhost:5010/api/v1/sites';
          
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setSites(data);
        } else {
          console.error('Failed to load sites from API');
          // 如果API失败，回退到静态JSON文件
          const fallbackResponse = await fetch('./sites.json');
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            setSites(fallbackData);
          } else {
            setError('Failed to load sites from API and fallback');
          }
        }
      } catch (error) {
        console.error('Error loading sites:', error);
        setError('Error loading sites');
        // 如果API失败，回退到静态JSON文件
        try {
          const fallbackResponse = await fetch('./sites.json');
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            setSites(fallbackData);
          } else {
            setError('Failed to load sites from API and fallback');
          }
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
          setError('Failed to load sites from API and fallback');
        }
      } finally {
        setLoading(false);
      }
    };

    loadSites();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  // 如果使用API搜索，直接使用返回的结果
  const filteredSites = searchQuery ? sites : sites.filter((site) => {
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         site.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const groupedSites = filteredSites.reduce((acc, site) => {
    if (!acc[site.category]) {
      acc[site.category] = [];
    }
    acc[site.category].push(site);
    return acc;
  }, {} as Record<string, Site[]>);


  if (filteredSites.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">没有找到相关网站</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {CATEGORIES.map((category) => {
        const sites = groupedSites[category.id];
        if (!sites || sites.length === 0) return null;
        
        return (
          <div key={category.id} id={category.id}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {category.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sites.map((site) => (
                <SiteCard key={site.id} site={site} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
