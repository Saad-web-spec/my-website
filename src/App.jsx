import React, { useEffect, useState } from 'react';
import './index.css';

// Typewriter Effect Component
const Typewriter = ({ words, delay = 100, pause = 2000 }) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer;

    if (isDeleting) {
      // Deleting text
      timer = setTimeout(() => {
        setText((prev) => prev.substring(0, prev.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, delay / 2);
    } else {
      // Typing text
      timer = setTimeout(() => {
        setText((prev) => currentWord.substring(0, prev.length + 1));
        if (text === currentWord) {
          timer = setTimeout(() => setIsDeleting(true), pause);
        }
      }, delay);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, delay, pause]);

  return <span className="typewriter-text">{text}<span className="cursor">|</span></span>;
};

function App() {
  return (
    <div className="app-container">
      {/* Background Ambience */}
      <div className="ambient-mesh"></div>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container animate-fade-up">
          <div className="hero-content">
            <h2 className="greeting">Hi, I'm</h2>
            <h1><span className="gradient-text">M.Saad</span></h1>

            <div className="roles-container">
              <span className="static-role">I am a </span>
              <Typewriter words={["Chemical Engineering Student.", "Space Enthusiast."]} />
            </div>

            <p className="hero-description">
              As a student, I am connecting process engineering and space sciences. I believe in growing, innovating, and sharing knowledge together.
            </p>

            <div className="cta-group">
              <a href="#socials" className="btn-primary magnetic-btn">Explore My Communities</a>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <div className="breathing-glow"></div>
            <div className="hero-image-border">
              <img src="/Profile.jpeg" alt="M.Saad" className="hero-image" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section" id="about">
        <div className="container animate-fade-up delay-1">
          <h2 className="section-title">My Journey</h2>
          <div className="glass-card float-animation" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
              I am a passionate B.Sc Chemical Engineering student dedicated to integrating
              AI with process design and Space Sciences. I believe in the power
              of collaboration to solve modern industrial and scientific challenges.
              <br /><br />
              Through my platforms, I aim to create spaces where students, researchers, and industry
              professionals can share knowledge, innovate, and thrive together.
            </p>
          </div>
        </div>
      </section>

      {/* Space-Themed Banner Section */}
      <section className="space-section animate-fade-up delay-2" id="space" style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="glass-card float-animation" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2, background: 'rgba(15, 23, 42, 0.7)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff' }}>Towards The Space</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Process engineering doesn't stop at Earth's atmosphere. Join my specialized WhatsApp channel
              dedicated to Space Sciences, propulsion technologies, and extraterrestrial habitats.
            </p>
            <a href="https://whatsapp.com/channel/0029Vb6Oa7eJkK7DfyFc7E3Z" target="_blank" rel="noopener noreferrer" className="btn-primary magnetic-btn">
              Explore the Cosmos
            </a>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="section" id="socials">
        <div className="container animate-fade-up delay-3">
          <h2 className="section-title">My Communities</h2>
          <div className="social-grid">

            <a href="https://chat.whatsapp.com/FdnHn7jIZyZBQ2Yy8TFouI?mode=gi_t" target="_blank" rel="noopener noreferrer" className="social-card hover-lift wa-glow">
              <div className="social-icon">💬</div>
              <h3>Engineering Group</h3>
              <p>An AI-powered WhatsApp group with fully automated daily posts — delivering process engineering content, academic resources, and industry updates at a fixed time every day.</p>
              <span className="join-link">Join WhatsApp →</span>
            </a>

            <a href="https://www.facebook.com/share/189N5ahB5J/" target="_blank" rel="noopener noreferrer" className="social-card hover-lift fb-glow">
              <div className="social-icon">👥</div>
              <h3>Facebook Page</h3>
              <p>Follow my page for daily updates, resources, and community announcements.</p>
              <span className="join-link">Follow Page →</span>
            </a>

            <a href="https://x.com/Cheme1569231" target="_blank" rel="noopener noreferrer" className="social-card hover-lift x-glow">
              <div className="social-icon">𝕏</div>
              <h3>X (Twitter)</h3>
              <p>Stay updated with my thoughts, threads, and the latest industry news.</p>
              <span className="join-link">Follow on X →</span>
            </a>

          </div>
        </div>
      </section>

      {/* Footer / Join CTA */}
      <footer id="join" className="section" style={{ paddingBottom: '2rem', paddingTop: '4rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff', fontWeight: 800 }}>Ready to get involved?</h2>
          <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Connect with my network today and let's build the future together.</p>

          <div style={{ margin: '3rem auto', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'inline-block', maxWidth: '100%', boxSizing: 'border-box' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '1rem' }}>Or reach out directly via email:</p>
            <div className="email-address" style={{ fontWeight: 'bold', color: 'var(--accent-primary)', userSelect: 'all', wordBreak: 'break-all' }}>
              maliksaad2443@gmail.com
            </div>
          </div>

          <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
            <p>© 2026 M.Saad. Built for the community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
