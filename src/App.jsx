import React, { useEffect, useState, useRef, useCallback } from 'react';
import AOS from 'aos';
import './index.css';

/* ═══════════════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════════════ */
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z"/></svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
);

const ArrowUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
);

const HuggingFaceIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.5 5.5a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zM8.5 9.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5S7 11.828 7 11s.672-1.5 1.5-1.5zm7 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5S14 11.828 14 11s.672-1.5 1.5-1.5zM12 17.5c-2.33 0-4.3-1.46-5.11-3.5h10.22c-.81 2.04-2.78 3.5-5.11 3.5z"/></svg>
);

/* ═══════════════════════════════════════════════════
   PROJECT ICON – Beaker / Flask
   ═══════════════════════════════════════════════════ */
const BeakerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6M10 3v6.5L4.5 18.5a1.5 1.5 0 001.3 2.25h12.4a1.5 1.5 0 001.3-2.25L14 9.5V3"/>
    <path d="M8.5 14h7"/>
  </svg>
);

const BrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a5 5 0 015 5c0 1.5-.5 2.5-1.5 3.5L12 14l-3.5-3.5C7.5 9.5 7 8.5 7 7a5 5 0 015-5z"/>
    <path d="M12 14v8"/>
    <path d="M9 18h6"/>
    <circle cx="12" cy="7" r="1.5"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   SEND ICON – For Contact Form
   ═══════════════════════════════════════════════════ */
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   TYPEWRITER COMPONENT
   ═══════════════════════════════════════════════════ */
const Typewriter = ({ words, delay = 80, pause = 2200 }) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(prev => prev.substring(0, prev.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex(prev => (prev + 1) % words.length);
        }
      }, delay / 2);
    } else {
      timer = setTimeout(() => {
        setText(prev => currentWord.substring(0, prev.length + 1));
        if (text === currentWord) {
          timer = setTimeout(() => setIsDeleting(true), pause);
        }
      }, delay);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, delay, pause]);

  return <span className="typewriter-text">{text}<span className="cursor">|</span></span>;
};

/* ═══════════════════════════════════════════════════
   PARTICLES BACKGROUND
   ═══════════════════════════════════════════════════ */
const ParticlesBg = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${12 + Math.random() * 20}s`,
    animationDelay: `${Math.random() * 15}s`,
    size: `${1 + Math.random() * 2}px`,
  }));

  return (
    <div className="particles-bg">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   STAR FIELD (for Space Section)
   ═══════════════════════════════════════════════════ */
const StarField = () => {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${1 + Math.random() * 2}px`,
    animationDuration: `${2 + Math.random() * 4}s`,
    animationDelay: `${Math.random() * 3}s`,
  }));

  return (
    <div className="star-field">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDuration: s.animationDuration,
            animationDelay: s.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   INTERSECTION OBSERVER HOOK
   ═══════════════════════════════════════════════════ */
const useRevealOnScroll = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */
const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: 'https://blog.saadengineer.works' },
  { label: 'Space', href: '#space' },
  { label: 'Communities', href: '#communities' },
  { label: 'Socials', href: '#socials' },
  { label: 'Contact', href: '#contact' },
];

const COMMUNITY_GROUPS = [
  {
    href: 'https://chat.whatsapp.com/FdnHn7jIZyZBQ2Yy8TFouI?mode=gi_t',
    icon: <WhatsAppIcon />,
    title: 'Engineering Community',
    desc: 'A WhatsApp group for chemical engineering students and professionals to share resources, discuss ideas, and grow together.',
    linkText: 'Join WhatsApp Group →',
    glowClass: 'wa-glow',
  },
  {
    href: 'https://whatsapp.com/channel/0029Vb6Oa7eJkK7DfyFc7E3Z',
    icon: <WhatsAppIcon />,
    title: 'Towards The Cosmos',
    desc: 'Explore a world where chemical engineering meets interstellar ambition — space updates, propulsion, and extraterrestrial habitats.',
    linkText: 'Explore the Cosmos →',
    glowClass: 'wa-glow',
  }
];

