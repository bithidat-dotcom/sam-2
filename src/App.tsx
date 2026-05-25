import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle } from "lucide-react";
import Header from "./components/Header";
import WatchCard from "./components/WatchCard";
import CartSidebar from "./components/CartSidebar";
import CheckoutModal from "./components/CheckoutModal";
import OrderSuccess from "./components/OrderSuccess";
import { WATCH_DATA } from "./data";
import { CartItem, CustomerDetails, Watch } from "./types";

export default function App() {
  const [products] = useState<Watch[]>(WATCH_DATA);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Luxury", "Sport", "Minimalist", "Classic"];

  const filteredWatches = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((w) => w.category === activeCategory);
  }, [activeCategory, products]);

  const addToCart = (watch: Watch, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === watch.id);
      if (existing) {
        return prev.map((item) => 
          item.id === watch.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...watch, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckoutSubmit = async (details: CustomerDetails) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderItems: cart,
          customerDetails: details
        })
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Non-JSON response from server:", responseText);
        throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`);
      }

      if (response.ok) {
        setLastOrderId(data.orderId);
        setCart([]);
        setIsCheckoutOpen(false);
        setIsCartOpen(false);
      } else {
        console.error("Server error:", data);
        alert(`Order processing failed: ${data.error || "Unknown server error (Check Vercel logs)"}`);
      }
    } catch (error: any) {
      console.error("Order failed:", error);
      alert(`Connection Error: ${error.message || "Please check your internet and server configuration."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (lastOrderId) {
    return (
      <div className="min-h-screen bg-white flex flex-col pt-20">
        <OrderSuccess orderId={lastOrderId} onBack={() => setLastOrderId(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-gold/30 selection:text-black">
      <Header cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />

      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <section className="mb-24 flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 text-left"
          >
            <span className="text-gold text-xs uppercase tracking-[0.4em] block mb-4">Curated Timepieces</span>
            <h1 className="text-5xl sm:text-7xl font-serif text-zinc-900 tracking-tight leading-[1.1] mb-8">
              A Legacy of <br />
              <span className="italic text-gold text-6xl sm:text-8xl">Precision</span>
            </h1>
            <p className="text-zinc-500 max-w-lg text-sm sm:text-base leading-relaxed mb-10">
              Sapphire crystal, 72-hour power reserve, and bespoke engineering. 
              Designed for those who understand that time is the ultimate luxury. 
              Enjoy up to 40% privilege discount this season.
            </p>
            <div className="flex items-center gap-8">
               <button className="bg-zinc-900 hover:bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all shadow-xl">
                 Explore New Arrivals
               </button>
            </div>
          </motion.div>

          <div className="hidden lg:flex flex-1 justify-center relative">
             <div className="w-80 h-96 bg-zinc-50 rounded-full flex items-center justify-center border border-zinc-100 shadow-[0_0_100px_rgba(0,0,0,0.02)]">
                <span className="text-zinc-100 font-black text-[15rem] font-serif select-none">W</span>
             </div>
             <div className="absolute -bottom-6 -right-6 p-6 bg-white border border-zinc-100 shadow-xl flex flex-col gap-2">
                <span className="text-gold text-[10px] font-bold uppercase tracking-widest">Masterpiece Series</span>
                <span className="text-zinc-900 font-serif italic text-xl">Aethelgard Moon Phase</span>
             </div>
          </div>
        </section>

        <section className="mb-12 border-b border-zinc-100 pb-8 flex items-center justify-between">
           <h2 className="text-[10px] uppercase font-black tracking-[0.3em] text-zinc-400">Shop by Category</h2>
          <div className="flex items-center gap-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-1 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${
                  activeCategory === cat 
                    ? "border-gold text-gold" 
                    : "border-transparent text-zinc-400 hover:text-zinc-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredWatches.map((watch) => (
              <WatchCard 
                key={watch.id} 
                watch={watch} 
                onAddToCart={addToCart} 
              />
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Floating WhatsApp Support */}
      <a 
        href="https://wa.me/8801716807465" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-10 right-10 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6 fill-white/20" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-white">
          Support
        </span>
      </a>

      <footer className="border-t border-zinc-100 py-12 px-10 mt-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-4">
            <img 
              src="https://i.pinimg.com/736x/e4/2b/d2/e42bd286782b812b1aba81fcb99092d9.jpg" 
              alt="Quats_BD" 
              className="w-12 h-12 rounded-full border border-gold/10"
            />
            <div className="text-left">
              <span className="font-italianno text-2xl tracking-tighter text-zinc-900 border-b border-gold/20">Quats_BD<span className="text-gold italic">.com</span></span>
              <p className="text-zinc-400 text-[10px] mt-2 uppercase tracking-widest">© 2026 Quats_BD.com International. Bangladesh.</p>
            </div>
          </div>
          <div className="flex gap-10 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-gold transition-colors">Powered by Supabase Engine</a>
            <a href="https://wa.me/8801716807465" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors flex items-center gap-2">
              <MessageCircle size={12} className="text-gold" />
              WhatsApp Support
            </a>
          </div>
        </div>
      </footer>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        onSubmit={handleCheckoutSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
