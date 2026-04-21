import React, { useState } from 'react';
import logo from './assets/365webdays_web_design_development.png';
import PortfolioList from './components/PortfolioList';
import './components/Footer.css';

function App() {
  const [isPortfolioActive, setIsPortfolioActive] = useState(false);

  return (
    <div className="w-screen min-h-screen bg-[#F7F7F5] flex flex-col">
      <header className="w-full py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <img 
            src={logo} 
            alt="365 Web Days Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>
      </header>
      
      <main className="flex flex-col">
        <div className="w-full max-w-7xl mx-auto px-4 py-12">
          <div className="text-left">
            <p className="text-sm md:text-base lg:text-lg font-['DM Sans'] font-medium mb-2 m-0 p-0 text-[#777777]">WEB DESIGN & DEVELOPMENT</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-['DM Sans'] font-bold mb-4 m-0 p-0 text-[#111111]">We create outcomes</h2>
            <p className={`text-base md:text-lg lg:text-xl font-['DM Sans'] font-normal mb-8 m-0 p-0 text-[#333333] max-w-2xl transition-opacity duration-400 ${isPortfolioActive ? 'opacity-0' : 'opacity-100'}`}>
              Sixteen years crafting websites where design and performance are equal obsessions. Design and precise development for businesses that want a website that looks the part and performs. Whether it's a custom CMS, a landing page that converts, or something entirely its own, we build where craft meets outcome.
            </p>
          </div>
        </div>
        
        <div className="flex-1" style={{ marginTop: isPortfolioActive ? '-200px' : '0', transition: 'margin-top 0.3s ease' }}>
          <PortfolioList onActiveChange={setIsPortfolioActive} />
        </div>
      </main>
      
      {/* Thin Footer Strip */}
      <footer className="swiss-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3 className="footer-title">365WEBDAYS</h3>
          </div>
          
          <div className="footer-contact">
            <a href="#" className="footer-email" onClick={(e) => {
              e.preventDefault();
              window.location.href = 'mailto' + ':' + 'hello' + '@' + '365webdays' + '.' + 'com';
            }}>
              hello [at] 365webdays [dot] com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
