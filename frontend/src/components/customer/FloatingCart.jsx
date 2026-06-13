import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ShoppingBag, Minus, Plus, Trash2, X } from 'lucide-react';

const FloatingCart = ({ cart, updateQuantity, removeItem, onCheckout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef(null);
  const badgeRef = useRef(null);
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Animate badge on count change
  useEffect(() => {
    if (itemCount > 0 && badgeRef.current) {
      gsap.fromTo(badgeRef.current,
        { scale: 1.5 },
        { scale: 1, duration: 0.3, ease: "back.out(2)" }
      );
    }
  }, [itemCount]);

  // Open/Close animation
  useEffect(() => {
    if (!cartRef.current) return;
    if (isOpen) {
      gsap.to(cartRef.current, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
    } else {
      // Mobile vs Desktop closing position
      const isMobile = window.innerWidth < 1024;
      gsap.to(cartRef.current, { 
        x: isMobile ? 0 : '100%', 
        y: isMobile ? '100%' : 0, 
        duration: 0.4, 
        ease: "power3.in" 
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Toggle Button (visible when closed) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 w-16 h-16 bg-customer-accent rounded-full flex items-center justify-center text-customer-bg shadow-[0_0_20px_rgba(212,163,115,0.4)] hover:scale-110 transition-transform"
        >
          <ShoppingBag size={28} />
          {itemCount > 0 && (
            <div ref={badgeRef} className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md">
              {itemCount}
            </div>
          )}
        </button>
      )}

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Cart Container */}
      <div 
        ref={cartRef}
        className="fixed bottom-0 left-0 right-0 h-[80vh] lg:top-0 lg:bottom-auto lg:left-auto lg:right-0 lg:h-screen lg:w-96 bg-customer-bg border-t lg:border-t-0 lg:border-l border-white/10 z-50 flex flex-col shadow-2xl translate-y-full lg:translate-y-0 lg:translate-x-full"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-customer-primary/20">
          <h2 className="text-2xl font-cinzel font-bold text-customer-accent flex items-center gap-2">
            <ShoppingBag /> Your Order
          </h2>
          <button onClick={() => setIsOpen(false)} className="text-customer-text/70 hover:text-customer-accent transition-colors">
            <X size={28} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-customer-text/50">
            <div className="h-full flex flex-col items-center justify-center text-customer-text/50">
              <ShoppingBag size={64} className="mb-4 opacity-20" />
              <p className="text-lg font-sans">Your cart is empty.</p>
              <button onClick={() => setIsOpen(false)} className="mt-4 text-customer-accent hover:underline">Start browsing</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 relative group hover:border-customer-accent/30 transition-colors">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/40 flex-shrink-0 border border-white/5">
                  {item.imageUrl && item.imageUrl.length > 5 && item.imageUrl.startsWith('http') ? (
                    <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">☕</div>
                  )}
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-customer-text font-sans">{item.productName}</h4>
                    <p className="text-sm text-customer-text/60">₹{item.price}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-black/40 rounded-full px-2 py-1">
                      <button onClick={() => updateQuantity(item, -1)} className="p-1 hover:text-customer-accent transition-colors"><Minus size={14} /></button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item, 1)} className="p-1 hover:text-customer-accent transition-colors"><Plus size={14} /></button>
                    </div>
                    <p className="font-bold text-customer-accent font-sans">₹{item.price * item.quantity}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeItem(item)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
              </div>
            </div>
            
            <button 
              onClick={() => { setIsOpen(false); onCheckout(); }}
              className="w-full py-4 bg-customer-primary text-customer-text font-bold rounded-xl hover:bg-customer-accent hover:text-customer-bg transition-colors shadow-lg shadow-customer-primary/20"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingCart;
