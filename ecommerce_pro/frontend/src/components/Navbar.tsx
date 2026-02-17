interface NavbarProps {
  token: string | null;
  onLogout: () => void;
  onShowAuth: () => void;
}

export default function Navbar({ token, onLogout, onShowAuth }: NavbarProps) {
  return (
    <nav className="bg-white/80 border-b sticky top-0 z-40 p-4 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-black text-indigo-600 tracking-tighter">SAAD.VAULT</h1>
        <div className="flex gap-4 items-center">
          {token ? (
            <button 
              onClick={onLogout} 
              className="text-red-500 font-bold hover:underline text-sm"
            >
              Logout
            </button>
          ) : (
            <button 
              onClick={onShowAuth} 
              className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition text-sm"
            >
              Login / Register
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}