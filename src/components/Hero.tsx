
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, Zap, Shield, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <section className="relative pt-24 pb-16 overflow-hidden">
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
          
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight animate-slide-up">
              <span className="block">Swap SUI to</span>
              <span className="text-green-600">Nigerian Naira</span>
              <span className="block pencil" >Seamlessly</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-slide-up animation-delay-200">
              Exchange your SUI crypto assets directly to NGN with the best rates and minimal fees. Fast, secure, and reliable.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 animate-slide-up animation-delay-300">
              <Button className="button-primary flex items-center">
                Start Swapping <ChevronRight size={18} className="ml-1" />
              </Button>
              <Button variant="outline" className="button-secondary">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
