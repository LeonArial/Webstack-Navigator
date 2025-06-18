
import { useState } from "react";
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

interface AddSiteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSite: (site: any) => void;
}

export function AddSiteDialog({ open, onOpenChange, onAddSite }: AddSiteDialogProps) {
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSite = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
    };
    onAddSite(newSite);
    setFormData({
      name: "",
      description: "",
      url: "",
      category: "",
      tags: "",
      rating: 5
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>添加新网站</DialogTitle>
          <DialogDescription>
            填写网站信息来添加到导航中
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">网站名称</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">网站描述</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">网站链接</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">分类</Label>
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
            <Label htmlFor="tags">标签（用逗号分隔）</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              placeholder="例如：工具,效率,免费"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">评分 (1-5)</Label>
            <Input
              id="rating"
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
            <Button type="submit">添加网站</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
