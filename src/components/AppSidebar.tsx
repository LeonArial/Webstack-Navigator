
import { 
  Home, 
  Code, 
  Palette, 
  Database, 
  Cloud, 
  Shield,
  Gamepad2,
  BookOpen,
  Briefcase,
  Users
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categories = [
  {
    id: "all",
    title: "全部",
    icon: Home,
  },
  {
    id: "development",
    title: "开发工具",
    icon: Code,
  },
  {
    id: "design",
    title: "设计创意",
    icon: Palette,
  },
  {
    id: "database",
    title: "数据存储",
    icon: Database,
  },
  {
    id: "cloud",
    title: "云服务",
    icon: Cloud,
  },
  {
    id: "security",
    title: "网络安全",
    icon: Shield,
  },
  {
    id: "education",
    title: "学习教育",
    icon: BookOpen,
  },
  {
    id: "entertainment",
    title: "娱乐游戏",
    icon: Gamepad2,
  },
  {
    id: "business",
    title: "商业办公",
    icon: Briefcase,
  },
  {
    id: "social",
    title: "社交媒体",
    icon: Users,
  },
];

export function AppSidebar({ selectedCategory, onCategorySelect }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold text-gray-900">WebStack</h2>
        <p className="text-sm text-gray-600">网站导航</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>分类</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.id}>
                  <SidebarMenuButton 
                    onClick={() => onCategorySelect(category.id)}
                  >
                    <category.icon className="h-4 w-4" />
                    <span>{category.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
