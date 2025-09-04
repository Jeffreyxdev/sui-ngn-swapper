
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from 'react-router-dom';
import Logo from '../assets/tran.png'
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
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-7xl mx-auto transition-all duration-300"
    >
      <div className="bg-gradient-to-r from-[#F56BF7] to-[#661F5D] rounded-full shadow-lg px-6 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2 animate-fade-in">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src={Logo} alt="suiver logo" className="h-full w-auto" />
          </div>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
            SUIVER
          </h1>
        </a>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6 animate-fade-in">
            <a href="/" className="px-4 py-2 text-white hover:text-gray-200 transition-colors">
              Home
            </a>
            
            <a href="#about" className="px-4 py-2 text-white hover:text-gray-200 transition-colors">
              About us
            </a>

            <a href="#benefits" className="px-4 py-2 text-white hover:text-gray-200 transition-colors">
              Benefits
            </a>
            <a href="#faq" className="px-4 py-2 text-white hover:text-gray-200 transition-colors">
              FAQ
            </a>
          </nav>
        )}

        <div className="flex items-center space-x-4 animate-fade-in">
          <Button 
            className="hidden md:flex bg-black text-white hover:bg-gray-900 transition-all duration-300 rounded-full px-6 py-2"
          >
            <Link to={'/whitepaper'}>Docs</Link>
          </Button>
          
          {isMobile && (
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-white hover:text-white/90 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

           {/* Mobile Navigation */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-1/2 -translate-x-1/2 w-[90%] rounded-2xl z-50 
          bg-white/10 backdrop-blur-md 
          border border-white/20
          shadow-xl 
          pt-7 p-4 px-6 
          animate-slide-down"
        >
          <nav className="flex flex-col space-y-6 items-center">
            <a 
              href="/" 
              className="text-xl font-medium text-black hover:text-[#F56BF7] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
           
            <a 
              href="#about" 
              className="text-xl font-medium text-black hover:text-[#F56BF7] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#faq" 
              className="text-xl font-medium text-black hover:text-[#F56BF7] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <Button 
              className="w-[170px] bg-black hover:bg-[#F56BF7] text-white transition-all duration-300 rounded-full mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact us
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
