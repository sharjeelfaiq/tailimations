"use client";

import { useEffect, useMemo, useState } from "react";
import type { AnimationExample } from "@/data/animations";
import {
  getLoopInterval,
  getPreviewClassName,
} from "@/lib/animationPreview";
import { copyToClipboard } from "@/lib/clipboard";

type AnimationModalProps = {
  animation: AnimationExample;
  onClose: () => void;
};

type AnimationMode = "idle" | "loop";

export function AnimationModal({ animation, onClose }: AnimationModalProps) {
  const [copied, setCopied] = useState<"snippet" | "css" | "all" | null>(null);
  const [animationMode, setAnimationMode] = useState<AnimationMode>("idle");
  const [loopCycle, setLoopCycle] = useState(0);

  const previewClassName = useMemo(() => {
    return getPreviewClassName(animation, animationMode === "loop");
  }, [animation, animationMode]);

  const fullCode = useMemo(() => {
    return animation.css
      ? `${animation.snippet}\n\n${animation.css}`
      : animation.snippet;
  }, [animation]);

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
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [animation, onClose]);

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
      className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-950/55 p-3 sm:items-center sm:p-6"
      role="dialog"
    >
      <button
        aria-label="Close animation details"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        type="button"
      />
      <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-md bg-white shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 p-5 sm:p-6">
          <div>
            <p className="text-xs font-semibold uppercase text-cyan-700">
              {animation.category}
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-zinc-950">
              {animation.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
              {animation.description}
            </p>
          </div>
          <button
            aria-label="Close"
            className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex min-h-72 items-center justify-center border-b border-zinc-200 bg-zinc-50 p-8 lg:border-b-0 lg:border-r">
            <div className={previewClassName} key={`${animation.id}-${loopCycle}`}>
              {animation.title}
            </div>
          </div>

          <div className="space-y-5 p-5 sm:p-6">
            <section>
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-zinc-950">Markup</h3>
                <button
                  className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-cyan-500 hover:text-zinc-950"
                  onClick={() => handleCopy("snippet", animation.snippet)}
                  type="button"
                >
                  {copied === "snippet" ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="max-h-48 overflow-auto rounded-md bg-zinc-950 p-4 text-xs leading-6 text-zinc-50">
                <code>{animation.snippet}</code>
              </pre>
            </section>

            {animation.css ? (
              <section>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-zinc-950">
                    Tailwind CSS
                  </h3>
                  <button
                    className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-cyan-500 hover:text-zinc-950"
                    onClick={() => handleCopy("css", animation.css ?? "")}
                    type="button"
                  >
                    {copied === "css" ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="max-h-56 overflow-auto rounded-md bg-zinc-950 p-4 text-xs leading-6 text-zinc-50">
                  <code>{animation.css}</code>
                </pre>
              </section>
            ) : null}

            <button
              className="w-full rounded-md bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
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
