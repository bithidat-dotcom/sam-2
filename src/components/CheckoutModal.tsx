import { motion, AnimatePresence } from "motion/react";
import { X, Send, Phone, User, Home, Wallet, Check } from "lucide-react";
import { useState, FormEvent } from "react";
import { CustomerDetails } from "../types";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: CustomerDetails) => void;
  isSubmitting: boolean;
}

export default function CheckoutModal({ isOpen, onClose, onSubmit, isSubmitting }: CheckoutModalProps) {
  const [details, setDetails] = useState<CustomerDetails>({
    name: "",
    email: "",
    whatsappNumber: "",
    location: "",
    deliveryMethod: "Home Delivery",
    paymentMethod: "bKash"
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmOrder = () => {
    onSubmit(details);
    setShowConfirmation(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xl"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white border border-zinc-100 w-full max-w-lg overflow-hidden shadow-2xl"
          >
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xs uppercase tracking-[0.3em] text-gold mb-2 font-bold">Secure Checkout</h2>
                  <h3 className="text-3xl font-serif text-zinc-900 tracking-tight">Finalize Order</h3>
                </div>
                {!isSubmitting && (
                  <button onClick={onClose} className="p-2 text-zinc-300 hover:text-zinc-900 transition-colors">
                    <X />
                  </button>
                )}
              </div>

              {!showConfirmation ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Full Name</label>
                      <input 
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-zinc-50 border border-zinc-100 text-zinc-900 py-4 px-5 rounded-sm focus:outline-none focus:border-gold transition-colors text-sm shadow-inner"
                        value={details.name}
                        onChange={(e) => setDetails({ ...details, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Email Address</label>
                      <input 
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="w-full bg-zinc-50 border border-zinc-100 text-zinc-900 py-4 px-5 rounded-sm focus:outline-none focus:border-gold transition-colors text-sm shadow-inner"
                        value={details.email}
                        onChange={(e) => setDetails({ ...details, email: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 block">WhatsApp Number</label>
                        <input 
                          required
                          type="tel"
                          placeholder="+880 1XXX-XXXXXX"
                          className="w-full bg-zinc-50 border border-zinc-100 text-zinc-900 py-4 px-5 rounded-sm focus:outline-none focus:border-gold transition-colors text-sm shadow-inner"
                          value={details.whatsappNumber}
                          onChange={(e) => setDetails({ ...details, whatsappNumber: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Full Location</label>
                        <input 
                          required
                          type="text"
                          placeholder="Dhaka, Bangladesh"
                          className="w-full bg-zinc-50 border border-zinc-100 text-zinc-900 py-4 px-5 rounded-sm focus:outline-none focus:border-gold transition-colors text-sm shadow-inner"
                          value={details.location}
                          onChange={(e) => setDetails({ ...details, location: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Delivery</label>
                      <div className="flex flex-col gap-2">
                         {['Home Delivery', 'Office Pickup'].map((m) => (
                           <button
                             key={m}
                             type="button"
                             onClick={() => setDetails({...details, deliveryMethod: m as any})}
                             className={`p-3 text-[10px] uppercase font-bold tracking-tighter border transition-all ${details.deliveryMethod === m ? 'border-gold text-gold bg-gold/5' : 'bg-transparent border-zinc-100 text-zinc-400 hover:border-zinc-200'}`}
                           >
                             {m}
                           </button>
                         ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Payment</label>
                      <div className="flex flex-col gap-2">
                         {['bKash', 'Cash on Delivery'].map((m) => (
                           <button
                             key={m}
                             type="button"
                             onClick={() => setDetails({...details, paymentMethod: m as any})}
                             className={`p-3 text-[10px] uppercase font-bold tracking-tighter border transition-all ${details.paymentMethod === m ? 'border-gold text-gold bg-gold/5' : 'bg-transparent border-zinc-100 text-zinc-400 hover:border-zinc-200'}`}
                           >
                             {m}
                           </button>
                         ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-zinc-900 hover:bg-black text-white py-5 font-black uppercase text-xs tracking-[0.2em] transition-all mt-4 flex items-center justify-center gap-3 shadow-xl"
                  >
                    NEXT STEP
                  </button>
                </form>
              ) : (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mb-6 border border-gold/20">
                     <Check size={32} />
                  </div>
                  <h4 className="text-2xl font-serif text-zinc-900 mb-2">Confirm Purchase?</h4>
                  <p className="text-zinc-500 text-sm mb-10 max-w-xs">
                    Are you sure you want to proceed with the order? This will log your data to our secure server.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <button 
                      onClick={() => setShowConfirmation(false)}
                      className="py-4 border border-zinc-100 text-zinc-400 text-[10px] uppercase font-bold tracking-widest hover:border-zinc-200"
                    >
                      Wait, Back
                    </button>
                    <button 
                      onClick={handleConfirmOrder}
                      disabled={isSubmitting}
                      className="py-4 bg-zinc-900 text-white text-[10px] uppercase font-bold tracking-widest hover:bg-black transition-all flex items-center justify-center shadow-xl"
                    >
                      {isSubmitting ? (
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : "Yes, Confirm"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
