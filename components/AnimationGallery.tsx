"use client";

import { useMemo, useState } from "react";
import { AnimationCard } from "@/components/AnimationCard";
import { AnimationModal } from "@/components/AnimationModal";
import { CategoryTabs } from "@/components/CategoryTabs";
import {
  animations,
  categories,
  type AnimationCategory,
  type AnimationExample,
} from "@/data/animations";

type ActiveCategory = AnimationCategory | "All";

export function AnimationGallery() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("All");
  const [selectedAnimation, setSelectedAnimation] =
    useState<AnimationExample | null>(null);

  const counts = useMemo(() => {
    return animations.reduce<Record<ActiveCategory, number>>(
      (accumulator, animation) => {
        accumulator.All += 1;
        accumulator[animation.category] += 1;
        return accumulator;
      },
      {
        All: 0,
        Entrance: 0,
        Attention: 0,
        Loaders: 0,
        Text: 0,
        Hover: 0,
      },
    );
  }, []);

  const filteredAnimations = useMemo(() => {
    if (activeCategory === "All") {
      return animations;
    }

    return animations.filter(
      (animation) => animation.category === activeCategory,
    );
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="grid gap-6 border-b border-zinc-200 pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-cyan-700">
              Tailimations
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl">
              Tailwind animation patterns with live previews.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
              Browse categorized motion snippets, preview each pattern in place,
              and copy the markup plus any required Tailwind CSS.
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-md border border-zinc-200 bg-white p-4">
              <dt className="text-xs font-medium uppercase text-zinc-500">
                Animations
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-zinc-950">
                {counts.All}
              </dd>
            </div>
            <div className="rounded-md border border-zinc-200 bg-white p-4">
              <dt className="text-xs font-medium uppercase text-zinc-500">
                Categories
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-zinc-950">
                {categories.length}
              </dd>
            </div>
            <div className="rounded-md border border-zinc-200 bg-white p-4">
              <dt className="text-xs font-medium uppercase text-zinc-500">
                Runtime
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-zinc-950">0</dd>
            </div>
          </dl>
        </header>

        <CategoryTabs
          activeCategory={activeCategory}
          categories={categories}
          counts={counts}
          onChange={setActiveCategory}
        />

        <section
          aria-label="Animation gallery"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {filteredAnimations.map((animation) => (
            <AnimationCard
              animation={animation}
              key={animation.id}
              onSelect={setSelectedAnimation}
            />
          ))}
        </section>
      </div>

      <AnimationModal
        animation={selectedAnimation}
        onClose={() => setSelectedAnimation(null)}
      />
    </main>
  );
}
