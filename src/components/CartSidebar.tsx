import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { CartItem } from "../types";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function CartSidebar({ isOpen, onClose, items, onRemove, onCheckout }: CartSidebarProps) {
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white border-l border-zinc-100 z-50 flex flex-col shadow-2xl"
          >
            <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-widest text-gold font-bold">Your Bag</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-400 gap-4">
                  <p className="text-[10px] uppercase tracking-widest">Bag is currently empty</p>
                  <button 
                    onClick={onClose}
                    className="text-gold text-[10px] font-black uppercase tracking-widest hover:underline"
                  >
                    Explore Collections
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-24 bg-zinc-50 rounded-sm overflow-hidden border border-zinc-100 flex-shrink-0 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-opacity" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="text-zinc-900 font-serif text-sm leading-tight mb-1">{item.name}</h4>
                        <div className="flex items-center justify-between">
                          <p className="text-zinc-400 text-[10px] uppercase tracking-widest font-bold">{item.brand}</p>
                          <span className="text-zinc-400 text-[10px] uppercase font-mono">x{item.quantity}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gold font-serif text-lg">৳ {item.price.toLocaleString()}</span>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-zinc-300 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-10 bg-zinc-50 border-t border-zinc-100">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-zinc-400 font-bold uppercase tracking-[0.2em] text-[10px]">Subtotal</span>
                  <span className="text-zinc-900 text-3xl font-serif">৳ {total.toLocaleString()}</span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02, backgroundColor: "#000" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCheckout}
                  className="w-full bg-zinc-900 text-white py-5 px-6 font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-4 transition-all shadow-xl group"
                >
                  Checkout
                  <ArrowRight size={16} className="text-gold group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
