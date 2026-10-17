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

export const projects = [
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
    name: 'FAMILY FOOD',
    tech: 'Laravel • Bespoke MVC Framework',
    screenshot: ffImage,
    description: 'A site for Family Food LLC, a Philadelphia-based Registered Dietitian Nutritionist practice offering personalized nutrition counseling. The site serves as both a service platform and a lead generation tool for a practice that accepts most health insurance plans.',
    url: 'https://familyfoodllc.com/',
    highlights: ['Custom MVC architecture with MySQL powering a bespoke appointment management system', 'Dual audience structure serving individuals and organizations separately', 'Insurance acceptance prominently featured to reduce booking friction']
  },
  {
    name: 'HARBATS',
    tech: 'Astro • Tailwind + TypeScript',
    screenshot: harbatsImage,
    description: 'An Astro-built artist site for Harbats, an enigmatic Manila-based band known for their distinct take on the iconic Manila sound. The site features a custom-built media player designed around the band\'s rolling single release series, giving fans a purpose-built listening experience rather than a generic streaming embed.',
    url: 'https://harbats.com/',
    highlights: ['Custom Astro media player built specifically for the band\'s release format', 'Chronological single release tracker displaying the full discography rollout', 'Streaming platform integration linking to YouTube Music and Deezer as secondary touchpoints']
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
    highlights: ['Membership and subscription system with monthly and yearly pricing tiers', 'Online studio with on-demand class access via MindBody integration', '21-day challenge sign-up and members portal', 'Event and workshop pages for live and retreats']
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
    highlights: ['Course pages for SAT, ACT, and AP online programs', 'Separate sections for online tutoring and college consulting services', 'Student results and reviews pages with verified admissions outcomes']
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
    highlights: ['Full-screen slider-driven layout with sectioned storytelling', 'Press releases section with featured coverage', 'Careers portal with active job listings', 'Bilingual-ready contact and inquiry system']
  }
];
