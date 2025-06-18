
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteGrid } from "@/components/SiteGrid";
import { SearchBar } from "@/components/SearchBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

const Index = () => {

  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar 
          selectedCategory="all" // This prop is no longer used for filtering but kept for consistency
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
