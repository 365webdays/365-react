import { useState, useEffect } from 'react';

/**
 * Custom hook to check if the viewport matches a media query
 * @param {string} query - The media query to match (e.g., '(min-width: 768px)')
 * @returns {boolean} - Whether the media query matches
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is defined (SSR safety)
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(query);
    setMatches(media.matches);

    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // Add event listener for media query changes
    media.addEventListener('change', handleChange);

    // Cleanup on unmount
    return () => {
      media.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

/**
 * Convenience hook for desktop breakpoint (min-width: 769px)
 * @returns {boolean} - Whether viewport is desktop size
 */
export const useDesktop = () => {
  return useMediaQuery('(min-width: 769px)');
};
