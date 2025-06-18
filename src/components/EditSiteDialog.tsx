
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditSiteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  site: any;
  onEditSite: (site: any) => void;
}

export function EditSiteDialog({ open, onOpenChange, site, onEditSite }: EditSiteDialogProps) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    url: "",
    category: "",
    tags: "",
    rating: 5
  });

  const categories = [
    { value: "development", label: "开发工具" },
    { value: "design", label: "设计创意" },
    { value: "database", label: "数据存储" },
    { value: "cloud", label: "云服务" },
    { value: "security", label: "网络安全" },
    { value: "entertainment", label: "娱乐游戏" },
    { value: "education", label: "学习教育" },
    { value: "business", label: "商业办公" },
    { value: "social", label: "社交媒体" },
  ];

  useEffect(() => {
    if (site) {
      setFormData({
        id: site.id,
        name: site.name,
        description: site.description,
        url: site.url,
        category: site.category,
        tags: site.tags.join(', '),
        rating: site.rating
      });
    }
  }, [site]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSite = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
    };
    onEditSite(updatedSite);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>编辑网站</DialogTitle>
          <DialogDescription>
            修改网站信息
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">网站名称</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">网站描述</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-url">网站链接</Label>
            <Input
              id="edit-url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-category">分类</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({...formData, category: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-tags">标签（用逗号分隔）</Label>
            <Input
              id="edit-tags"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-rating">评分 (1-5)</Label>
            <Input
              id="edit-rating"
              type="number"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit">保存修改</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
