
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sitesData } from "@/data/sites";
import { AddSiteDialog } from "@/components/AddSiteDialog";
import { EditSiteDialog } from "@/components/EditSiteDialog";

export default function Admin() {
  const navigate = useNavigate();
  const [sites, setSites] = useState(sitesData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSite, setEditingSite] = useState(null);

  const handleDeleteSite = (siteId: string) => {
    setSites(sites.filter(site => site.id !== siteId));
  };

  const handleAddSite = (newSite: any) => {
    setSites([...sites, { ...newSite, id: Date.now().toString() }]);
  };

  const handleEditSite = (updatedSite: any) => {
    setSites(sites.map(site => site.id === updatedSite.id ? updatedSite : site));
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              返回首页
            </Button>
            <h1 className="text-2xl font-bold">后台管理</h1>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            添加网站
          </Button>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>网站管理</CardTitle>
              <CardDescription>
                管理网站导航中的所有网站，包括添加、编辑和删除功能
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sites.map((site) => (
                  <div key={site.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={`https://www.google.com/s2/favicons?sz=32&domain_url=${site.url}`}
                        alt={site.name}
                        className="w-8 h-8 rounded"
                        onError={(e) => {
                          e.currentTarget.src = '/favicon.ico';
                        }}
                      />
                      <div>
                        <h3 className="font-medium">{site.name}</h3>
                        <p className="text-sm text-gray-500">{site.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {categoryNames[site.category] || site.category}
                          </span>
                          <span className="text-xs text-gray-400">评分: {site.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingSite(site)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteSite(site.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <AddSiteDialog 
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddSite={handleAddSite}
      />

      {editingSite && (
        <EditSiteDialog
          open={!!editingSite}
          onOpenChange={() => setEditingSite(null)}
          site={editingSite}
          onEditSite={handleEditSite}
        />
      )}
    </div>
  );
}
