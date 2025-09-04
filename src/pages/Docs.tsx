import React,{useState} from "react";
import logo from '../assets/logo.png'
import { Menu, X } from "lucide-react"
const Docs = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 768) { // Close sidebar on mobile when link is clicked
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen relative bg-gradient-to-br from-black to-[#661F5D]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img 
          src={logo} 
          alt="suiver logo" 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-5 w-[800px]"
        />
      </div>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-purple-900/50 backdrop-blur-sm text-white hover:bg-purple-800/50 transition-colors"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
          fixed md:static w-[280px] md:w-64 h-full bg-black/20 backdrop-blur-xl 
          p-4 overflow-y-auto text-white border-r border-white/10 
          transition-all duration-300 ease-in-out z-40
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
        <h2 className="text-lg font-semibold mb-4">Suiver Whitepaper</h2>
        <nav>
          <ul className="space-y-5 pl-1">
            {[
              { href: "#introduction", text: "Introduction" },
              { href: "#overview", text: "Suiver Overview" },
              { href: "#architecture", text: "Architecture" },
              { href: "#core-features", text: "Core Features" },
              { href: "#ecosystem", text: "Ecosystem & Growth" },
              { href: "#security", text: "Security & Compliance" },
              { href: "#use-cases", text: "Use Cases" },
              { href: "#roadmap", text: "Roadmap" },
              { href: "#team", text: "Team" },
              { href: "#conclusion", text: "Conclusion" }
            ].map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href}
                  className="text-gray-300 hover:text-white hover:underline transition-colors"
                  onClick={handleLinkClick}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`
        flex-1 p-4 md:p-8 space-y-8 
        bg-black/10 backdrop-blur-md 
        relative z-10 text-white 
        overflow-y-auto transition-all duration-300
        ${isSidebarOpen ? 'blur-sm md:blur-none pointer-events-none md:pointer-events-auto' : ''}
        pt-16 md:pt-8
      `}>
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Suiver Whitepaper</h1>
          <div className="bg-white/10 text-white p-4 rounded-lg flex items-center">
            <div className="flex-1">
              <p>
                Suiver is building the fastest way to move between crypto and
                local cash, pay bills, send money, and swap instantly, all from
                one simple platform.
              </p>
            </div>
            <div className="ml-4">
              <div className="w-24 h-24rounded-lg">
                 <img src={logo} alt="suiver" className="rounded-2xl" />
              </div>
            </div>
          </div>
        </header>

        {/* Introduction */}
        <section className="mb-8" id="introduction">
          <h2 className="text-2xl font-semibold mb-4 underline">
            Introduction
          </h2>
          <p className="p-3">
            Moving between crypto and cash today is slow, costly, and filled
            with friction. Centralized exchanges charge high fees, P2P systems
            are risky, and banks aren’t built for digital assets. Suiver solves
            this by making crypto as easy as cash — instant, reliable, and ready
            for everyday use.
          </p>
        </section>

        {/* Suiver Overview */}
        <section className="mb-8" id="overview">
          <h2 className="text-2xl font-semibold mb-4 underline">
            Suiver Overview
          </h2>
          <h3 className="text-xl font-medium mb-2">Vision</h3>
          <p>
            To make crypto practical for everyone by enabling seamless swaps,
            instant payments, and cash-like usability worldwide.
          </p>
          <h3 className="text-xl font-medium mb-2 mt-4">Mission</h3>
          <p>
            Empower Africans (and later the world) with a platform where
            depositing crypto means instant access to cash — spendable on bills,
            airtime, and transfers in seconds.
          </p>
        </section>

        {/* Architecture */}
        <section className="mb-8" id="architecture">
          <h2 className="text-2xl font-semibold mb-4 underline">
            Architecture
          </h2>
          <p>
            Suiver connects blockchain liquidity with local payment rails. It
            combines decentralized crypto swaps with fiat gateways, ensuring
            speed and security without relying on slow intermediaries.
          </p>
        </section>

        {/* Core Features */}
        <section className="mb-8" id="core-features">
          <h2 className="text-2xl font-semibold mb-4 underline">
            Core Features
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Instant Swaps:</strong> Convert crypto to cash in
              seconds.
            </li>
            <li>
              <strong>Bill Payments:</strong> Buy airtime, pay utilities, and
              settle expenses directly.
            </li>
            <li>
              <strong>Money Transfers:</strong> Send funds instantly to family
              or businesses.
            </li>
            <li>
              <strong>Non-Custodial Foundation:</strong> Users retain control of
              their crypto until settlement.
            </li>
            <li>
              <strong>Simple UX:</strong> Designed to be as intuitive as
              sending cash.
            </li>
          </ul>
        </section>

        {/* Ecosystem */}
        <section className="mb-8" id="ecosystem">
          <h2 className="text-2xl font-semibold mb-4 underline">
            Ecosystem & Growth
          </h2>
          <p>
            Suiver starts in Nigeria with NGN liquidity, then scales to other
            African currencies before going global. The ecosystem grows by
            adding integrations for merchants, remittances, and borderless
            commerce.
          </p>
        </section>

        {/* Security */}
        <section className="mb-8" id="security">
          <h2 className="text-2xl font-semibold mb-4 underline">
            Security & Compliance
          </h2>
          <p>
            Smart contracts, audited infrastructure, and strong compliance
            measures protect users. Suiver is designed to align with regulations
            while remaining borderless and accessible.
          </p>
        </section>

        {/* Use Cases */}
        <section className="mb-8" id="use-cases">
          <h2 className="text-2xl font-semibold mb-4 underline">Use Cases</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Everyday Users:</strong> Swap crypto for cash instantly to
              cover daily needs.
            </li>
            <li>
              <strong>Freelancers:</strong> Receive international crypto
              payments and access funds instantly in local currency.
            </li>
            <li>
              <strong>Merchants:</strong> Accept crypto and cash out without
              delay.
            </li>
            <li>
              <strong>Remittances:</strong> Families abroad can send crypto that
              converts instantly into spendable cash.
            </li>
          </ul>
        </section>

        {/* Roadmap */}
        <section className="mb-8" id="roadmap">
          <h2 className="text-2xl font-semibold mb-4 underline">Roadmap</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Q4 2025:</strong> Launch with NGN liquidity and bill
              payment support.
            </li>
            <li>
              <strong>Q1 2026:</strong> Expand to more African currencies and
              merchant integrations.
            </li>
            <li>
              <strong>Future:</strong> Global rollout with multi-currency
              support and remittance corridors.
            </li>
          </ul>
        </section>

        {/* Team */}
        <section className="mb-8" id="team">
          <h2 className="text-2xl font-semibold mb-4 underline">Team</h2>
          <p>
            Suiver is led by a team of blockchain builders and fintech
            innovators, founded by Jeffrey Agabaenwere,
            <br />
            Jeffrey is a software engineer and product builder with a vision to make crypto usable by everyday people. With a background in fintech and Web3, he has consistently worked on bridging gaps between blockchain technology and real-world adoption. As the founder of Suiver, Jeffrey leads with a focus on accessibility, speed, and trust — reimagining how Africans, and eventually the world, interact with money. with a
            mission to make crypto usable by everyone.
          </p>
        </section>

        {/* Conclusion */}
        <section className="mb-8" id="conclusion">
          <h2 className="text-2xl font-semibold mb-4 underline">Conclusion</h2>
          <p>
            Suiver is reimagining crypto as everyday money. By removing friction
            between digital assets and local cash, we’re unlocking a future
            where crypto isn’t just an investment, it’s the easiest way to pay,
            send, and live.
          </p>
        </section>
      </main>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Docs;
