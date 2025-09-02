
import { useState, useEffect } from "react";
import { SiteCard } from "./SiteCard";

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

  useEffect(() => {
    const loadSites = async () => {
      try {
        const response = await fetch('./sites.json');
        if (response.ok) {
          const data = await response.json();
          setSites(data);
        } else {
          console.error('Failed to load sites.json');
        }
      } catch (error) {
        console.error('Error loading sites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSites();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">加载中...</p>
      </div>
    );
  }

  const filteredSites = sites.filter((site) => {
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

  const categoryNames: Record<string, string> = {
    all: "所有",
  };

  if (filteredSites.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">没有找到相关网站</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedSites).map(([category, sites]) => (
        <div key={category} id={category}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {categoryNames[category] || category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sites.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
