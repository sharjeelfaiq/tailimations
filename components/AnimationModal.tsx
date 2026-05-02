"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { AnimationExample } from "@/data/animations";
import {
  getLoopInterval,
  getPreviewClassName,
} from "@/lib/animationPreview";
import { copyToClipboard } from "@/lib/clipboard";

type AnimationModalProps = {
  animations: AnimationExample[];
  initialIndex: number;
  onClose: () => void;
};

type AnimationMode = "idle" | "loop";

function clampAnimationIndex(index: number, animations: AnimationExample[]) {
  return Math.min(Math.max(index, 0), animations.length - 1);
}

function ChevronLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function AnimationModal({
  animations,
  initialIndex,
  onClose,
}: AnimationModalProps) {
  const [currentIndex, setCurrentIndex] = useState(() =>
    clampAnimationIndex(initialIndex, animations),
  );
  const [copied, setCopied] = useState<"snippet" | "css" | "all" | null>(null);
  const [animationMode, setAnimationMode] = useState<AnimationMode>("idle");
  const [loopCycle, setLoopCycle] = useState(0);
  const animation = animations[currentIndex];
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < animations.length - 1;

  const previewClassName = useMemo(() => {
    return getPreviewClassName(animation, animationMode === "loop");
  }, [animation, animationMode]);

  const fullCode = useMemo(() => {
    return animation.css
      ? `${animation.snippet}\n\n${animation.css}`
      : animation.snippet;
  }, [animation]);

  const handleNext = useCallback(() => {
    if (!canGoNext) {
      return;
    }

    setCopied(null);
    setAnimationMode("idle");
    setLoopCycle(0);
    setCurrentIndex((index) => clampAnimationIndex(index + 1, animations));
  }, [animations, canGoNext]);

  const handlePrevious = useCallback(() => {
    if (!canGoPrevious) {
      return;
    }

    setCopied(null);
    setAnimationMode("idle");
    setLoopCycle(0);
    setCurrentIndex((index) => clampAnimationIndex(index - 1, animations));
  }, [animations, canGoPrevious]);

  useEffect(() => {
    let frame = window.requestAnimationFrame(() => {
      setAnimationMode("loop");
    });
    const restartAnimation = () => {
      setAnimationMode("idle");
      setLoopCycle((cycle) => cycle + 1);
      frame = window.requestAnimationFrame(() => {
        setAnimationMode("loop");
      });
    };
    const interval = window.setInterval(
      restartAnimation,
      getLoopInterval(animation),
    );

    return () => {
      window.clearInterval(interval);
      window.cancelAnimationFrame(frame);
    };
  }, [animation]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevious();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleNext, handlePrevious, onClose]);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => setCopied(null), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function handleCopy(kind: "snippet" | "css" | "all", value: string) {
    await copyToClipboard(value);
    setCopied(kind);
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center overflow-x-hidden bg-zinc-950/55 px-3 py-4 dark:bg-black/70 sm:items-center sm:px-6 md:px-10"
      role="dialog"
    >
      <button
        aria-label="Close animation details"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        type="button"
      />
      <div className="relative max-h-[calc(100vh-2rem)] w-full max-w-5xl overflow-y-auto overflow-x-hidden rounded-md bg-white shadow-xl dark:bg-zinc-900 sm:max-h-[92vh]">
        <div className="flex flex-col gap-4 border-b border-zinc-200 p-5 dark:border-zinc-800 sm:flex-row sm:items-start sm:justify-between sm:p-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-cyan-700 dark:text-cyan-400">
              {animation.category}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-zinc-950 dark:text-zinc-50 sm:text-2xl">
              {animation.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {animation.description}
            </p>
          </div>
          <button
            aria-label="Close"
            className="min-h-11 rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white sm:min-h-0"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>

        <div className="grid min-w-0 gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="relative flex min-h-64 items-center justify-center border-b border-zinc-200 bg-zinc-50 px-16 py-8 dark:border-zinc-800 dark:bg-zinc-950 sm:min-h-72 lg:border-b-0 lg:border-r">
            <button
              aria-label="Previous animation"
              className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-zinc-200 bg-white/90 text-zinc-700 shadow-sm transition hover:border-cyan-500 hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-zinc-200 disabled:hover:text-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:border-cyan-400 dark:hover:text-white dark:disabled:hover:border-zinc-700 dark:disabled:hover:text-zinc-300"
              disabled={!canGoPrevious}
              onClick={handlePrevious}
              type="button"
            >
              <ChevronLeftIcon />
            </button>
            <div className={previewClassName} key={`${animation.id}-${loopCycle}`}>
              {animation.title}
            </div>
            <button
              aria-label="Next animation"
              className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-zinc-200 bg-white/90 text-zinc-700 shadow-sm transition hover:border-cyan-500 hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-zinc-200 disabled:hover:text-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:border-cyan-400 dark:hover:text-white dark:disabled:hover:border-zinc-700 dark:disabled:hover:text-zinc-300"
              disabled={!canGoNext}
              onClick={handleNext}
              type="button"
            >
              <ChevronRightIcon />
            </button>
          </div>

          <div className="min-w-0 space-y-5 p-5 sm:p-6">
            <section>
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                  Markup
                </h3>
                <button
                  className="min-h-11 rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-cyan-500 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-cyan-400 dark:hover:text-white sm:min-h-0"
                  onClick={() => handleCopy("snippet", animation.snippet)}
                  type="button"
                >
                  {copied === "snippet" ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="max-h-48 overflow-auto rounded-md bg-zinc-950 p-4 text-xs leading-6 text-zinc-50 dark:bg-black">
                <code>{animation.snippet}</code>
              </pre>
            </section>

            {animation.css ? (
              <section>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                    Tailwind CSS
                  </h3>
                  <button
                    className="min-h-11 rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-cyan-500 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-cyan-400 dark:hover:text-white sm:min-h-0"
                    onClick={() => handleCopy("css", animation.css ?? "")}
                    type="button"
                  >
                    {copied === "css" ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="max-h-56 overflow-auto rounded-md bg-zinc-950 p-4 text-xs leading-6 text-zinc-50 dark:bg-black">
                  <code>{animation.css}</code>
                </pre>
              </section>
            ) : null}

            <button
              className="min-h-11 w-full rounded-md bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-cyan-200"
              onClick={() => handleCopy("all", fullCode)}
              type="button"
            >
              {copied === "all" ? "Copied full snippet" : "Copy full snippet"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
