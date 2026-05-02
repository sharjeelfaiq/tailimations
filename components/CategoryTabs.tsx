"use client";

import type { AnimationCategory } from "@/data/animations";

type CategoryTabsProps = {
  categories: AnimationCategory[];
  activeCategory: AnimationCategory | "All";
  counts: Record<AnimationCategory | "All", number>;
  onChange: (category: AnimationCategory | "All") => void;
};

export function CategoryTabs({
  categories,
  activeCategory,
  counts,
  onChange,
}: CategoryTabsProps) {
  const tabs: (AnimationCategory | "All")[] = ["All", ...categories];

  return (
    <div
      aria-label="Animation categories"
      className="flex gap-2 overflow-x-auto border-b border-zinc-200 pb-3"
      role="tablist"
    >
      {tabs.map((category) => {
        const isActive = activeCategory === category;

        return (
          <button
            aria-selected={isActive}
            className={[
              "shrink-0 rounded-md border px-3 py-2 text-sm font-medium transition",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600",
              isActive
                ? "border-zinc-950 bg-zinc-950 text-white"
                : "border-zinc-200 bg-white text-zinc-700 hover:border-cyan-500 hover:text-zinc-950",
            ].join(" ")}
            key={category}
            onClick={() => onChange(category)}
            role="tab"
            type="button"
          >
            {category}
            <span className={isActive ? "ml-2 text-zinc-300" : "ml-2 text-zinc-400"}>
              {counts[category]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
