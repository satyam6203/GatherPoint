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
              <ShoppingBag size={48} className="mb-4 opacity-50" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 items-center bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="w-16 h-16 bg-customer-primary/20 rounded-lg flex items-center justify-center text-2xl shrink-0">
                  {item.imageUrl && item.imageUrl.length > 5 && item.imageUrl.startsWith('http') ? (
                    <img src={item.imageUrl} alt="" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <span>{item.imageUrl || '☕'}</span>
                  )}
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-customer-text">{item.productName}</h4>
                  <div className="text-customer-accent font-semibold text-sm">₹{item.price}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button onClick={() => removeItem(item)} className="text-red-400 hover:text-red-300 transition-colors p-1">
                    <Trash2 size={16} />
                  </button>
                  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-1">
                    <button onClick={() => updateQuantity(item, -1)} className="text-customer-text hover:text-customer-accent disabled:opacity-50" disabled={item.quantity <= 1}>
                      <Minus size={14} />
                    </button>
                    <span className="w-4 text-center text-sm font-semibold text-customer-text">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item, 1)} className="text-customer-text hover:text-customer-accent">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-customer-primary/10 border-t border-white/10">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-customer-text/70 text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-customer-text/70 text-sm">
                <span>Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-customer-accent pt-2 border-t border-white/10">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
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
