import React from "react";

const Docs = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">
    {/* Sidebar */}
    <aside className="w-64 bg-black p-4 overflow-y-auto text-white">
      <h2 className="text-lg font-semibold mb-4">suiFI WhitePaper</h2>
      <nav>
        <ul className="space-y-5 pl-1">
       
          <li>
            <a href="#introduction" className="text-gray-300 hover:underline">
              Introduction
            </a>
          </li>
          <li>
            <a href="#suifi-overview" className="text-gray-300 hover:underline">
              suiFI Overview
            </a>
          </li>
          <li>
            <a href="#architecture" className="text-gray-300 hover:underline">
              Architecture
            </a>
          </li>
          <li>
            <a href="#core-features" className="text-gray-300 hover:underline">
              Core Features
            </a>
          </li>
          <li>
            <a href="#tokenomics" className="text-gray-300 hover:underline">
              Tokenomics
            </a>
          </li>
          <li>
            <a href="#security-compliance" className="text-gray-300 hover:underline">
              Security & Compliance
            </a>
          </li>
          <li>
            <a href="#use-cases" className="text-gray-300 hover:underline">
              Use Cases
            </a>
          </li>
          <li>
            <a href="#roadmap" className="text-gray-300 hover:underline">
              Roadmap
            </a>
          </li>
          <li>
            <a href="#team" className="text-gray-300 hover:underline">
              Team
            </a>
          </li>
          <li>
            <a href="#conclusion" className="text-gray-300 hover:underline">
              Conclusion
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-8 space-y-10">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">suiFI WhitePaper</h1>
        <div className="bg-blue-100 text-gray-900 p-4 rounded-lg flex items-center space-y-3">
          <div className="flex-1">
            <p>
              Bridging the gap between cross-chain crypto and fiat liquidity with a trustless, non-custodial P2P protocol.
            </p>
          </div>
          <div className="ml-4">
            {/* Placeholder for an image/logo - replace with your own */}
            <div className="w-24 h-24 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </header>

      {/* Abstract */}
      <section className="mb-8" id="abstract">
        <h2 className="text-2xl font-semibold mb-4 underline ">Abstract</h2>
        <p className="p-3">
          SUIFI is a decentralized protocol designed to simplify and secure cross-chain to fiat conversions, starting with SUI/NGN swaps. By addressing inefficiencies in centralized exchanges, traditional DeFi, and P2P systems, suiFI enables trustless, non-custodial transactions with smart routing and liquidity aggregation. This white paper outlines suiFI’s mission to empower users globally, starting with African markets, and its long-term vision for seamless crypto-fiat interoperability.
        </p>
      </section>

      {/* Introduction */}
      <section className="mb-8" id="introduction">
        <h2 className="text-2xl font-semibold mb-4 underline">Introduction</h2>
        <h3 className="text-xl font-medium mb-2 "><li>Problem with Current P2P and Fiat Conversion Systems</li></h3>
        <p className="p-3">
          Current P2P systems often rely on centralized intermediaries, leading to high fees, delayed settlements, and risks of fraud. Trust issues and lack of transparency further complicate the process.
          SUIFI is built to solve all those problems Bridging the cap in P2P trading
        </p>
        <h3 className="text-xl font-medium mb-2 mt-4 "><li>Limitations in Centralized Exchanges and Traditional DeFi</li></h3>
        <p className="p-3">
          Centralized exchanges impose high fees, require KYC, and are prone to hacks, while traditional DeFi lacks efficient fiat on/off-ramping, limiting mainstream adoption.
        </p>
        <h3 className="text-xl font-medium mb-2 mt-4">The Gap in Cross-Chain to Fiat Liquidity</h3>
        <p className="">
          Cross-chain ecosystems like Sui, Aptos, and Solana lack direct, secure fiat conversion mechanisms, creating a significant barrier for users seeking liquidity.
        </p>
      </section>

      {/* suiFI Overview */}
      <section className="mb-8" id="suifi-overview">
        <h2 className="text-2xl font-semibold mb-4 underline">suiFI Overview</h2>
        <h3 className="text-xl font-medium mb-2"><li>Vision</li></h3>
        <p>
          To create a seamless, trustless bridge between cross-chain crypto assets and fiat currencies, starting with African markets.
        </p>
        <h3 className="text-xl font-medium mb-2 mt-4"><li>Mission</li></h3>
        <p>
          Empower users with a secure, non-custodial platform for P2P crypto-fiat swaps, prioritizing accessibility and efficiency.
        </p>
        <h3 className="text-xl font-medium mb-2 mt-4">What Makes suiFI Different?</h3>
        <p>
          suiFI combines cross-chain integration, smart routing, and escrow-based P2P matching to deliver a unique, user-centric experience.
        </p>
      </section>

      {/* Architecture */}
      <section className="mb-8" id="architecture">
        <h2 className="text-2xl font-semibold mb-4 underline">Architecture</h2>
        <h3 className="text-xl font-medium mb-2">How suiFI Works</h3>
        <p>
          suiFI leverages smart contracts to facilitate trustless P2P swaps, aggregating liquidity across chains and fiat gateways.
        </p>
        <h3 className="text-xl font-medium mb-2 mt-4">Protocol Design</h3>
        <p>
          The protocol uses a modular design with escrow mechanisms, ensuring secure transactions without intermediaries.
        </p>
        <h3 className="text-xl font-medium mb-2 mt-4">Cross-Chain Integration (Sui, Aptos, Solana)</h3>
        <p>
          suiFI integrates with Sui, Aptos, and Solana using cross-chain bridges, enabling seamless asset transfers.
        </p>
        <h3 className="text-xl font-medium mb-2 mt-4">Fiat Gateway and On/Off-Ramping Model</h3>
        <p>
          Partnerships with fiat providers enable direct on/off-ramping, starting with NGN and expanding to other currencies.
        </p>
      </section>

      {/* Core Features */}
      <section className="mb-8" id="core-features">
        <h2 className="text-2xl font-semibold mb-4 underline">Core Features</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Direct SUI/NGN Swaps:</strong> Instant swaps between SUI and NGN with minimal fees.
          </li>
          <li>
            <strong>Non-Custodial Design:</strong> Users retain control of their funds throughout the process.
          </li>
          <li>
            <strong>Smart Routing and Liquidity Aggregation:</strong> Optimizes trades by sourcing liquidity across chains.
          </li>
          <li>
            <strong>Trustless P2P Matching with Escrow via Smart Contracts:</strong> Secure transactions with automated escrow.
          </li>
          <li>
            <strong>KYC/Compliance Layer (if applicable):</strong> Optional KYC for regulatory compliance in certain regions.
          </li>
        </ul>
      </section>

      {/* Tokenomics */}
      <section className="mb-8" id="tokenomics">
        <h2 className="text-2xl font-semibold mb-4">Tokenomics (if launching a native token)</h2>
        <h3 className="text-xl font-medium mb-2">Utility</h3>
        <p>
          The native token (if applicable) will be used for transaction fees, governance, and incentives.
        </p>
        <h3 className="text-xl font-medium mb-2 mt-4">Distribution</h3>
        <p>
          Token distribution will prioritize community allocation, with portions reserved for development and partnerships.
        </p>
        <h3 className="text-xl font-medium mb-2 mt-4">Governance</h3>
        <p>
          Token holders can vote on protocol upgrades and key decisions.
        </p>
        <h3 className="text-xl font-medium mb-2 mt-4">Incentives</h3>
        <p>
          Staking and liquidity provision will be rewarded with token incentives.
        </p>
      </section>

      {/* Security & Compliance */}
      <section className="mb-8" id="security-compliance">
        <h2 className="text-2xl font-semibold mb-4">Security & Compliance</h2>
        <h3 className="text-xl font-medium mb-2">How Users Are Protected</h3>
        <p>
          Smart contract audits, escrow mechanisms, and non-custodial design ensure user safety.
        </p>
        <h3 className="text-xl font-medium mb-2 mt-4">Regulatory Stance and Plans</h3>
        <p>
          suiFI aims to comply with regional regulations, starting with optional KYC in African markets.
        </p>
      </section>

      {/* Use Cases */}
      <section className="mb-8" id="use-cases">
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Traders:</strong> Swap SUI for NGN directly without intermediaries.
          </li>
          <li>
            <strong>Merchants:</strong> Accept crypto payments and convert to fiat seamlessly.
          </li>
          <li>
            <strong>Crypto Freelancers:</strong> Receive payments in crypto and convert to local currency.
          </li>
          <li>
            <strong>On-Chain Arbitrage:</strong> Leverage cross-chain liquidity for arbitrage opportunities.
          </li>
        </ul>
      </section>

      {/* Roadmap */}
      <section className="mb-8" id="roadmap">
        <h2 className="text-2xl font-semibold mb-4">Roadmap</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Q3 2025:</strong> Launch MVP with SUI/NGN swaps.
          </li>
          <li>
            <strong>Q4 2025:</strong> Full cross-chain deployment (Sui, Aptos, Solana).
          </li>
          <li>
            <strong>Q1 2026:</strong> Establish fiat partnerships and expand to African markets.
          </li>
          <li>
            <strong>Future:</strong> Add support for more chains and fiat currencies.
          </li>
        </ul>
      </section>

      {/* Team */}
      <section className="mb-8" id="team">
        <h2 className="text-2xl font-semibold mb-4">Team</h2>
        <p>
          The suiFI team consists of experienced blockchain developers, financial experts,
           and advisors. 
           Lead by Jeffrey Agabaenwere (Jeffrey.sui)
        </p>
      </section>

      {/* Conclusion */}
      <section className="mb-8" id="conclusion">
        <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
        <p>
          suiFI is poised to revolutionize crypto-fiat interoperability by providing a secure, trustless, 
          and efficient platform for cross-chain P2P swaps. Our long-term vision is to become the go-to solution for global crypto-fiat liquidity, starting with Africa and expanding worldwide.
        </p>
      </section>
    </main>
  </div>
  );
};

export default Docs;