const SOCIAL_LINKS = [
  {
    href: 'https://www.facebook.com/share/189N5ahB5J/',
    icon: <FacebookIcon />,
    title: 'Facebook Page',
    desc: 'Follow my page for daily updates, curated resources, engineering memes, and community announcements.',
    linkText: 'Follow Page →',
    glowClass: 'fb-glow',
  },
  {
    href: 'https://x.com/Cheme1569231',
    icon: <XIcon />,
    title: 'X (Twitter)',
    desc: 'Stay updated with my thoughts, engineering threads, space science takes, and the latest industry news.',
    linkText: 'Follow on X →',
    glowClass: 'x-glow',
  },
  {
    href: 'https://www.instagram.com/i_m_arsonist?igsh=OGdiOW11a3J5bGlq',
    icon: <InstagramIcon />,
    title: 'Instagram',
    desc: 'Behind the scenes, personal journey, creative inspirations, and snapshots from my engineering and space adventure.',
    linkText: 'Follow on Instagram →',
    glowClass: 'ig-glow',
  },
];

/* Project cards data — single Hugging Face profile link */
const PROJECTS = [
  {
    icon: <HuggingFaceIcon />,
    title: 'Hugging Face Profile',
    desc: 'Explore my fine-tuned AI models, curated datasets, and spaces on Hugging Face — bridging chemical engineering with modern AI.',
    link: 'https://huggingface.co/ali12345672344',
    glowClass: 'project-hf-glow',
  },
];

