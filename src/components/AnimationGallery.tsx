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

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 6.98c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.8c0 .27.18.59.69.49A10.15 10.15 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

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

  const selectedAnimationIndex = useMemo(() => {
    if (!selectedAnimation) {
      return -1;
    }

    return animations.findIndex(
      (animation) => animation.id === selectedAnimation.id,
    );
  }, [selectedAnimation]);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-8">
        <header className="grid gap-6 border-b border-zinc-200 pb-6 pr-14 dark:border-zinc-800 sm:pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-cyan-700 dark:text-cyan-400">
              Tailimations
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
              Tailwind animation patterns with live previews.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
              Browse categorized motion snippets, preview each pattern in place,
              and copy the markup plus any required Tailwind CSS.
            </p>
            <a
              aria-label="Open Tailimations repository on GitHub in a new tab"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-cyan-200"
              href="https://github.com/sharjeelfaiq/tailimations"
              rel="noopener noreferrer"
              target="_blank"
            >
              <GitHubIcon />
              View on GitHub
            </a>
          </div>

          <dl className="grid grid-cols-1 gap-3 text-center min-[420px]:grid-cols-3">
            <div className="min-h-24 rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <dt className="text-xs font-medium uppercase text-zinc-500 dark:text-zinc-400">
                Animations
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                {counts.All}
              </dd>
            </div>
            <div className="min-h-24 rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <dt className="text-xs font-medium uppercase text-zinc-500 dark:text-zinc-400">
                Categories
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                {categories.length}
              </dd>
            </div>
            <div className="min-h-24 rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <dt className="text-xs font-medium uppercase text-zinc-500 dark:text-zinc-400">
                Runtime
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                CSS
              </dd>
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
          aria-labelledby={`tab-${activeCategory.toLowerCase()}`}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
          id="animation-gallery-panel"
          role="tabpanel"
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

      {selectedAnimation ? (
        <AnimationModal
          animations={animations}
          initialIndex={selectedAnimationIndex}
          key={selectedAnimation.id}
          onClose={() => setSelectedAnimation(null)}
        />
      ) : null}
    </main>
  );
}
