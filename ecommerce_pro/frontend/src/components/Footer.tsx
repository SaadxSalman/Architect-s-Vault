export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-xl font-black text-indigo-600 tracking-tighter mb-4">SAAD.VAULT</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Premium curation for the modern enthusiast. Securing the finest gear for your collection since 2025.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Shop</h4>
            <ul className="text-slate-500 text-sm space-y-2">
              <li className="hover:text-indigo-600 cursor-pointer transition">All Products</li>
              <li className="hover:text-indigo-600 cursor-pointer transition">New Arrivals</li>
              <li className="hover:text-indigo-600 cursor-pointer transition">Featured</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Support</h4>
            <ul className="text-slate-500 text-sm space-y-2">
              <li className="hover:text-indigo-600 cursor-pointer transition">Help Center</li>
              <li className="hover:text-indigo-600 cursor-pointer transition">Shipping Info</li>
              <li className="hover:text-indigo-600 cursor-pointer transition">Returns</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Stay Connected</h4>
            <div className="flex gap-4 mb-4">
              <a href="https://github.com/saadxsalman" target="_blank" className="bg-slate-100 p-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition">
                <span className="text-xs font-bold">GitHub</span>
              </a>
            </div>
            <div className="flex">
              <input type="email" placeholder="Email" className="bg-slate-100 border-none rounded-l-xl px-4 py-2 text-sm w-full outline-none focus:ring-1 focus:ring-indigo-500" />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-xl text-sm font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">© 2026 SAAD.VAULT. Created by <span className="font-bold text-slate-600 underline">saadxsalman</span></p>
          <div className="flex gap-6 text-xs text-slate-400 font-medium">
            <span className="hover:text-indigo-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-indigo-600 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}