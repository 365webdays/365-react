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
import simImage from '../assets/portfolio/portfolio_sim.webp';
import harbatsImage from '../assets/portfolio/portfolio_0010_harbats.webp';

const projects = [
  { 
    name: 'SOURCEBOOK', 
    tech: 'Laravel • MySQL', 
    screenshot: sourcebookImage,
    description: 'A Laravel-based B2B directory platform connecting Philippine businesses across industries. Features a searchable company directory, product listings, an interactive heat map, and a structured industry classification system.',
    url: 'https://sourcebook.ph/',
    highlights: ['Custom admin dashboard', 'Real-time collaboration', 'Advanced search functionality']
  },
  { 
    name: 'MINIMUS', 
    tech: 'React • Tailwind', 
    screenshot: minimusPortfolioImage,
    description: 'A React-built artist site for Minimus, an electronic chillwave, ambient, and synthpop project. Features a custom-built media player designed to match the mood and aesthetic of the music.',
    url: 'https://minimus.music/',
    highlights: ['Custom React media player', 'Chillwave / ambient / synthpop catalogue', 'Fully bespoke UI built around the artist\'s sound and identity']
  },
  { 
    name: 'GAEM', 
    tech: 'Laravel • React', 
    screenshot: simImage,
    description: 'A persistent, narrative-driven web game where the player experiences the absurd, humorous, and occasionally existential life of an unemployed web developer. The game blends satire of modern web development culture, freelance instability, and tech burnout with a lightweight progression system. Time is measured in game days only. No real-world clock, no login timestamps, no time-of-day mechanics.',
    url: 'https://365webdays.com/sim',
    highlights: ['Turn-based gameplay loop with Action Points (AP), stat management, and multiple endings (Hired vs Collapsed)', 'Dynamic narrative event system with conditional, risk-based, and randomized story outcomes', 'Custom portfolio decay system and cascading stat mechanics influencing gameplay and player decisions']
  },
  { 
    name: 'FAMILY FOOD', 
    tech: 'Laravel • Bespoke MVC Framework', 
    screenshot: ffImage,
    description: 'A site for Family Food LLC, a Philadelphia-based Registered Dietitian Nutritionist practice offering personalized nutrition counseling for individuals, families, and organizations. The site serves as both a service platform and a lead generation tool for a practice that accepts most health insurance plans.',
    url: 'https://familyfoodllc.com/',
    highlights: ['Custom MVC architecture with MySQL powering a bespoke appointment management system', 'Dual audience structure serving individuals and organizations separately', 'Service pages covering nutrition counseling, pediatric nutrition, oncology, diabetes, prenatal nutrition, and corporate wellness', 'Virtual appointment booking via Calendly integration', 'Insurance acceptance prominently featured to reduce booking friction']
  },
  { 
    name: 'HARBATS', 
    tech: 'Next.js • React + TypeScript', 
    screenshot: harbatsImage,
    description: 'A Next.js-built artist site for Harbats, an enigmatic Manila-based band known for their distinct take on the iconic Manila sound. The site features a custom-built media player designed around the band\'s rolling single release series, giving fans a purpose-built listening experience rather than a generic streaming embed.',
    url: 'https://harbats.com/',
    highlights: ['Custom Laravel media player built specifically for the band\'s release format', 'Chronological single release tracker displaying the full discography rollout', 'Streaming platform integration linking to YouTube Music and Deezer as secondary touchpoints', 'Minimal, atmosphere-first design built around the band\'s visual identity']
  },
  { 
    name: 'RAMP HEALTH', 
    tech: 'WordPress • Custom MVC', 
    screenshot: rampHealthImage,
    description: 'A WordPress-built corporate health and wellness platform serving employers, health plans, and government clients across the US. Covers the full continuum of care — from clinical services and health screenings to digital health, AI risk mitigation, and employee wellbeing programs.',
    url: 'https://ramphealth.com/',
    highlights: ['Multi-service platform spanning clinical, wellbeing, and digital health', 'Proprietary digital health portal with participant login', 'HIPAA compliant, HITRUST certified']
  },
  { 
    name: 'TATTUMUNDO', 
    tech: 'WordPress • Woocommerce', 
    screenshot: tattuImage,
    description: 'A WordPress WooCommerce e-commerce platform for Tattumundo, a Philippine-based temporary tattoo brand featuring designs by local independent artists. Each collection is artist-led, with its own name, story, and aesthetic.',
    url: 'https://tattumundo.com/',
    highlights: ['WooCommerce store with wishlist and multi-currency support (PHP/USD)', 'Artist profile pages alongside their collections', 'Product variant support for multi-design packs', 'Category filtering by style', 'Video integration for product how-to content']
  },
  { 
    name: 'STUDIO PP', 
    tech: 'WordPress', 
    screenshot: ppImage,
    description: 'A WordPress membership site for Studio PP, a boutique Pilates and functional fitness studio founded by Australian Winter Olympian Steph Prem. The site serves both the physical Melbourne studio and an online membership platform offering on-demand Pilates, barre, and functional fitness classes.',
    url: 'https://studiopp.com.au/',
    highlights: ['Membership and subscription system with monthly and yearly pricing tiers', 'Online studio with on-demand class access via MindBody integration', '21-day challenge sign-up and members portal', 'Event and workshop pages for live and retreats', 'Corporate Pilates and speaking engagement sections', 'Newsletter sign-up with free class incentive']
  },
  { 
    name: "PEOPLE'S CHOICE TAX", 
    tech: 'WordPress • PHP', 
    screenshot: pctaxImage,
    description: 'A WordPress site for People\'s Choice Tax and Accounting, an independent income tax preparation and bookkeeping firm based in Tustin, Orange County, California. The site serves small business owners and individuals looking for personal, locally owned financial services.',
    url: 'https://www.pctaxservice.com/',
    highlights: ['Service pages covering income tax, bookkeeping, and business coaching', 'Bilingual support with an English and Spanish version', 'Client resource section with tax deadlines, document checklists, and forms', 'IRS refund tracking integration']
  },
  { 
    name: 'WEDU READING', 
    tech: 'WordPress', 
    screenshot: weduImage,
    description: 'A web platform for Wedu Reading, an EdTech product designed to develop critical reading skills for high school students preparing for the SAT and ACT. The platform combines structured reading practice with a separate student portal for login, progress tracking, and guided challenges.',
    url: 'https://wedureading.com/',
    highlights: ['Separate reader tracks for SAT/ACT prep, high school, and parent-facing content', 'Student login portal at portal.wedureading.com', '30-day SAT and ACT reading challenge programs', 'Motivational quote carousel for engagement', 'Clean mobile-responsive layout optimized for student use']
  },
  { 
    name: 'WARTON EDUCATION', 
    tech: 'WordPress', 
    screenshot: wartonImage,
    description: 'A WordPress site for Warton Education, a college admissions and test prep consultancy founded by a Harvard graduate with 18 years of tutoring experience. The site serves high school students pursuing SAT, ACT, and AP preparation alongside personalized college consulting for top-tier university admissions.',
    url: 'https://wartoneducation.com/',
    highlights: ['Course pages for SAT, ACT, and AP online programs', 'Separate sections for online tutoring and college consulting services', 'Student results and reviews pages with verified admissions outcomes', 'Blog with test prep and college admissions news', 'Notable stats prominently displayed including 5 perfect SAT scores and 20 perfect ACT scores since 2016']
  },
  { 
    name: 'ENG APP', 
    tech: 'WordPress', 
    screenshot: engImage,
    description: 'A landing page for ENG, a mobile vocabulary app that teaches the top 1,000 most commonly used English words. Built around a single focused conversion goal — driving downloads to both the App Store and Google Play. The page leads with a sharp value proposition: 1,000 words cover 89% of everyday writing.',
    url: 'http://mylanguagelearning.com/',
    highlights: ['App download landing page with dual App Store and Google Play CTAs', 'Single-page, conversion-focused layout', 'App showcase visual with clean product presentation', 'Minimal navigation to keep focus on the download action']
  },
  { 
    name: 'MEDIA.XCHANGE', 
    tech: 'WordPress', 
    screenshot: mmxImage,
    description: 'A WordPress site for media.Xchange Public Relations, a boutique PR and events firm founded in 2007 and recognized as one of the best boutique PR agencies in Asia-Pacific at the 2022 and 2024 PR Awards Asia. The site serves as the agency\'s primary digital presence, showcasing their services, client roster, press releases, and career opportunities.',
    url: 'https://mediadotexchange.com/',
    highlights: ['Full-screen slider-driven layout with sectioned storytelling', 'Comprehensive services pages covering media relations, events management, social media, content creation, and policy communications', 'Extensive client roster page featuring over 80 clients including NBA, UNICEF, Bloomberg, L\'Oreal, Warner Music Group, and the United Nations', 'Press releases section with featured coverage', 'Careers portal with active job listings', 'Bilingual-ready contact and inquiry system']
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
      const container = portfolioListRef.current;
      const isMobile = window.innerWidth <= 768;
      const items = container.querySelectorAll('.portfolio-item');
      
      if (items.length > 0) {
        // Get current scroll position and calculate current item index
        const currentScrollLeft = container.scrollLeft;
        const itemWidth = items[0].offsetWidth;
        const currentIndex = Math.round(currentScrollLeft / itemWidth);
        
        // Calculate next index with boundary protection
        const nextIndex = direction === 'left' 
          ? Math.max(0, currentIndex - 1)
          : Math.min(items.length - 1, currentIndex + 1);
        
        // Scroll to exact position of next item for snap behavior
        const targetScroll = nextIndex * itemWidth;
        
        container.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  };

  const canScrollLeft = scrollPosition > 0.01;
  const canScrollRight = scrollPosition < 0.99;

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
            className={`portfolio-item ${activeIndex === index && window.innerWidth > 768 ? 'active' : ''}`}
            onClick={window.innerWidth > 768 ? () => handleToggle(index) : undefined}
          >
            <div className="project-name">{project.name}</div>
            <div className="swiss-underline"></div>
            <div className="tech-stack">{project.tech}</div>
            <div className="secondary-rule"></div>
            
            <div className={`screenshot-container ${activeIndex === index ? 'expanded' : ''} ${window.innerWidth <= 768 ? 'mobile-always-open' : ''}`}>
              {project.screenshot ? (
                <img 
                  src={project.screenshot} 
                  alt={`${project.name} screenshot`}
                  className="screenshot"
                />
              ) : (
                <div className="screenshot-placeholder"></div>
              )}
              
              <div className="project-details">
                <p className="project-description">{project.description}</p>
                <ul className="project-highlights">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
                {project.url && (
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View Live Site →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioList;
