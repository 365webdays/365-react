import React, { useState, useRef } from 'react';
import './PortfolioList.css';

// Import portfolio images
import sourcebookImage from '../assets/portfolio/portfolio_0011_sourcebook.webp';
import rampHealthImage from '../assets/portfolio/portfolio_0000_cwn.webp';
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
  { 
    name: 'SOURCEBOOK', 
    tech: 'Laravel', 
    screenshot: sourcebookImage,
    description: 'A Laravel-based B2B directory platform connecting Philippine businesses across industries. Features a searchable company directory, product listings, an interactive heat map, and a structured industry classification system.',
    url: 'https://sourcebook.ph/',
    highlights: ['Custom admin dashboard', 'Real-time collaboration', 'Advanced search functionality']
  },
  { 
    name: 'MINIMUS', 
    tech: 'React', 
    screenshot: minimusPortfolioImage,
    description: 'A minimalist React application showcasing modern web development with clean design principles.',
    url: 'https://minimus.music/',
    highlights: ['Component-based architecture', 'Optimized performance', 'Responsive design']
  },
  { 
    name: 'RAMP HEALTH', 
    tech: 'WordPress', 
    screenshot: rampHealthImage,
    description: 'Healthcare website built on WordPress with patient management and appointment scheduling.',
    url: 'https://ramphealth.com/',
    highlights: ['HIPAA compliant', 'Online booking system', 'Mobile responsive']
  },
  { 
    name: 'TATTUMUNDO', 
    tech: 'WordPress · Woocommerce', 
    screenshot: tattuImage,
    description: 'E-commerce platform for tattoo artists with portfolio management and booking system.',
    url: 'https://tattumundo.com/',
    highlights: ['Artist portfolios', 'Booking system', 'E-commerce integration']
  },
  { 
    name: 'STUDIO PP', 
    tech: 'WordPress', 
    screenshot: ppImage,
    description: 'Creative agency website with project showcase and client collaboration tools.',
    url: 'https://studiopp.com.au/',
    highlights: ['Project galleries', 'Client portal', 'CMS integration']
  },
  { 
    name: "PEOPLE'S CHOICE TAX", 
    tech: 'WordPress · PHP', 
    screenshot: pctaxImage,
    description: 'Tax preparation services website with client document management and scheduling.',
    url: 'https://www.pctaxservice.com/',
    highlights: ['Secure document upload', 'Appointment scheduling', 'Tax calculator']
  },
  { 
    name: 'WEDU READING', 
    tech: 'WordPress', 
    screenshot: weduImage,
    description: 'Educational platform focused on reading comprehension and literacy development.',
    url: 'https://wedureading.com/',
    highlights: ['Interactive lessons', 'Progress tracking', 'Parent dashboard']
  },
  { 
    name: 'WARTON EDUCATION', 
    tech: 'WordPress', 
    screenshot: wartonImage,
    description: 'Educational institution website with course management and student portal.',
    url: 'https://wartoneducation.com/',
    highlights: ['Course catalog', 'Student portal', 'Online registration']
  },
  { 
    name: 'ENG APP', 
    tech: 'WordPress', 
    screenshot: engImage,
    description: 'English learning application with interactive exercises and progress tracking.',
    url: 'http://mylanguagelearning.com/',
    highlights: ['Interactive exercises', 'Speech recognition', 'Progress analytics']
  },
  { 
    name: 'MEDIA.XCHANGE', 
    tech: 'WordPress', 
    screenshot: mmxImage,
    description: 'Media sharing platform with content management and social features.',
    url: 'https://mediadotexchange.com/',
    highlights: ['Media upload', 'Social sharing', 'Content management']
  },
  { 
    name: 'FAMILY FOOD', 
    tech: 'WordPress · Laravel', 
    screenshot: ffImage,
    description: 'Family recipe sharing platform with meal planning and grocery lists.',
    url: 'https://familyfoodllc.com/',
    highlights: ['Recipe sharing', 'Meal planning', 'Grocery integration']
  },
  { 
    name: 'HARBATS', 
    tech: 'React', 
    screenshot: harbatsImage,
    description: 'Modern React application showcasing advanced frontend development techniques.',
    url: 'https://harbats.com/',
    highlights: ['Advanced React patterns', 'State management', 'Performance optimization']
  }
];

const PortfolioList = ({ onActiveChange }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isRaised, setIsRaised] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const portfolioListRef = useRef(null);

  const handleToggle = (index) => {
    // Check if item is fully visible, if not, scroll it into view first
    if (portfolioListRef.current) {
      const container = portfolioListRef.current;
      const itemWidth = 280; // Base width of portfolio item
      const expandedWidth = 480; // Expanded width for desktop
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const itemPosition = index * itemWidth;
      
      // Check if item is not fully visible OR if expanded item would go off-screen
      const itemStart = itemPosition - scrollLeft;
      const itemEnd = itemStart + itemWidth;
      const expandedEnd = itemStart + expandedWidth;
      
      if (itemStart < 0 || expandedEnd > containerWidth) {
        // Calculate scroll position so expanded item's right edge sticks to screen edge
        const targetScroll = itemPosition + expandedWidth - containerWidth;
        
        // Ensure we don't scroll past the beginning (minimum scroll = 0)
        const finalScroll = Math.max(0, targetScroll);
        
        container.scrollTo({
          left: finalScroll,
          behavior: 'smooth'
        });
        
        // Wait for scroll to complete, then activate
        setTimeout(() => {
          activateItem(index);
        }, 400); // Wait for smooth scroll to complete
      } else {
        // Item is fully visible and expansion fits, activate immediately
        activateItem(index);
      }
    }
  };

  const activateItem = (index) => {
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
              
              {/* All additional content positioned to the right of thumbnail */}
              {activeIndex === index && (
                <div className="features-right">
                  <h4 className="highlights-title">KEY FEATURES:</h4>
                  <ul className="highlights-list">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="highlight-item">{highlight}</li>
                    ))}
                  </ul>
                  
                  <p className="project-description">{project.description}</p>
                  <div className="project-url">
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="url-link"
                    >
                      View Live Site →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioList;
