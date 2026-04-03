import React, { useState, useRef } from 'react';
import './PortfolioList.css';

// Import portfolio images
import cwnImage from '../assets/portfolio/portfolio_0000_cwn.webp';
import tattuImage from '../assets/portfolio/portfolio_0001_tattu.webp';
import ppImage from '../assets/portfolio/portfolio_0002_pp.webp';
import pctaxImage from '../assets/portfolio/portfolio_0003_pctax.webp';
import weduImage from '../assets/portfolio/portfolio_0004_wedu.webp';
import wartonImage from '../assets/portfolio/portfolio_0005_warton ed.webp';
import engImage from '../assets/portfolio/portfolio_0006_eng.webp';
import mmxImage from '../assets/portfolio/portfolio_0007_mmx.webp';
import ffImage from '../assets/portfolio/portfolio_0008_ff.webp';
import minimusPortfolioImage from '../assets/portfolio/minimus_portfolio.webp';
import harbatsImage from '../assets/portfolio/portfolio_0010_harbats.webp';

const projects = [
  { name: 'SOURCEBOOK', tech: 'Laravel', screenshot: cwnImage },
  { name: 'MINIMUS', tech: 'React', screenshot: minimusPortfolioImage },
  { name: 'RAMP HEALTH', tech: 'WordPress', screenshot: cwnImage },
  { name: 'TATTUMUNDO', tech: 'WordPress · Woocommerce', screenshot: tattuImage },
  { name: 'STUDIO PP', tech: 'WordPress', screenshot: ppImage },
  { name: "PEOPLE'S CHOICE TAX", tech: 'WordPress · PHP', screenshot: pctaxImage },
  { name: 'WEDU READING', tech: 'wordPress', screenshot: weduImage },
  { name: 'WARTON EDUCATION', tech: 'WordPress', screenshot: wartonImage },
  { name: 'ENG APP', tech: 'wordPress', screenshot: engImage },
  { name: 'MEDIA.XCHANGE', tech: 'WordPress', screenshot: mmxImage },
  { name: 'FAMILY FOOD', tech: 'WordPress · Laravel', screenshot: ffImage },
  { name: 'HARBATS', tech: 'React', screenshot: harbatsImage }
];

const PortfolioList = ({ onActiveChange }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isRaised, setIsRaised] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const portfolioListRef = useRef(null);

  const handleToggle = (index) => {
    // If not raised, only allow the clicked item to activate (no restrictions)
    if (!isRaised) {
      // First activation - raise the list
      setActiveIndex(index);
      setIsRaised(true);
      onActiveChange(true);
    } else {
      // Already raised - just switch which item is enlarged
      const newActiveIndex = activeIndex === index ? null : index;
      setActiveIndex(newActiveIndex);
      
      // If clicking the active item again, collapse everything
      if (newActiveIndex === null) {
        setIsRaised(false);
        onActiveChange(false);
      }
    }
  };

  const handleScroll = () => {
    if (portfolioListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = portfolioListRef.current;
      const position = scrollLeft / (scrollWidth - clientWidth);
      setScrollPosition(position);
    }
  };

  const scroll = (direction) => {
    if (portfolioListRef.current) {
      const scrollAmount = 300; // Width of one item plus padding
      portfolioListRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollPosition < 1;

  return (
    <div className={`portfolio-container ${activeIndex !== null ? 'active' : ''}`}>
      {/* Swiss Design Navigation Arrows */}
      <div className="portfolio-navigation">
        <button 
          className={`nav-arrow nav-arrow-left ${!canScrollLeft ? 'disabled' : ''}`}
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        
        <button 
          className={`nav-arrow nav-arrow-right ${!canScrollRight ? 'disabled' : ''}`}
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>

      <div 
        ref={portfolioListRef}
        className="portfolio-list"
        onScroll={handleScroll}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className={`portfolio-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleToggle(index)}
          >
            <div className="project-name">{project.name}</div>
            <div className="swiss-underline"></div>
            <div className="tech-stack">{project.tech}</div>
            <div className="secondary-rule"></div>
            
            <div className={`screenshot-container ${activeIndex === index ? 'expanded' : ''}`}>
              {project.screenshot ? (
                <img 
                  src={project.screenshot} 
                  alt={`${project.name} screenshot`}
                  className="screenshot"
                />
              ) : (
                <div className="screenshot-placeholder"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioList;
