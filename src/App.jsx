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

const ARROW_FLOURISH_MS = 420;

// On touch screens there is no hover, so a tapped project plays a short
// arrow animation first, then opens. Desktop clicks, modified clicks
// (new tab, etc.) and reduced-motion visitors open straight away.
function openProject(event) {
  const touch = window.matchMedia('(hover: none)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!touch || reduced || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }
  event.preventDefault();
  const link = event.currentTarget;
  link.classList.remove('is-going');
  void link.offsetWidth; // restart the animation if tapped twice quickly
  link.classList.add('is-going');
  setTimeout(() => {
    const tab = window.open(link.href, '_blank');
    if (tab) tab.opener = null;
    else window.location.href = link.href; // pop-up blocked: open in place
  }, ARROW_FLOURISH_MS);
  setTimeout(() => link.classList.remove('is-going'), ARROW_FLOURISH_MS + 600);
}

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
                <span className="photo">
                  <img
                    src="/saad.webp"
                    srcSet="/saad-800.webp 800w, /saad.webp 1600w"
                    sizes="(max-width: 900px) 92vw, 720px"
                    width="1600"
                    height="1200"
                    alt="Ink drawing of Muhammad Saad in a polo shirt."
                    fetchPriority="high"
                  />
                </span>
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

        <section className="work wrap reveal" aria-labelledby="projects-title">
          <div id="projects" className="anchor">
            <h2 className="eyebrow" id="projects-title">
              Projects
            </h2>
            <ul className="work-list">
              {PROJECTS.map((p, i) => (
                <li key={p.title}>
                  <a href={p.href} {...external} onClick={openProject}>
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
          </div>
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
