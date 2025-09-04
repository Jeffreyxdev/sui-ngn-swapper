import React from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Link } from 'react-router-dom';
import FaqItem from '@/components/FAQ';
import Logo from '@/assets/white.png'
import ParticlesBackground from "@/components/ParticlesBackground";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, RefreshCw, Clock, Users, ExternalLink, Lock } from "lucide-react";

const Index = () => {
  const supportedCryptos = [
    { id: 'btc', name: 'BTC', color: 'bg-yellow-500' },
    { id: 'eth', name: 'ETH', color: 'bg-black' },
    { id: 'sol', name: 'SOL', color: 'bg-purple-500' },
    { id: 'sui', name: 'SUI', color: 'bg-blue-700' },

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
              <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                 Unlock The Power of
                    Fast and
               <span className="text-[#6B1B9C]"> Secure</span> Crypto Conversion
                </h2>
                <p className="text-lg text-gray-600 mb-8 text-center">
                  Exchange cryptocurrencies for local currencies with just a few clicks. with unbeatable rates, lightning speed, and zero stress.
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
                      <RefreshCw size={20} className="text-[#F56BF7] mt-0.5 flex-shrink-0" />
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
                  
                  
                  <div className="inline-flex items-center px-4 py-2 rounded-lg bg-white/70 backdrop-blur-md border border-gray-200/50 shadow-sm">
                    <Lock size={16} className="text-[#F56BF7] mr-2" />
                    <span className="text-sm font-medium text-gray-700">Secure Transactions</span>
                  </div>
                </div>
              </div>
            </div>
            
           
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      
      <section id="benefits" className="py-16   bg-gray-50/80
      backdrop-blur-lg relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12"><div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img 
          src={Logo} 
          alt="suiver logo" 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-5 w-[800px]"
        />
      </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Experience Suiver</h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage your crypto and payments in one place
            </p>
             
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Feature Items */}
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <RefreshCw className="w-8 h-8 text-[#F56BF7]" />
              </div>
              <h3 className="font-semibold mb-2">Instant Swaps</h3>
              <p className="text-sm text-gray-600">Easy and quick deposits via multiple crypto</p>
            </div>
      
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-[#F56BF7]" />
              </div>
              <h3 className="font-semibold mb-2">User Friendly</h3>
              <p className="text-sm text-gray-600">Simple and intuitive interface</p>
            </div>
      
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-[#F56BF7]" />
              </div>
              <h3 className="font-semibold mb-2">Secure Platform</h3>
              <p className="text-sm text-gray-600">Advanced security measures</p>
            </div>
      
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-[#F56BF7]" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Round-the-clock customer support</p>
            </div>
      
            {/* Second Row */}
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <ArrowRight className="w-8 h-8 text-[#F56BF7]" />
              </div>
              <h3 className="font-semibold mb-2">Direct Deposits</h3>
              <p className="text-sm text-gray-600">Instant bank transfers</p>
            </div>
      
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <ExternalLink className="w-8 h-8 text-[#F56BF7]" />
              </div>
              <h3 className="font-semibold mb-2">Bill Payments</h3>
              <p className="text-sm text-gray-600">Pay utilities and subscriptions</p>
            </div>
      
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-[#F56BF7]" />
              </div>
              <h3 className="font-semibold mb-2">Best Rates</h3>
              <p className="text-sm text-gray-600">Competitive exchange rates</p>
            </div>
      
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-[#F56BF7]" />
              </div>
              <h3 className="font-semibold mb-2">Community</h3>
              <p className="text-sm text-gray-600">Join our growing community</p>
            </div>
          </div>
        </div>
      </section>
      
   

{/* FAQ Section */}
<section id="faq" className="py-16 bg-white/80 backdrop-blur-sm">
  <div className="container mx-auto px-4 sm:px-6">
    <div className="text-center max-w-3xl mx-auto mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-xl text-gray-600">
        Find answers to common questions about Suiver
      </p>
    </div>

    <div className="max-w-3xl mx-auto p-3">
      <FaqItem
        question="What is Suiver?"
        answer="Suiver is a fintech platform that makes crypto as easy as cash. You can instantly swap your crypto to local currency, pay bills, buy airtime, and send money to family& friends all in one simple app."
      />
      
      <FaqItem
        question="How is Suiver different from exchanges and P2P platforms?"
        answer="Unlike centralized exchanges, Suiver is built for speed and simplicity no long delays, no hidden fees. Unlike risky P2P deals, Suiver provides instant settlement and reliability, so you never have to worry about being scammed."
      />
      
      <FaqItem
        question="What currencies does Suiver support?"
        answer="We're starting with NGN (Nigerian Naira) and popular crypto assets like USDT, BTC, ETH, and SUI. Over time, we'll expand into other African currencies and global markets."
      />
      
      <FaqItem
        question="How fast are withdrawals to cash?"
        answer="Withdrawals are instant. Once your crypto is deposited, you can cash out, pay bills, or send money within seconds."
      />
      
      <FaqItem
        question="Is Suiver safe?"
        answer="Yes. Suiver is designed with a non-custodial foundation, meaning you retain control of your funds until settlement. We also integrate security audits and compliance measures to protect users."
      />
      
      <FaqItem
        question="Do I need KYC to use Suiver?"
        answer="For small transactions, you may not need KYC. For larger transactions or regulatory requirements, a simple verification may be required. We balance compliance with user accessibility."
      />
      
      <FaqItem
        question="Can I use Suiver outside Nigeria?"
        answer="Our first market is Nigeria, but Suiver is designed to expand across Africa and later globally. The same seamless crypto-to-cash experience will roll out to other countries step by step."
      />
      
      <FaqItem
        question="What can I do with my cash once I swap?"
        answer="You can withdraw to your bank, buy airtime, pay bills, or send money to family and friends all directly from the Suiver app."
      />
      
      <FaqItem
        question="Does Suiver have its own token?"
        answer="Currently, Suiver is focused on utility and adoption, not a token-first model. A token may be introduced in the future if it strengthens the ecosystem."
      />
      
      <FaqItem
        question="Who is behind Suiver?"
        answer="Suiver is founded by Jeffrey Agabaenwere, a blockchain builder and fintech innovator, backed by a team of developers and advisors passionate about making crypto usable for everyone."
      />
    </div>
  </div>
</section>

      
      {/* Footer */}
      <footer className="bg-gray-50/80 backdrop-blur-sm border-t border-gray-200/50 py-12">
        <div className="container mx-auto px-4 sm:px-6">
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div className="animate-slide-horizontal flex whitespace-nowrap">
    {/* Duplicate logos to create seamless loop */}
    {[...Array(3)].map((_, index) => (
      <img 
        key={index}
        src={Logo} 
        alt=""
        aria-hidden="true"
        className="w-[400px] h-[400px] opacity-5 object-contain"
      />
    ))}
  </div>
</div>  
      
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              
              <a href="/" className="flex items-center space-x-2">
                          <div className="w-10 h-10 rounded-lg flex mr-[-12px] sm:ml-[-22px] justify-center overflow-hidden">
            <img src={Logo} alt="suiver logo" />
          </div>
                <h1 className="text-lg font-display font-bold text-gray-900">Suiver</h1>
              </a>
              <p className="text-sm text-gray-600 mt-2">
                Making Crypto as spendable as cash.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-600 
                  hover:text-[#F56BF7] text-sm">Home</a></li>
              
                  <li><a href="#about" className="text-gray-600 hover:text-[#F56BF7] text-sm">About</a></li>
                  <li><a href="#faq" className="text-gray-600 hover:text-[#F56BF7] text-sm">FAQ</a></li>
                  <li><a href="/whitepaper" className="text-gray-600 hover:text-[#F56BF7] text-sm">whitepaper</a></li>
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
              © {new Date().getFullYear()} Suiver. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              <a href="https://x.com/suiver_africtext-[#F56BF7a" className="text-[#F56BF7] hover:text-brand-primary">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              
              <a href="https://" className="text-[#F56BF7] hover:text-brand-primary">
                <span className="sr-only">Telegram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.18-2.935 5.35-4.827c.235-.21-.051-.329-.355-.119l-6.604 4.151-2.849-.92c-.62-.176-.64-.62.132-.912l11.13-4.27c.52-.19 1.01.124.8.736z" />
                </svg>
              </a>
              
              <a href="#" className="text-[#F56BF7] hover:text-brand-primary">
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

