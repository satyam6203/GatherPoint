import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const categories = ['All', 'Coffee', 'Tea', 'Burgers', 'Pizza', 'Desserts'];

const CategoryTabs = ({ selectedCategory, onSelectCategory }) => {
  const tabsRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(tabsRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)", delay: 0.5 }
    );
  }, []);

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-6 px-4 border-b border-customer-accent/20 sticky top-0 bg-customer-bg/95 backdrop-blur-md z-40">
      <div ref={tabsRef} className="flex space-x-4 max-w-7xl mx-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`whitespace-nowrap px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === category 
                ? 'bg-customer-accent text-customer-bg shadow-[0_0_15px_rgba(212,163,115,0.4)]' 
                : 'bg-white/5 text-customer-text/70 hover:bg-customer-primary/40 hover:text-customer-text'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
