
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "py-3 bg-white/80 backdrop-blur-md shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2 animate-fade-in">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center overflow-hidden">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <h1 className="text-xl font-display font-bold text-gray-900">SUIFI.NG</h1>
        </a>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-1 animate-fade-in">
            <a href="/" className="px-4 py-2 text-gray-700 hover:text-brand-primary transition-colors">
              Home
            </a>
            <a href="/exchange" className="px-4 py-2 text-gray-700 hover:text-brand-primary transition-colors">
              Exchange
            </a>
            <a href="#about" className="px-4 py-2 text-gray-700 hover:text-brand-primary transition-colors">
              About
            </a>
            <a href="#faq" className="px-4 py-2 text-gray-700 hover:text-brand-primary transition-colors">
              FAQ
            </a>
          </nav>
        )}

        <div className="flex items-center space-x-4 animate-fade-in">
          <Button 
            className="hidden md:flex bg-brand-primary hover:bg-brand-primary/90 text-white transition-all duration-300 rounded-full px-5"
          ><Link to={'/docs'}>
            Docs</Link>
          </Button>
          
          {isMobile && (
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-700 hover:text-brand-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white pt-24 px-6 animate-slide-down">
          <nav className="flex flex-col space-y-6">
            <a 
              href="/" 
              className="text-xl font-medium text-gray-900 hover:text-brand-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="/exchange" 
              className="text-xl font-medium text-gray-900 hover:text-brand-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Exchange
            </a>
            <a 
              href="#about" 
              className="text-xl font-medium text-gray-900 hover:text-brand-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#faq" 
              className="text-xl font-medium text-gray-900 hover:text-brand-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <Button 
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white transition-all duration-300 rounded-full mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start Swapping
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
