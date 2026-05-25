import { ShoppingCart, Watch, Search, Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-100 px-6 py-4 sm:px-10 sm:py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center cursor-pointer group gap-3">
            <img 
              src="https://i.pinimg.com/736x/e4/2b/d2/e42bd286782b812b1aba81fcb99092d9.jpg" 
              alt="Sam Watch Logo" 
              className="w-10 h-10 object-contain rounded-full border border-gold/20"
            />
            <span className="font-serif text-2xl tracking-tighter text-zinc-900">
              sam <span className="text-gold italic text-3xl ml-1">Watch</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            <a href="#" className="text-gold transition-colors">COLLECTIONS</a>
            <a href="#" className="hover:text-gold transition-colors">SPECIAL OFFERS</a>
            <a href="https://wa.me/8801716807465" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5" />
              SUPPORT
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:block">
             <div className="px-3 py-1 bg-gold text-white text-[10px] font-bold rounded-sm uppercase tracking-tighter shadow-sm">
               40% Flash Sale
             </div>
          </div>
          
          <button 
            onClick={onOpenCart}
            className="group relative p-2 text-zinc-400 hover:text-gold flex items-center gap-2 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-zinc-900 text-gold text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-xs">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            className="md:hidden p-2 text-zinc-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 right-0 bg-white border-b border-zinc-100 md:hidden p-8 flex flex-col gap-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400 shadow-xl"
          >
            <a href="#" className="text-gold">Collections</a>
            <a href="#">Special Offers</a>
            <a href="https://wa.me/8801716807465" target="_blank" rel="noreferrer">Support</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
