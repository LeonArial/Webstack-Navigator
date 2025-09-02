import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { SiteTable } from "@/components/SiteTable";
import { SiteForm } from "@/components/SiteForm";
import { ArrowLeft, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Site, 
  getAllSites, 
  createSite, 
  updateSite, 
  deleteSite,
  CreateSiteRequest,
  UpdateSiteRequest
} from "@/services/api";

const Admin = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<Site | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  // 加载网站数据
  const loadSites = async () => {
    try {
      setLoading(true);
      const data = await getAllSites();
      setSites(data);
    } catch (error) {
      toast({
        title: "加载失败",
        description: "无法加载网站数据，请检查API服务是否正常运行",
        variant: "destructive",
      });
      console.error("Failed to load sites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSites();
  }, []);

  // 处理添加网站
  const handleAdd = () => {
    setEditingSite(null);
    setDialogOpen(true);
  };

  // 处理编辑网站
  const handleEdit = (site: Site) => {
    setEditingSite(site);
    setDialogOpen(true);
  };

  // 处理表单提交
  const handleSubmit = async (data: CreateSiteRequest | UpdateSiteRequest) => {
    try {
      setSubmitting(true);
      
      if (editingSite) {
        // 更新网站
        await updateSite(editingSite.id, data as UpdateSiteRequest);
        toast({
          title: "更新成功",
          description: "网站信息已更新",
        });
      } else {
        // 创建新网站
        await createSite(data as CreateSiteRequest);
        toast({
          title: "创建成功",
          description: "新网站已添加",
        });
      }
      
      setDialogOpen(false);
      setEditingSite(null);
      await loadSites(); // 重新加载数据
    } catch (error) {
      toast({
        title: editingSite ? "更新失败" : "创建失败",
        description: "操作失败，请重试",
        variant: "destructive",
      });
      console.error("Failed to submit site:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // 处理删除网站
  const handleDelete = async (id: string) => {
    try {
      await deleteSite(id);
      toast({
        title: "删除成功",
        description: "网站已删除",
      });
      await loadSites(); // 重新加载数据
    } catch (error) {
      toast({
        title: "删除失败",
        description: "删除操作失败，请重试",
        variant: "destructive",
      });
      console.error("Failed to delete site:", error);
    }
  };

  // 处理取消操作
  const handleCancel = () => {
    setDialogOpen(false);
    setEditingSite(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  返回首页
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Settings className="w-6 h-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">网站管理后台</h1>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              管理员界面
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                系统概览
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{sites.length}</div>
                  <div className="text-sm text-gray-600">总网站数</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {sites.filter(site => site.rating >= 4).length}
                  </div>
                  <div className="text-sm text-gray-600">高评分网站</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {new Set(sites.flatMap(site => site.tags)).size}
                  </div>
                  <div className="text-sm text-gray-600">标签总数</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <SiteTable
          sites={sites}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
          isLoading={loading}
        />
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSite ? "编辑网站" : "添加网站"}
            </DialogTitle>
          </DialogHeader>
          <SiteForm
            site={editingSite || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={submitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
