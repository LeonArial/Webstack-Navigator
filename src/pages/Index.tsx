
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
        const headerOffset = 80; // h-16 is 64px, add 16px margin
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar 
          onCategorySelect={handleCategorySelect}
        />
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1 flex justify-center">
              <SearchBar 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
          </header>
          <main className="flex-1 p-4">
            <div className="max-w-7xl mx-auto">
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
