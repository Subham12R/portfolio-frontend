import { TechItem, TechCategory } from "@/data/tech.registry";

export function groupTech(items: TechItem[]) {
  const groups: Record<TechCategory, string[]> = {
    frontend: [],
    backend: [],
    devops: [],
    other: [],
  };

  items.forEach((item) => {
    const category = item.category ?? "other";
    groups[category].push(item.name);
  });

  return groups;
}
