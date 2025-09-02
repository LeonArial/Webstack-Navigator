import {
  Wrench, 
  Shield,
  BookOpen,
  Palette,
  Code,
  Briefcase,
} from "lucide-react";

export const CATEGORIES = [
  {
    id: "tools",
    title: "工具",
    icon: Wrench,
  },
  {
    id: "security",
    title: "安全",
    icon: Shield,
  },
  {
    id: "education",
    title: "学习",
    icon: BookOpen,
  },
  {
    id: "design",
    title: "设计",
    icon: Palette,
  },
  {
    id: "code",
    title: "开发",
    icon: Code,
  },
  {
    id: "office",
    title: "办公",
    icon: Briefcase,
  }
] as const;

export const CATEGORY_MAP = CATEGORIES.reduce((acc, category) => {
  acc[category.id] = category.title;
  return acc;
}, {} as Record<string, string>);

export type CategoryId = typeof CATEGORIES[number]['id'];
