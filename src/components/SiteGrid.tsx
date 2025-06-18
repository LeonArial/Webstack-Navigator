
import { SiteCard } from "./SiteCard";
import { sitesData } from "@/data/sites";

interface SiteGridProps {
  selectedCategory: string;
  searchQuery: string;
}

export function SiteGrid({ selectedCategory, searchQuery }: SiteGridProps) {
  const filteredSites = sitesData.filter((site) => {
    const matchesCategory = selectedCategory === "all" || site.category === selectedCategory;
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         site.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const groupedSites = filteredSites.reduce((acc, site) => {
    if (!acc[site.category]) {
      acc[site.category] = [];
    }
    acc[site.category].push(site);
    return acc;
  }, {} as Record<string, typeof sitesData>);

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
        <div key={category}>
          {selectedCategory === "all" && (
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {categoryNames[category] || category}
            </h2>
          )}
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
