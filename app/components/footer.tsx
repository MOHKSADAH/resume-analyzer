export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-blueprint-line bg-white py-8 mt-12 relative z-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-blueprint-text-muted">
          Made by{" "}
          <span className="font-semibold text-blueprint-text">
            Mohammad Al-Sadah
          </span>
        </p>
        <p className="text-xs text-blueprint-text-muted mt-2">
          © {currentYear} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
