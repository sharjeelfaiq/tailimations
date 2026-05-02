"use client";

import type { AnimationExample } from "@/data/animations";

type AnimationCardProps = {
  animation: AnimationExample;
  onSelect: (animation: AnimationExample) => void;
};

export function AnimationCard({ animation, onSelect }: AnimationCardProps) {
  return (
    <button
      className="group flex h-full min-h-72 flex-col overflow-hidden rounded-md border border-zinc-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-500 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
      onClick={() => onSelect(animation)}
      type="button"
    >
      <div className="flex min-h-40 items-center justify-center border-b border-zinc-100 bg-zinc-50 p-8">
        <div className={animation.elementClassName}>{animation.title}</div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-cyan-700">
              {animation.category}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-zinc-950">
              {animation.title}
            </h2>
          </div>
          <span className="rounded-md border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-500">
            Open
          </span>
        </div>
        <p className="text-sm leading-6 text-zinc-600">{animation.description}</p>
        <code className="mt-auto block truncate rounded-md bg-zinc-100 px-3 py-2 font-mono text-xs text-zinc-700">
          {animation.previewClassName}
        </code>
      </div>
    </button>
  );
}
