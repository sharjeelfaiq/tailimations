export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 px-4 py-5 text-center text-sm text-zinc-500">
      <p>&copy; {year} Made with ❤️</p>
    </footer>
  );
}
