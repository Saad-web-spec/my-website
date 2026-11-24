import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { PROJECTS, SITE, SOCIALS } from './data/content';
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  FacebookIcon,
  HuggingFaceIcon,
  LinkedInIcon,
  XIcon,
} from './components/Icons';

const SOCIAL_ICONS = {
  LinkedIn: LinkedInIcon,
  X: XIcon,
  Facebook: FacebookIcon,
  HuggingFace: HuggingFaceIcon,
};

const external = { target: '_blank', rel: 'noopener noreferrer' };

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable: the address is still on the page to select.
    }
  };

  return (
    <button type="button" className="copy" onClick={copy}>
      {copied ? <CheckIcon className="icon" /> : <CopyIcon className="icon" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}

function App() {
  return (
    <>
      <header className="top wrap">
        <a href="#top" className="brand">
          {SITE.name}
        </a>
        <nav className="top-nav" aria-label="Main navigation">
          <a href="#projects">Projects</a>
          <a href="#contact" className="top-link">
            Contact
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero wrap" aria-label="Introduction">
          <div className="profile">
            <a href="#contact" className="card-link" aria-label="Say hello: go to the contact section">
              <div className="card">
                <img
                  src="/saad.webp"
                  srcSet="/saad-800.webp 800w, /saad.webp 1600w"
                  sizes="(max-width: 900px) 92vw, 720px"
                  width="1600"
                  height="1200"
                  alt="Ink drawing of Muhammad Saad in a polo shirt."
                  fetchPriority="high"
                />
              </div>
              <span className="bubble" aria-hidden="true">
                <span className="bubble-text bubble-hi">
                  Hello! <span className="wave">👋</span>
                </span>
                <span className="bubble-text bubble-go">Say hello →</span>
              </span>
            </a>

            <div className="profile-foot">
              <ul className="socials" aria-label="Social links">
                {SOCIALS.map(({ label, icon, href }) => {
                  const Icon = SOCIAL_ICONS[icon];
                  return (
                    <li key={label}>
                      <a href={href} aria-label={label} title={label} {...external}>
                        <Icon className="icon" />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <p className="who">
                <span className="who-name">{SITE.name}</span>
                <span className="who-role">{SITE.role}</span>
              </p>
            </div>
          </div>

          <div className="hello">
            <h1>
              Hi, I’m Saad.
            </h1>
            <p>{SITE.intro}</p>
          </div>
        </section>

        <section className="work wrap reveal" id="projects" aria-labelledby="projects-title">
          <h2 className="eyebrow" id="projects-title">
            Projects
          </h2>
          <ul className="work-list">
            {PROJECTS.map((p, i) => (
              <li key={p.title}>
                <a href={p.href} {...external}>
                  <span className="work-no">{String(i + 1).padStart(2, '0')}</span>
                  <span className="work-name">{p.title}</span>
                  <span className="work-desc">{p.desc}</span>
                  <span className="work-go" aria-hidden="true">
                    <ArrowUpRightIcon className="icon" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="contact wrap reveal" id="contact" aria-labelledby="contact-title">
          <h2 className="eyebrow" id="contact-title">
            Contact
          </h2>
          <p className="contact-big">
            Say hello.
          </p>
          <div className="email-row">
            <a href={`mailto:${SITE.email}`} className="email">
              {SITE.email}
            </a>
            <CopyEmail />
          </div>
          <p className="contact-alt">
            or message me on{' '}
            <a href={SITE.whatsapp} {...external}>
              WhatsApp
            </a>
          </p>
        </section>
      </main>

      <footer className="foot wrap">
        <div className="foot-row">
          <p>© 2026 {SITE.name}</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>

      {/* Vercel Web Analytics: page views only */}
      <Analytics />
    </>
  );
}

export default App;
