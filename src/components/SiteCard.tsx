
import { useState } from "react";
import { ExternalLink, Star, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Site {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  rating: number;
}

interface SiteCardProps {
  site: Site;
}

export function SiteCard({ site }: SiteCardProps) {
  const [faviconError, setFaviconError] = useState(false);
  
  const handleVisit = () => {
    window.open(site.url, '_blank');
  };

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).origin;
      return `${domain}/favicon.ico`;
    } catch {
      return null;
    }
  };

  const handleFaviconError = () => {
    setFaviconError(true);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {!faviconError ? (
              <img 
                src={getFaviconUrl(site.url) || `https://www.google.com/s2/favicons?sz=64&domain_url=${site.url}`}
                alt={site.name}
                className="w-8 h-8 rounded"
                onError={handleFaviconError}
              />
            ) : (
              <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                <Globe className="w-4 h-4 text-gray-400" />
              </div>
            )}
            <div className="flex-1">
              <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                {site.name}
              </CardTitle>
              <div className="flex items-center space-x-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < site.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">{site.rating}</span>
              </div>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleVisit}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-600 mb-3 line-clamp-2">
          {site.description}
        </CardDescription>
        <div className="flex flex-wrap gap-1">
          {site.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
