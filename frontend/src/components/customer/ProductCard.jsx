import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ product, onAdd }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    // Scroll reveal
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none none"
          }
        }
      );
    }, cardRef);
    
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { y: -8, scale: 1.02, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
  };

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col h-full hover:border-customer-accent/50 hover:shadow-[0_0_20px_rgba(212,163,115,0.2)] transition-colors duration-300 group"
    >
      <div className="w-full h-32 rounded-xl bg-customer-primary/10 mb-4 flex items-center justify-center text-5xl overflow-hidden relative">
        {product.imageUrl && product.imageUrl.length > 5 && product.imageUrl.startsWith('http') ? (
          <img src={product.imageUrl} alt={product.productName} className="w-full h-full object-cover" />
        ) : (
          <span className="drop-shadow-lg">{product.imageUrl || '☕'}</span>
        )}
      </div>
      
      <div className="flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-customer-text mb-2 font-sans">{product.productName}</h3>
        <p className="text-sm text-customer-text/70 mb-4 flex-grow line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
          <span className="text-2xl font-bold text-customer-accent font-sans">₹{product.price}</span>
          <button 
            onClick={() => onAdd(product)}
            className="w-10 h-10 rounded-full bg-customer-primary flex items-center justify-center text-customer-text hover:bg-customer-accent hover:text-customer-bg transition-colors duration-300 group-hover:scale-110"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
