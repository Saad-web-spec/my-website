import React from 'react';
import { Typewriter } from '../ui/Typewriter';
import { TiltCard } from '../ui/TiltCard';

export const Hero = ({ handleNavClick }) => {
  const heroHighlights = [
    'AI + Chemical Engineering Projects',
    'Growing Student Communities',
    'Weekly Learning Content',
  ];

  return (
    <section className="hero" id="hero">
      <div className="container hero-container">
        
        {/* ─── DESKTOP LAYOUT (Hidden on mobile) ─── */}
        <div className="hero-desktop-view">
          <div className="hero-content">
            <h2 className="greeting hero-load">Hi, I'm</h2>
            <h1 className="hero-load hero-load-delay-1">
              <span className="gradient-text">M.Saad</span>
            </h1>

            <div className="roles-container hero-load hero-load-delay-2">
              <span className="static-role">I am a </span>
              <Typewriter
                words={[
                  'Chemical Engineering Student.',
                  'AI Builder.',
                  'Space-Tech Enthusiast.',
                  'Community Builder.',
                ]}
              />
            </div>

            <p className="hero-description hero-load hero-load-delay-3">
              I build practical AI experiences for engineering learners and share open, community-first resources.
              Follow my projects, join the learning network, and explore the future of Chemical Engineering × AI.
            </p>

            <div className="hero-highlights hero-load hero-load-delay-3">
              {heroHighlights.map((highlight) => (
                <span key={highlight} className="hero-highlight-chip">{highlight}</span>
              ))}
            </div>

            <div className="cta-group hero-load hero-load-delay-4">
              <a
                href="#communities"
                className="btn-primary"
                onClick={(e) => handleNavClick(e, '#communities')}
              >
                Explore Communities
              </a>
              <a
                href="#about"
                className="btn-secondary"
                onClick={(e) => handleNavClick(e, '#about')}
              >
                Learn More
              </a>
              <a
                href="https://github.com/Saad-web-spec/my-website"
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Star on GitHub
              </a>
            </div>
          </div>

          <div className="hero-right-col hero-load hero-load-delay-3">
            <div className="hero-image-wrapper">
              <TiltCard 
                className="avatar-parallax-card" 
                maxRotation={15} 
                scale={1.04} 
                style={{ 
                  borderRadius: '50%', 
                  padding: '0', 
                  background: 'none', 
                  border: 'none', 
                  boxShadow: 'none',
                  overflow: 'visible'
                }}
              >
                {/* Back Layer: Cosmic Space Depth Plate */}
                <div className="parallax-layer parallax-layer-back" />

                {/* Middle Layer: Glowing Dashed Orbit Telemetry */}
                <div className="parallax-layer parallax-layer-middle" />

                {/* Front Layer: Profile Image Border & Picture */}
                <div className="parallax-layer parallax-layer-front">
                  <div className="hero-image-border" style={{ margin: 0 }}>
                    <img
                      src="/Profile.jpeg"
                      alt="M.Saad (Saad Engineer / Engineer Saad) - Chemical Engineering Student, AI Explorer & Space Enthusiast"
                      className="hero-image"
                      width="380"
                      height="380"
                      fetchPriority="high"
                    />
                  </div>

                  {/* Floating micro-badge (#Starboy) */}
                  <div className="profile-micro-badge float-slow">
                    <span>#Starboy</span>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>

        {/* ─── MOBILE LAYOUT (Hidden on desktop) ─── */}
        <div className="hero-mobile-view">
          <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', maxWidth: '850px', margin: '0 auto' }}>
            
            <div className="hero-header-row hero-load" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <TiltCard 
                className="inline-avatar-card" 
                maxRotation={15} 
                scale={1.04} 
                onTouchStart={() => {}}
                style={{ 
                  borderRadius: '50%', 
                  padding: '0', 
                  background: 'none', 
                  border: 'none', 
                  boxShadow: 'none',
                  overflow: 'visible',
                  width: '180px',
                  height: '180px',
                  flexShrink: 0
                }}
              >
                <div className="parallax-layer parallax-layer-back" />
                <div className="parallax-layer parallax-layer-middle" />
                <div className="parallax-layer parallax-layer-front">
                  <div className="hero-image-border" style={{ margin: 0, width: '100%', height: '100%', position: 'relative' }}>
                    <img
                      src="/Profile.jpeg"
                      alt="M.Saad"
                      className="hero-image"
                      width="180"
                      height="180"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                    <div className="profile-micro-badge float-slow" style={{ top: 'auto', bottom: '-5px', right: '-5px', padding: '0.35rem 0.8rem', transform: 'translateZ(45px) scale(0.8)' }}>
                      <span style={{ fontSize: '0.72rem' }}>#Starboy</span>
                    </div>
                  </div>
                </div>
              </TiltCard>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap', textAlign: 'left' }}>
                <h2 className="greeting" style={{ margin: 0, lineHeight: '1.2' }}>Hi, I'm</h2>
                <h1 className="hero-load-delay-1" style={{ margin: 0, lineHeight: '1.2' }}>
                  <span className="gradient-text">M.Saad</span>
                </h1>
              </div>
            </div>

            <div className="roles-container hero-load hero-load-delay-2" style={{ justifyContent: 'center' }}>
              <span className="static-role">I am a </span>
              <Typewriter
                words={[
                  'Chemical Engineering Student.',
                  'AI Builder.',
                  'Space-Tech Enthusiast.',
                  'Community Builder.',
                ]}
              />
            </div>

            <p className="hero-description hero-load hero-load-delay-3" style={{ margin: '0 auto 2.5rem' }}>
              I build practical AI experiences for engineering learners and share open, community-first resources.
              Follow my projects, join the learning network, and explore the future of Chemical Engineering × AI.
            </p>

            <div className="hero-highlights hero-load hero-load-delay-3">
              {heroHighlights.map((highlight) => (
                <span key={highlight} className="hero-highlight-chip">{highlight}</span>
              ))}
            </div>

            <div className="cta-group hero-load hero-load-delay-4" style={{ justifyContent: 'center' }}>
              <a
                href="#communities"
                className="btn-primary"
                onClick={(e) => handleNavClick(e, '#communities')}
              >
                Explore Communities
              </a>
              <a
                href="#about"
                className="btn-secondary"
                onClick={(e) => handleNavClick(e, '#about')}
              >
                Learn More
              </a>
              <a
                href="https://github.com/Saad-web-spec/my-website"
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Star on GitHub
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
export default Hero;
