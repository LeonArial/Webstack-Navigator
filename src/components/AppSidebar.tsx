import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CATEGORIES } from "@/constants/categories";

interface AppSidebarProps {
  onCategorySelect: (category: string) => void;
}

export function AppSidebar({ onCategorySelect }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold text-gray-900">运维中心</h2>
        <p className="text-sm text-gray-600">网站导航</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {CATEGORIES.map((category) => (
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
