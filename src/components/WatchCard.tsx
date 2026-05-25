import { useState } from "react";
import { Watch } from "../types";
import { motion } from "motion/react";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import type { FC } from "react";

interface WatchCardProps {
  watch: Watch;
  onAddToCart: (watch: Watch, quantity: number) => void;
}

const WatchCard: FC<WatchCardProps> = ({ watch, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group relative bg-[#fafafa] border border-zinc-100 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <div className="absolute top-4 left-4 z-10 bg-gold text-white text-[9px] font-black px-2 py-1 rounded-xs flex items-center gap-1 shadow-xl uppercase tracking-tighter">
        -{watch.discountPercentage}%
      </div>

      <div className="aspect-[4/5] overflow-hidden bg-zinc-50 relative">
        <img 
          src={watch.image} 
          alt={watch.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
      </div>

      <div className="p-6">
        <div className="flex flex-col mb-4 px-1">
          <span className="text-[10px] text-gold font-bold uppercase tracking-[0.2em] mb-1">
            {watch.brand}
          </span>
          <h3 className="text-zinc-900 font-serif text-xl leading-tight group-hover:text-gold transition-colors">
            {watch.name}
          </h3>
        </div>

        <div className="flex items-center justify-between mb-6 px-1">
           <div className="flex flex-col">
            <span className="text-zinc-400 text-[10px] uppercase tracking-tighter line-through">
              ৳ {watch.originalPrice.toLocaleString()}
            </span>
            <span className="text-zinc-900 font-serif text-2xl">
              ৳ {watch.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-white border border-zinc-200 p-1 rounded-sm shadow-sm">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-all rounded-xs"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-xs font-bold text-zinc-900 font-mono">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-all rounded-xs"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02, backgroundColor: "#000" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            onAddToCart(watch, quantity);
            setQuantity(1); // Reset local quantity after adding
          }}
          className="w-full bg-zinc-900 text-white py-4 rounded-sm flex items-center justify-center gap-3 transition-all shadow-lg group/btn"
        >
          <ShoppingBag className="w-4 h-4 text-gold group-hover/btn:rotate-12 transition-transform" />
          <span className="text-[10px] uppercase font-bold tracking-widest group-hover/btn:translate-x-1 transition-transform">Add to Cart</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WatchCard;
