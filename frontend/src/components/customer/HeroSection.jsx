import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroSection = ({ onBrowseClick }) => {
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const steamRef = useRef(null);

  useEffect(() => {
    // Background slow scale
    gsap.to(bgRef.current, {
      scale: 1.05,
      duration: 10,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

    // Content fade in
    gsap.fromTo(contentRef.current.children, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
    );

    // Steam animation
    const steams = steamRef.current.children;
    gsap.to(steams, {
      y: -40,
      opacity: 0,
      duration: 2,
      stagger: {
        each: 0.4,
        repeat: -1
      },
      ease: "power1.inOut"
    });
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-customer-bg/80" />
      
      {/* Content */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center px-4">
        
        {/* Logo and Steam */}
        <div className="relative mb-6">
          <div ref={steamRef} className="absolute -top-10 left-1/2 -translate-x-1/2 w-full h-20 flex justify-center gap-3 opacity-50">
            <div className="w-1 h-6 bg-white/30 blur-[2px] rounded-full" />
            <div className="w-2 h-10 bg-white/30 blur-[2px] rounded-full" />
            <div className="w-1 h-8 bg-white/30 blur-[2px] rounded-full" />
          </div>
          <h1 className="font-pinyon text-7xl text-customer-accent mb-2 drop-shadow-lg">BrewBaithak</h1>
        </div>

        <h2 className="text-5xl md:text-7xl font-cinzel font-bold text-customer-text mb-4 drop-shadow-xl">
          Order Fresh. Sip Slow.
        </h2>
        <p className="text-lg md:text-xl text-customer-text/80 mb-10 max-w-lg font-sans">
          Crafted coffee and comfort food at your table.
        </p>
        
        <button 
          onClick={onBrowseClick}
          className="px-8 py-4 bg-customer-primary text-customer-text font-semibold rounded-full hover:bg-customer-accent transition-colors duration-300 shadow-[0_4px_20px_rgba(45,106,79,0.4)] hover:shadow-[0_4px_25px_rgba(212,163,115,0.5)]"
        >
          Browse Menu
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
