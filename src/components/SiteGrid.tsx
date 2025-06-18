
import { useState, useEffect } from 'react';
import { SiteCard } from "./SiteCard";

interface SiteGridProps {
  searchQuery:string;
}

export function SiteGrid({ searchQuery }: SiteGridProps) {
  interface Site {
    id: string | number;
    category: string;
    // add other properties as needed
    [key: string]: any;
  }

  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSites() {
      try {
        const response = await fetch(`http://localhost:3001/api/sites?search=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSites(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSites();
  }, [searchQuery]);

  const groupedSites = sites.reduce((acc, site) => {
    if (!acc[site.category]) {
      acc[site.category] = [];
    }
    acc[site.category].push(site);
    return acc;
  }, {} as Record<string, any[]>);

  const categoryNames: Record<string, string> = {
    development: "开发工具",
    design: "设计创意",
    database: "数据存储",
    cloud: "云服务",
    security: "网络安全",
    entertainment: "娱乐游戏",
    education: "学习教育",
    business: "商业办公",
    social: "社交媒体",
  };

  if (!loading && sites.length === 0) {
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
