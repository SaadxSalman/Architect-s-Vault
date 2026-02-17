'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CartSidebar from '@/components/CartSidebar';
import Footer from '@/components/Footer';
import AuthModal from '@/auth/AuthModal';
import ProductDetailsModal from '@/components/ProductDetailsModal';
import SearchBar from '@/components/SearchBar';
import ProductGrid from '@/components/ProductGrid';
import OrderHistory from '@/components/OrderHistory';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('accessToken');
    if (savedToken) {
      setToken(savedToken);
      fetchOrders(savedToken);
    }
    
    fetch('http://127.0.0.1:8000/api/products/')
      .then(res => res.json())
      .then(data => { 
        setProducts(data); 
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  const fetchOrders = async (authToken: string) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/orders/', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Failed to fetch orders");
    }
  };

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('accessToken', newToken);
    setShowAuthModal(false);
    fetchOrders(newToken);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setOrders([]);
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const decreaseQuantity = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };

  const removeItemCompletely = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const placeOrder = async () => {
    if (!token) return alert("Please login first!");
    if (cart.length === 0) return alert("Your cart is empty!");

    const totalPrice = cart.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);
    const productNames = cart.map(item => `${item.name} (x${item.quantity})`).join(", ");

    try {
      const res = await fetch('http://127.0.0.1:8000/api/orders/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ product_names: productNames, total_price: totalPrice.toFixed(2) })
      });

      if (res.ok) {
        alert("Order Placed! 🚀");
        setCart([]);
        fetchOrders(token);
      }
    } catch (err) {
      alert("Error placing order.");
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar 
        token={token} 
        onLogout={handleLogout} 
        onShowAuth={() => setShowAuthModal(true)} 
      />

      <main className="flex-grow max-w-6xl mx-auto p-6 w-full">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <ProductGrid 
            products={filteredProducts}
            loading={loading}
            searchQuery={searchQuery}
            onSelect={setSelectedProduct}
            onAddToCart={addToCart}
          />

          <CartSidebar 
            cart={cart} 
            onRemove={removeItemCompletely} 
            onDecrease={decreaseQuantity} 
            onIncrease={addToCart} 
            onCheckout={placeOrder} 
          />
        </div>

        {token && <OrderHistory orders={orders} />}
      </main>

      <Footer />

      <ProductDetailsModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart} 
      />

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onSuccess={handleLoginSuccess} 
        />
      )}
    </div>
  );
}