
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteGrid } from "@/components/SiteGrid";
import { SearchBar } from "@/components/SearchBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleCategorySelect = (category: string) => {
    if (category === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(category);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar 
          selectedCategory="all"
          onCategorySelect={handleCategorySelect}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1 flex justify-center">
              <SearchBar 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAdminClick}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              后台管理
            </Button>
          </header>
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  网站导航
                </h1>
                <p className="text-gray-600">
                  发现优质网站，提升工作效率
                </p>
              </div>
              <SiteGrid 
                searchQuery={searchQuery}
              />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
