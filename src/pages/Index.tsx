import React from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Link } from 'react-router-dom';

import ParticlesBackground from "@/components/ParticlesBackground";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, RefreshCw, Clock, Users, ExternalLink, Lock } from "lucide-react";

const Index = () => {
  const supportedCryptos = [
    { id: 'sui', name: 'SUI', color: 'bg-blue-500' },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Particles Background */}
      <ParticlesBackground />
      
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Swap Interface Section */}
      <section id="exchange" className="py-16  overflow-hidden items-center ">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col  items-center justify-between gap-12">
            <div className="w-full lg:w-1/2 order-2 lg:order-1 animate-slide-up">
              <div className="max-w-lg">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                  Swap Crypto to Fiat <span className="text-brand-primary">Instantly</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8 text-center">
                  Exchange cryptocurrencies for local currencies with just a few clicks. Get the best rates and fast transactions every time.
                </p>
                
                <div className="mb-8">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="text-sm font-medium text-gray-700">Supported cryptocurrencies:</span>
                    {supportedCryptos.map(crypto => (
                      <span 
                        key={crypto.id}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${crypto.color}`}
                      >
                        {crypto.name}
                      </span>
                    ))}
                  </div>
                  
                  <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 shadow-sm">
                    <div className="flex items-start space-x-3">
                      <RefreshCw size={20} className="text-brand-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Real-time rates</h4>
                        <p className="text-sm text-gray-600">
                          Our exchange rates are updated every minute to ensure you always get the current market value.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <Button className="flex items-center bg-brand-primary hover:bg-brand-primary/90 text-white">
                    View Exchange Rates <ExternalLink size={16} className="ml-2" />
                  </Button>
                  
                  <div className="inline-flex items-center px-4 py-2 rounded-lg bg-white/70 backdrop-blur-md border border-gray-200/50 shadow-sm">
                    <Lock size={16} className="text-brand-primary mr-2" />
                    <span className="text-sm font-medium text-gray-700">Secure Transactions</span>
                  </div>
                </div>
              </div>
            </div>
            
           
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="about" className="py-16 bg-gray-50/80 backdrop-blur-sm relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose SUIFI.NG</h2>
            <p className="text-xl text-gray-600">
              Experience the easiest way to exchange SUI for Nigerian Naira with these powerful features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-panel rounded-2xl p-6 animate-fade-in">
              <Clock size={28} className="text-brand-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Transactions</h3>
              <p className="text-gray-600">
                Complete your exchanges in minutes, not hours. Our optimized system ensures rapid processing.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="glass-panel rounded-2xl p-6 animate-fade-in animation-delay-200">
              <Award size={28} className="text-brand-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Best Rates</h3>
              <p className="text-gray-600">
                We continuously monitor the market to offer you the most competitive exchange rates.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="glass-panel rounded-2xl p-6 animate-fade-in animation-delay-300">
              <Lock size={28} className="text-brand-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-600">
                Our platform utilizes advanced security measures to protect your transactions and personal information.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12"> 
            <Link to='/exchange'>
            <Button className="button-primary flex items-center mx-auto">
              Get Started <ArrowRight size={18} className="ml-1" />
            </Button></Link>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our exchange service
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {/* FAQ Item 1 */}
            <div className="py-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does a transaction take?</h3>
              <p className="text-gray-600">
                Most transactions are processed within 10-15 minutes, depending on network congestion. Once confirmed, you'll receive your NGN immediately.
              </p>
            </div>
            
            {/* FAQ Item 2 */}
            <div className="py-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What are your exchange fees?</h3>
              <p className="text-gray-600">
                We charge a small fee of 1% per transaction. This fee covers the operational costs and ensures we can provide you with the best service.
              </p>
            </div>
            
            {/* FAQ Item 3 */}
            <div className="py-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my transaction secure?</h3>
              <p className="text-gray-600">
                Yes, all transactions are securely processed on the blockchain. We use industry-standard encryption and security practices to protect your data.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-50/80 backdrop-blur-sm border-t border-gray-200/50 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <h1 className="text-lg font-display font-bold text-gray-900">SUIFI.NG</h1>
              </a>
              <p className="text-sm text-gray-600 mt-2">
                The easiest way to swap SUI to NGN.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-600 hover:text-brand-primary text-sm">Home</a></li>
                  <li><a href="/exchange" className="text-gray-600 hover:text-brand-primary text-sm">Exchange</a></li>
                  <li><a href="#about" className="text-gray-600 hover:text-brand-primary text-sm">About</a></li>
                  <li><a href="#faq" className="text-gray-600 hover:text-brand-primary text-sm">FAQ</a></li>
                  <li><a href="/docs" className="text-gray-600 hover:text-brand-primary text-sm">DOCS</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Contact</h4>
                <ul className="space-y-2">
                  <li><a href="mailto:support@suifi.ng" className="text-gray-600 hover:text-brand-primary text-sm">support@suifi.ng</a></li>
                  <li><span className="text-gray-600 text-sm">Port Harcourt, Nigeria</span></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              © {new Date().getFullYear()} SUIFI.NG. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-brand-primary">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              
              <a href="#" className="text-gray-500 hover:text-brand-primary">
                <span className="sr-only">Telegram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.18-2.935 5.35-4.827c.235-.21-.051-.329-.355-.119l-6.604 4.151-2.849-.92c-.62-.176-.64-.62.132-.912l11.13-4.27c.52-.19 1.01.124.8.736z" />
                </svg>
              </a>
              
              <a href="#" className="text-gray-500 hover:text-brand-primary">
                <span className="sr-only">Discord</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.879-.608 1.27-1.844-.28-3.68-.28-5.487 0-.165-.393-.404-.882-.612-1.27a.077.077 0 0 0-.079-.036c-1.714.29-3.354.8-4.885 1.49a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055c1.998 1.483 3.949 2.386 5.85 2.984a.078.078 0 0 0 .084-.026c.462-.636.874-1.306 1.226-2.01a.074.074 0 0 0-.042-.106c-.636-.247-1.246-.55-1.828-.892a.077.077 0 0 1-.009-.125c.123-.095.246-.193.364-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.099.24.198.366.292a.077.077 0 0 1-.006.127c-.583.342-1.193.645-1.83.892a.074.074 0 0 0-.041.106c.36.71.772 1.375 1.225 2.01a.078.078 0 0 0 .084.026c1.9-.59 3.85-1.492 5.852-2.984a.08.08 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.442a.06.06 0 0 0-.031-.027zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

