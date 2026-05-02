"use client";

import { useState } from "react";
import type { AnimationExample } from "@/data/animations";
import { getPreviewClassName } from "@/utils/animationPreview";

type AnimationCardProps = {
  animation: AnimationExample;
  onSelect: (animation: AnimationExample) => void;
};

type AnimationMode = "idle" | "hover";

export function AnimationCard({ animation, onSelect }: AnimationCardProps) {
  const [animationMode, setAnimationMode] = useState<AnimationMode>("idle");
  const previewClassName = getPreviewClassName(
    animation,
    animationMode === "hover",
  );

  return (
    <button
      className="group flex h-full min-h-[25rem] flex-col overflow-hidden rounded-md border border-zinc-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-500 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-cyan-400"
      onClick={() => onSelect(animation)}
      onMouseLeave={() => setAnimationMode("idle")}
      type="button"
    >
      <div className="flex aspect-[16/9] min-h-40 items-center justify-center border-b border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
        <div
          className={previewClassName}
          onMouseEnter={() => setAnimationMode("hover")}
          onMouseLeave={() => setAnimationMode("idle")}
        >
          {animation.title}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex min-h-20 items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-cyan-700 dark:text-cyan-400">
              {animation.category}
            </p>
            <h2 className="mt-1 line-clamp-2 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
              {animation.title}
            </h2>
          </div>
          <span className="shrink-0 rounded-md border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            Open
          </span>
        </div>
        <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {animation.description}
        </p>
        <code className="mt-auto block truncate rounded-md bg-zinc-100 px-3 py-2 font-mono text-xs text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
          {animation.previewClassName}
        </code>
      </div>
    </button>
  );
}