/* ═══════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════ */
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  /* Contact form state */
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success | error

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
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText('maliksaad2443@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    const navbarHeight = 60;
    const top = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  /* ─── Contact form handlers ─── */
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xpqnlwra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 4000);
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  return (
    <div className="app-container">
      {/* Background Effects */}
      <ParticlesBg />
      <div className="ambient-mesh" />

      {/* ─── Navbar ─── */}
      <nav role="navigation" aria-label="Main navigation" className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#hero" className="nav-logo" onClick={e => handleNavClick(e, '#hero')}>
            <img src="/logo.svg" alt="SAAD" />
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map(link => {
              const isExternal = /^https?:\/\//.test(link.href);
              return (
                <li key={link.href}>
                  {isExternal ? (
                    <a className="nav-link" href={link.href} rel="noopener" >
                      {link.label}
                    </a>
                  ) : (
                    <a className="nav-link" href={link.href} onClick={e => handleNavClick(e, link.href)}>
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
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-overlay${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(false)} />
        <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
          {NAV_LINKS.map(link => {
            const isExternal = /^https?:\/\//.test(link.href);
            return isExternal ? (
              <a key={link.href} className="mobile-nav-link" href={link.href} rel="noopener" onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            ) : (
              <a key={link.href} className="mobile-nav-link" href={link.href} onClick={e => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            );
          })}
        </div>
      </nav>

      {/* ─── Main Content ─── */}
      <main id="main-content">

      {/* ─── Hero Section ─── */}
      <section className="hero" id="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h2 className="greeting hero-load">Hi, I'm</h2>
            <h1 className="hero-load hero-load-delay-1"><span className="gradient-text">M.Saad</span></h1>

            <div className="roles-container hero-load hero-load-delay-2">
              <span className="static-role">I am a </span>
              <Typewriter words={[
                'Chemical Engineering Student.',
                'Engineer Saad.',
                'Saad Engineer.',
                'Space Enthusiast.',
                'Community Builder.',
                'AI Explorer.',
                'AI Model Builder.',
              ]} />
            </div>

            <p className="hero-description hero-load hero-load-delay-3">
              Bridging the worlds of process engineering, space sciences, and artificial intelligence.
              I build communities, share knowledge, and inspire the next generation of engineers.
            </p>

            <div className="cta-group hero-load hero-load-delay-4">
              <a href="#socials" className="btn-primary" onClick={e => handleNavClick(e, '#socials')}>
                Explore Communities
              </a>
              <a href="#about" className="btn-secondary" onClick={e => handleNavClick(e, '#about')}>
                Learn More
              </a>
            </div>
          </div>

          <div className="hero-image-wrapper hero-load hero-load-delay-3">
            <div className="breathing-glow" />
            <div className="hero-image-border">
              <img src="/Profile.jpeg" alt="M.Saad (Saad Engineer / Engineer Saad) - Chemical Engineer & AI Researcher" className="hero-image" width="340" height="340" fetchpriority="high" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <section className="section" id="about">
        <div className="container">
          <h2 className="section-title reveal" data-aos="fade-up">About Me</h2>
          <p className="section-subtitle reveal" data-aos="fade-up">The story behind the vision</p>
          <div className="section-divider reveal" data-aos="fade-up" />

          <div className="about-content reveal-left">
            <p>
              I'm Muhammad Saad (known in the community as <span className="about-highlight">Engineer Saad</span> or <span className="about-highlight">Saad Engineer</span>), a passionate <span className="about-highlight">B.Sc Chemical Engineering</span> student
              with a singular purpose: to <span className="about-highlight">integrate Artificial Intelligence
              with Chemical Engineering</span>. I believe AI will revolutionize how we design processes,
              optimize reactions, and solve the most complex industrial challenges of our time.
            </p>
            <p>
              As a current chemical engineering student, I'm not just learning — I'm building.
              I've fine-tuned and deployed <span className="about-highlight">3 custom AI models</span> on
              Hugging Face, trained specifically on chemical engineering data. From automated Q&A systems
              to domain-specific language models, I'm proving that AI and ChemE belong together.
            </p>
            <p>
              Beyond my technical work, I'm deeply passionate about <span className="about-highlight">Space
              Sciences</span> and community building. Through my platforms, I connect students,
              researchers, and professionals who share knowledge, challenge conventional thinking,
              and push the boundaries of what's possible in engineering and beyond.
            </p>
          </div>
        </div>
      </section>



      {/* ─── Space Section ─── */}
      <section className="space-section" id="space" aria-labelledby="space-heading">
        <StarField />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="space-card" data-aos="fade-up">
            <div className="space-icon" aria-hidden="true">🚀</div>
            <h2 id="space-heading">Towards The Cosmos</h2>
            <p>
              Space science captivates me as much as chemical engineering. From propulsion chemistry
              to life support systems and extraterrestrial habitats — the intersection of ChemE and
              space exploration is where I believe humanity's future lies.
            </p>
            <a
              href="https://whatsapp.com/channel/0029Vb6Oa7eJkK7DfyFc7E3Z"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Explore the Cosmos →
            </a>
          </div>
        </div>
      </section>

      {/* ─── Projects Section ─── */}
      <section className="section" id="projects">
        <div className="container">
          <h2 className="section-title reveal" data-aos="fade-up">Projects</h2>
          <p className="section-subtitle reveal" data-aos="fade-up">Building the future of AI-powered engineering</p>
          <div className="section-divider reveal" data-aos="fade-up" />

          <div className="projects-grid projects-grid--single">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.title}
                className={`project-card ${project.glowClass}`}
                data-aos="fade-up"
                data-aos-delay={idx * 150}
              >
                <div className="project-icon project-icon--hf">{project.icon}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn"
                >
                  View Profile →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Communities Section ─── */}
      <section className="section" id="communities">
        <div className="container">
          <h2 className="section-title reveal" data-aos="fade-up">My Communities</h2>
          <p className="section-subtitle reveal" data-aos="fade-up">Join the network and let's grow together</p>
          <div className="section-divider reveal" data-aos="fade-up" />

          <div className="social-grid reveal-stagger">
            {COMMUNITY_GROUPS.map(c => (
              <a
                key={c.title}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-card hover-lift ${c.glowClass}`}
                style={{ maxWidth: '600px', margin: '0 auto', gridColumn: '1 / -1' }}
                data-aos="fade-up"
              >
                <div className="social-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <span className="join-link">{c.linkText}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Socials Section ─── */}
      <section className="section" id="socials">
        <div className="container">
          <h2 className="section-title reveal" data-aos="fade-up">Connect With Me</h2>
          <p className="section-subtitle reveal" data-aos="fade-up">Follow my journey across social platforms</p>
          <div className="section-divider reveal" data-aos="fade-up" />

          <div className="social-grid reveal-stagger">
            {SOCIAL_LINKS.map((c, idx) => (
              <a
                key={c.title}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-card hover-lift ${c.glowClass}`}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="social-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <span className="join-link">{c.linkText}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact Section (with Form) ─── */}
      <section className="section" id="contact">
        <div className="container">
          <h2 className="section-title reveal" data-aos="fade-up">Get In Touch</h2>
          <p className="section-subtitle reveal" data-aos="fade-up">Have a question, idea, or just want to say hello?</p>
          <div className="section-divider reveal" data-aos="fade-up" />

          <div className="contact-wrapper">
            {/* Contact Form */}
            <div className="contact-form-card reveal" data-aos="fade-up">
              <h3 className="contact-form-heading">Send Me a Message</h3>
              <form
                className="contact-form"
                onSubmit={handleFormSubmit}
                noValidate
              >
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    className={`form-input${formErrors.name ? ' form-input-error' : ''}`}
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                  {formErrors.name && <span className="form-error">{formErrors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    className={`form-input${formErrors.email ? ' form-input-error' : ''}`}
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                  {formErrors.email && <span className="form-error">{formErrors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className={`form-input form-textarea${formErrors.message ? ' form-input-error' : ''}`}
                    placeholder="Write your message..."
                    rows="5"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                  />
                  {formErrors.message && <span className="form-error">{formErrors.message}</span>}
                </div>

                <button
                  type="submit"
                  className="btn-primary contact-submit-btn"
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? (
                    <>Sending...</>
                  ) : formStatus === 'success' ? (
                    <><CheckIcon /> Message Sent!</>
                  ) : (
                    <><SendIcon /> Send Message</>
                  )}
                </button>

                {formStatus === 'error' && (
                  <p className="form-status-error">Something went wrong. Please try again or email me at maliksaad2443@gmail.com.</p>
                )}
                {formStatus === 'success' && (
                  <p className="form-status-success">Thanks! I'll get back to you soon.</p>
                )}
              </form>
            </div>

            {/* Existing contact info card */}
            <div className="contact-card reveal" data-aos="fade-up" data-aos-delay="150">
              <div className="contact-label">Email</div>
              <div className="email-row">
                <span className="email-address">maliksaad2443@gmail.com</span>
                <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={handleCopy}>
                  {copied ? <><CheckIcon /> Copied!</> : <><CopyIcon /> Copy</>}
                </button>
              </div>

              <div className="contact-divider" />
              <div className="contact-socials-label">Find me on</div>
              <div className="contact-socials contact-socials--horizontal">
                <a href="https://wa.me/message/SEUXWPS46POGF1?src=qr" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="WhatsApp">
                  <WhatsAppIcon />
                </a>
                <a href="https://www.facebook.com/share/189N5ahB5J/" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="https://x.com/Cheme1569231" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="X">
                  <XIcon />
                </a>
                <a href="https://www.instagram.com/i_m_arsonist?igsh=OGdiOW11a3J5bGlq" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="Instagram">
                  <InstagramIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>

      {/* ─── Footer ─── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand-section">
              <a href="#hero" className="footer-logo" onClick={e => handleNavClick(e, '#hero')}>
                <img src="/logo.svg" alt="SAAD" />
              </a>
            </div>

            <div className="footer-nav">
              {NAV_LINKS.slice(1).map(link => (
                <a key={link.href} href={link.href} onClick={e => handleNavClick(e, link.href)}>
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
    </div>
  );
}

export default App;
