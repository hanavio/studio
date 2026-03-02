"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "text-center bg-black/10 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50 transition-all duration-300 flex items-center justify-center",
      isScrolled ? 'py-4' : 'py-6',
      "px-4 md:px-8"
    )}>
      <h1 className={cn(
        "font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent to-destructive transition-all duration-300",
        isScrolled ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'
      )}>
        ChemLearn Portal
      </h1>
    </header>
  );
}
