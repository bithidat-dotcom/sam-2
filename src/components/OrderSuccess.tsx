import { motion } from "motion/react";
import { CheckCircle2, Truck, Package, Clock, ArrowLeft } from "lucide-react";

interface OrderSuccessProps {
  orderId: string;
  onBack: () => void;
}

export default function OrderSuccess({ orderId, onBack }: OrderSuccessProps) {
  const steps = [
    { icon: <Clock size={20} />, label: "Order Placed", status: "complete" },
    { icon: <Package size={20} />, label: "Processing", status: "active" },
    { icon: <Truck size={20} />, label: "Shipped", status: "pending" },
    { icon: <CheckCircle2 size={20} />, label: "Delivered", status: "pending" },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 max-w-2xl mx-auto text-center">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mb-8 shadow-2xl"
      >
        <CheckCircle2 size={40} className="text-white" />
      </motion.div>

      <h2 className="text-xs uppercase tracking-[0.4em] text-gold mb-4 font-bold">Transaction Confirmed</h2>
      <h1 className="text-4xl sm:text-5xl font-serif text-zinc-900 tracking-tight leading-none mb-4">Order Received</h1>
      <p className="text-zinc-500 mb-12 text-sm max-w-md leading-relaxed">Your order identifier is <span className="text-zinc-900 font-bold tracking-widest select-all px-2 bg-zinc-50 border border-zinc-100 italic">#{orderId}</span>. A full receipt has been delivered to your WhatsApp.</p>

      <div className="w-full bg-zinc-50 border border-zinc-100 rounded-sm p-10 mb-12 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-1 h-full bg-gold/50" />
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Coming: Bangladesh Express</h3>
          <div className="flex items-center gap-2">
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
            </span>
            <span className="text-[9px] uppercase font-black text-gold tracking-widest">In Transit</span>
          </div>
        </div>
        
        <div className="flex justify-between relative px-2">
          <div className="absolute top-5 left-0 w-full h-[1px] bg-zinc-200 -z-0" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center gap-4 relative z-10">
              <div className={`w-10 h-10 rounded-xs flex items-center justify-center border transition-all duration-1000 ${
                step.status === 'complete' ? 'bg-gold border-gold text-white shadow-lg' : 
                step.status === 'active' ? 'bg-white border-gold text-gold animate-pulse' : 
                'bg-white border-zinc-200 text-zinc-300'
              }`}>
                {step.icon}
              </div>
              <span className={`text-[8px] font-bold uppercase tracking-[0.2em] ${
                step.status === 'pending' ? 'text-zinc-300' : 'text-zinc-500'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-zinc-100 flex items-center justify-center gap-4">
           <div className="w-12 h-12 bg-white border border-zinc-200 rounded-xs overflow-hidden">
              <img src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=100" alt="Watch" className="w-full h-full object-cover grayscale opacity-50" />
           </div>
           <div className="text-left">
              <p className="text-[10px] text-zinc-900 font-serif italic">Currently at: Dhaka Processing Hub</p>
              <p className="text-[8px] text-zinc-400 uppercase tracking-widest mt-1">Est. Delivery: 24-48 Hours</p>
           </div>
        </div>
      </div>

      <button 
        onClick={onBack}
        className="flex items-center gap-3 text-zinc-400 hover:text-zinc-900 text-[10px] uppercase font-black tracking-widest transition-all"
      >
        <ArrowLeft size={16} />
        Return to Catalog
      </button>
    </div>
  );
}
