import React, { useEffect, useRef, useState } from 'react';
import './PortfolioList.css';
import { projects } from '../data/projects';
import { useDesktop } from '../hooks/useMediaQuery';

const PortfolioList = ({ onActiveChange }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isRaised, setIsRaised] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const portfolioListRef = useRef(null);
  const scrollAnimRef = useRef(null);
  const isDesktop = useDesktop();

  const smoothScrollTo = (el, target, duration = 450) => {
    if (scrollAnimRef.current) cancelAnimationFrame(scrollAnimRef.current);
    const start = el.scrollLeft;
    const change = target - start;
    if (change === 0) return;
    const startTime = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      el.scrollLeft = start + change * easeOutCubic(t);
      if (t < 1) {
        scrollAnimRef.current = requestAnimationFrame(step);
      } else {
        scrollAnimRef.current = null;
      }
    };
    scrollAnimRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (!isDesktop) return;
    if (activeIndex === null) return;
    if (!portfolioListRef.current) return;

    const container = portfolioListRef.current;
    const items = container.querySelectorAll('.portfolio-item');
    const item = items[activeIndex];
    if (!item) return;

    const centerItem = () => {
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      const containerCenterX = containerRect.left + containerRect.width / 2;
      const itemCenterX = itemRect.left + itemRect.width / 2;
      const deltaX = itemCenterX - containerCenterX;

      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const targetScrollLeft = container.scrollLeft + deltaX;
      const finalScrollLeft = Math.min(maxScrollLeft, Math.max(0, targetScrollLeft));

      container.scrollTo({
        left: finalScrollLeft,
        behavior: 'smooth'
      });
    };

    const raf1 = requestAnimationFrame(() => {
      centerItem();
    });

    return () => {
      cancelAnimationFrame(raf1);
    };
  }, [activeIndex]);

  const handleToggle = (index) => {
    activateItem(index);
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
      const isMobile = !isDesktop;
      const items = container.querySelectorAll('.portfolio-item');
      
      if (items.length > 0) {
        // If an item is active (expanded), activate the next/previous item
        if (activeIndex !== null) {
          const nextIndex = direction === 'left' 
            ? Math.max(0, activeIndex - 1)
            : Math.min(items.length - 1, activeIndex + 1);
          
          // Only activate if the index is different from current
          if (nextIndex !== activeIndex) {
            handleToggle(nextIndex);
          }
        } else {
          // No item active - smoothly scroll by exactly one item width
          // relative to the current scroll position (no index snapping).
          const itemWidth = items[0].offsetWidth;
          const delta = direction === 'left' ? -itemWidth : itemWidth;
          const maxScrollLeft = container.scrollWidth - container.clientWidth;
          const targetScroll = Math.min(
            maxScrollLeft,
            Math.max(0, container.scrollLeft + delta)
          );

          smoothScrollTo(container, targetScroll, 450);
        }
      }
    }
  };

  const canScrollLeft = activeIndex !== null ? activeIndex > 0 : scrollPosition > 0.01;
  const canScrollRight = activeIndex !== null ? activeIndex < projects.length - 1 : scrollPosition < 0.99;

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
        
        {activeIndex !== null && (
          <button 
            className="nav-arrow nav-arrow-close"
            onClick={() => handleToggle(activeIndex)}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
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
            className={`portfolio-item ${activeIndex === index && isDesktop ? 'active' : ''}`}
            onClick={isDesktop ? () => handleToggle(index) : undefined}
          >
            <div className="project-name">{project.name}</div>
            <div className="swiss-underline"></div>
            <div className="tech-stack">{project.tech}</div>
            <div className="secondary-rule"></div>

            <div className={`screenshot-container ${activeIndex === index ? 'expanded' : ''} ${!isDesktop ? 'mobile-always-open' : ''}`}>
              <div className="screenshot-reveal">
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
            
            {activeIndex === index || !isDesktop ? (
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
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioList;
