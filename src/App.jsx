import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import { Analytics } from '@vercel/analytics/react';
import './index.css';

// Import constants
import { NAV_LINKS } from './data/constants';

// Import icons
import { IconMap } from './components/Icons';

// Import UI elements
import { Starfield } from './components/ui/Starfield';

// Import Section Components
import { Hero } from './components/sections/Hero';
import { AboutTimeline } from './components/sections/AboutTimeline';
import { Projects } from './components/sections/Projects';
import { Communities } from './components/sections/Communities';
import { Contact } from './components/sections/Contact';

// Scroll reveal effect hook
const useRevealOnScroll = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const ArrowUpIcon = IconMap['ArrowUp'];

  // Scroll-triggered reveals
  useRevealOnScroll();

  // Initialize AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop - 45; // Subtracted 45px (instead of 75px) to align section titles snuggly below the fixed navbar without awkward empty gaps
    
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  return (
    <div className="app-container">
      {/* High-Performance Canvas Starfield Background */}
      <Starfield />
      <div className="ambient-mesh" />

      {/* ─── Navbar ─── */}
      <nav role="navigation" aria-label="Main navigation" className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#hero" className="nav-logo" onClick={(e) => handleNavClick(e, '#hero')}>
            <img src="/logo.svg" alt="SAAD" />
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map((link) => {
              const isExternal = /^https?:\/\//.test(link.href);
              return (
                <li key={link.href}>
                  {isExternal ? (
                    <a className="nav-link" href={link.href} rel="noopener noreferrer" target="_blank">
                      {link.label}
                    </a>
                  ) : (
                    <a className="nav-link" href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                      {link.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <button
            className={`hamburger${mobileOpen ? ' active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-overlay${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(false)} />
        <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
          {NAV_LINKS.map((link) => {
            const isExternal = /^https?:\/\//.test(link.href);
            return isExternal ? (
              <a
                key={link.href}
                className="mobile-nav-link"
                href={link.href}
                rel="noopener noreferrer"
                target="_blank"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                className="mobile-nav-link"
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </nav>

      {/* ─── Main Content ─── */}
      <main id="main-content">
        <Hero handleNavClick={handleNavClick} />
        <AboutTimeline />
        <Projects />
        <Communities handleNavClick={handleNavClick} />
        <Contact />
      </main>

      {/* ─── Footer ─── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand-section">
              <a href="#hero" className="footer-logo" onClick={(e) => handleNavClick(e, '#hero')}>
                <img src="/logo.svg" alt="SAAD" />
              </a>
            </div>

            <div className="footer-nav">
              {NAV_LINKS.slice(1).map((link) => (
                <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 M.Saad. Built with passion for the community.</p>
            <button className="back-to-top" onClick={scrollToTop}>
              <ArrowUpIcon /> Back to top
            </button>
          </div>
        </div>
      </footer>

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
