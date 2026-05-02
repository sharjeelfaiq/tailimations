"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const storageKey = "theme";
const themeChangeEvent = "tailimations-theme-change";

function getSystemTheme(): Theme {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}

function getInitialTheme(): Theme {
  const storedTheme = window.localStorage.getItem(storageKey);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return getSystemTheme();
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(themeChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(themeChangeEvent, onStoreChange);
  };
}

function getThemeSnapshot(): Theme {
  return getInitialTheme();
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M20.35 14.43A7.5 7.5 0 0 1 9.57 3.65 8.5 8.5 0 1 0 20.35 14.43Z" />
    </svg>
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  const isDark = theme === "dark";

  return (
    <>
      <button
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={isDark}
        className="fixed right-4 top-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:border-cyan-500 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-cyan-400 dark:hover:text-white"
        onClick={toggleTheme}
        type="button"
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
      {children}
    </>
  );
}
