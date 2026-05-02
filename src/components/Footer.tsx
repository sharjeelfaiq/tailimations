export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 px-4 py-5 text-center text-sm text-zinc-500 transition-colors dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      <p>&copy; {year} Made with ❤️</p>
    </footer>
  );
}
