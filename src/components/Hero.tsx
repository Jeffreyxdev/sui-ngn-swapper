
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, Zap, Shield, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from 'react-router-dom';
import Site from '@/assets/site.png'

interface FeaturePillProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
}

const FeaturePill: React.FC<FeaturePillProps> = ({ icon, text, className }) => (
  <div className={cn(
    "inline-flex items-center px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm text-sm font-medium text-gray-700",
    "animate-fade-in transition-all duration-300 hover:bg-white hover:shadow-md transform hover:-translate-y-1",
    className
  )}>
    {icon}
    <span className="ml-1.5">{text}</span>
  </div>
);

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 mt-4  overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-brand-light opacity-80 -z-10"></div>
      
      {/* Decorative blobs */}
      <div className="absolute top-20 right-[5%] w-64 h-64 rounded-full bg-brand-primary/5 animate-float -z-10"></div>
      <div className="absolute bottom-10 left-[10%] w-48 h-48 rounded-full bg-brand-secondary/10 animate-float animation-delay-2000 -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in opacity-90">
            <FeaturePill 
              icon={<Shield size={14} className="text-brand-primary" />} 
              text="Secure Transactions" 
              className="animation-delay-100"
            />
            <FeaturePill 
              icon={<Zap size={14} className="text-amber-500" />} 
              text="Lightning Fast" 
              className="animation-delay-200"
            />
            <FeaturePill 
              icon={<RefreshCw size={14} className="text-emerald-500" />} 
              text="Competitive Rates" 
              className="animation-delay-300"
            />
          </div>
      <div className="text-center mt-12 mb-12">
        <h1 className="text-5xl sm:text-3xl md:text-5xl font-bold mb-6 leading-tight animate-slide-up whitespace-normal sm:whitespace-nowrap break-words">
          The future of Crypto{" "}
          <span className="relative text-purple-600 inline-block">
            Payments
            <span
              aria-hidden="true"
              className="absolute left-0 bottom-0 w-full h-3 pointer-events-none sm:h-2"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml;utf8,<svg width=\"200\" height=\"6\" xmlns=\"http://www.w3.org/2000/svg\"><polyline points=\"0,6 50,0 100,6 150,0 200,6\" fill=\"none\" stroke=\"black\" stroke-width=\"4\"/></svg>')",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "bottom",
                backgroundSize: "80px 4px",
              }}
            />
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-slide-up animation-delay-200">
          Suiver makes it effortless for freelancers, employees, and 
          traders to turn crypto into local currency in seconds.
          Work global. Get paid local. Instantly. Bordeless. Fast and fair.
        </p>
        <div className="flex flex-wrap justify-center gap-4 animate-slide-up animation-delay-300">
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-12"
            />
          </a>
          <a href="https://apps.apple.com/app" target="_blank" rel="noopener noreferrer">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="h-12"
            />
          </a>
        </div>
        <div className="relative flex justify-center mt-[-20px]">
          <img src={Site} alt=" hero img" className="item-center" />
          {/* Blur effect at the bottom */}
          
        </div>
      </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
