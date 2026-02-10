export default function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-slate-200 text-center">
      <p className="text-sm text-slate-400">
        © {new Date().getFullYear()} Inventory Management System • Logged in as saadxsalman
      </p>
    </footer>
  );
}