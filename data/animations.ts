export type AnimationCategory =
  | "Entrance"
  | "Attention"
  | "Loaders"
  | "Text"
  | "Hover";

export type AnimationExample = {
  id: string;
  title: string;
  category: AnimationCategory;
  description: string;
  previewClassName: string;
  elementClassName: string;
  snippet: string;
  css?: string;
};

export const categories: AnimationCategory[] = [
  "Entrance",
  "Attention",
  "Loaders",
  "Text",
  "Hover",
];

const basePill =
  "inline-flex min-h-16 min-w-36 items-center justify-center rounded-md border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-950 shadow-sm";

export const animations: AnimationExample[] = [
  {
    id: "fade-rise",
    title: "Fade Rise",
    category: "Entrance",
    description: "A compact entrance for cards, menus, and inline panels.",
    previewClassName: "animate-fade-rise",
    elementClassName: `${basePill} animate-fade-rise`,
    snippet:
      '<div className="animate-fade-rise rounded-md bg-white p-4 shadow-sm">Fade Rise</div>',
    css: `@theme inline {
  --animate-fade-rise: fade-rise 720ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

@keyframes fade-rise {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}`,
  },
  {
    id: "scale-pop",
    title: "Scale Pop",
    category: "Entrance",
    description: "A snappy scale-in motion for selected or newly inserted UI.",
    previewClassName: "animate-scale-pop",
    elementClassName: `${basePill} animate-scale-pop`,
    snippet:
      '<div className="animate-scale-pop rounded-md bg-white p-4 shadow-sm">Scale Pop</div>',
    css: `@theme inline {
  --animate-scale-pop: scale-pop 520ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes scale-pop {
  0% { opacity: 0; transform: scale(0.92); }
  70% { opacity: 1; transform: scale(1.03); }
  100% { opacity: 1; transform: scale(1); }
}`,
  },
  {
    id: "soft-pulse",
    title: "Soft Pulse",
    category: "Attention",
    description: "A restrained pulse for pending states and gentle emphasis.",
    previewClassName: "animate-soft-pulse",
    elementClassName: `${basePill} animate-soft-pulse`,
    snippet:
      '<div className="animate-soft-pulse rounded-md bg-white p-4 shadow-sm">Soft Pulse</div>',
    css: `@theme inline {
  --animate-soft-pulse: soft-pulse 1.8s ease-in-out infinite;
}

@keyframes soft-pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 1px 2px rgb(0 0 0 / 0.06); }
  50% { transform: scale(1.025); box-shadow: 0 16px 34px rgb(14 165 233 / 0.22); }
}`,
  },
  {
    id: "wobble",
    title: "Wobble",
    category: "Attention",
    description: "A short correction cue for invalid fields or interrupted actions.",
    previewClassName: "animate-wobble",
    elementClassName: `${basePill} animate-wobble`,
    snippet:
      '<div className="animate-wobble rounded-md bg-white p-4 shadow-sm">Wobble</div>',
    css: `@theme inline {
  --animate-wobble: wobble 680ms ease-in-out both;
}

@keyframes wobble {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-10px) rotate(-1deg); }
  40% { transform: translateX(8px) rotate(1deg); }
  60% { transform: translateX(-5px) rotate(-0.5deg); }
  80% { transform: translateX(3px) rotate(0.5deg); }
}`,
  },
  {
    id: "orbit-loader",
    title: "Orbit Loader",
    category: "Loaders",
    description: "A small loading indicator for buttons or compact empty states.",
    previewClassName: "animate-orbit",
    elementClassName:
      "relative h-16 w-16 rounded-full border border-zinc-200 bg-white shadow-sm before:absolute before:left-1/2 before:top-1/2 before:h-3 before:w-3 before:-translate-x-1/2 before:-translate-y-7 before:rounded-full before:bg-cyan-500 before:content-[''] animate-orbit",
    snippet: `<div className="relative h-8 w-8 animate-orbit rounded-full border border-zinc-200 before:absolute before:left-1/2 before:top-1/2 before:h-2 before:w-2 before:-translate-x-1/2 before:-translate-y-4 before:rounded-full before:bg-cyan-500 before:content-['']" />`,
    css: `@theme inline {
  --animate-orbit: orbit 1.1s linear infinite;
}

@keyframes orbit {
  to { transform: rotate(360deg); }
}`,
  },
  {
    id: "bar-loader",
    title: "Bar Loader",
    category: "Loaders",
    description: "A copy-paste progress shimmer that fits table and form rows.",
    previewClassName: "animate-bar-sweep",
    elementClassName:
      "h-3 w-44 overflow-hidden rounded-full bg-zinc-200 before:block before:h-full before:w-1/2 before:rounded-full before:bg-emerald-500 before:content-[''] before:animate-bar-sweep",
    snippet: `<div className="h-2 w-40 overflow-hidden rounded-full bg-zinc-200 before:block before:h-full before:w-1/2 before:rounded-full before:bg-emerald-500 before:content-[''] before:animate-bar-sweep" />`,
    css: `@theme inline {
  --animate-bar-sweep: bar-sweep 1.25s ease-in-out infinite;
}

@keyframes bar-sweep {
  0% { transform: translateX(-110%); }
  100% { transform: translateX(220%); }
}`,
  },
  {
    id: "text-reveal",
    title: "Text Reveal",
    category: "Text",
    description: "A masked title reveal for headings and empty-state labels.",
    previewClassName: "animate-text-reveal",
    elementClassName:
      "inline-block overflow-hidden text-2xl font-bold text-zinc-950 [clip-path:inset(0_100%_0_0)] animate-text-reveal",
    snippet:
      '<span className="inline-block animate-text-reveal overflow-hidden [clip-path:inset(0_100%_0_0)]">Text Reveal</span>',
    css: `@theme inline {
  --animate-text-reveal: text-reveal 900ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

@keyframes text-reveal {
  to { clip-path: inset(0 0 0 0); }
}`,
  },
  {
    id: "letter-float",
    title: "Letter Float",
    category: "Text",
    description: "A looped text accent for small badges or feature labels.",
    previewClassName: "animate-letter-float",
    elementClassName:
      "inline-flex min-h-16 items-center rounded-md px-5 text-2xl font-bold text-rose-600 animate-letter-float",
    snippet:
      '<span className="inline-flex animate-letter-float text-xl font-bold text-rose-600">Float</span>',
    css: `@theme inline {
  --animate-letter-float: letter-float 1.8s ease-in-out infinite;
}

@keyframes letter-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}`,
  },
  {
    id: "hover-lift",
    title: "Hover Lift",
    category: "Hover",
    description: "A durable card hover effect using only transition utilities.",
    previewClassName: "transition-transform duration-300 hover:-translate-y-1",
    elementClassName: `${basePill} transition-transform duration-300 hover:-translate-y-1`,
    snippet:
      '<button className="rounded-md bg-white p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">Hover Lift</button>',
  },
  {
    id: "hover-glow",
    title: "Hover Glow",
    category: "Hover",
    description: "A focusable hover state for call-to-action controls.",
    previewClassName:
      "transition duration-300 hover:border-amber-300 hover:shadow-[0_18px_40px_rgb(245_158_11_/_0.28)]",
    elementClassName: `${basePill} transition duration-300 hover:border-amber-300 hover:shadow-[0_18px_40px_rgb(245_158_11_/_0.28)]`,
    snippet:
      '<button className="rounded-md border border-zinc-200 bg-white px-4 py-3 transition duration-300 hover:border-amber-300 hover:shadow-[0_18px_40px_rgb(245_158_11_/_0.28)]">Hover Glow</button>',
  },
];
