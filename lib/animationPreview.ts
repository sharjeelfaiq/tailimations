import type { AnimationExample } from "@/data/animations";

const DEFAULT_LOOP_INTERVAL_MS = 2400;

export function getLoopInterval(animation: AnimationExample) {
  return animation.loopIntervalMs ?? DEFAULT_LOOP_INTERVAL_MS;
}

export function getPreviewClassName(
  animation: AnimationExample,
  isActive: boolean,
) {
  if (!isActive) {
    return animation.elementBaseClassName;
  }

  return [
    animation.elementBaseClassName,
    animation.activeClassName,
    getSinglePlaybackClassName(animation.activeClassName),
  ]
    .filter(Boolean)
    .join(" ");
}

function getSinglePlaybackClassName(activeClassName: string) {
  if (activeClassName.includes("before:animate-")) {
    return "before:[animation-iteration-count:1]";
  }

  if (activeClassName.includes("animate-")) {
    return "[animation-iteration-count:1]";
  }

  return "";
}
