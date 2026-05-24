import React from 'react';
import { Typewriter } from '../ui/Typewriter';
import { TiltCard } from '../ui/TiltCard';

export const Hero = ({ handleNavClick }) => {
  return (
    <section className="hero" id="hero">
      <div className="container hero-container">
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
                'AI Explorer.',
                'Space Enthusiast.',
                'Community Builder.',
              ]}
            />
          </div>

          <p className="hero-description hero-load hero-load-delay-3">
            A B.Sc Chemical Engineering student exploring the intersection of process systems, 
            artificial intelligence, and space sciences. I focus on building collaborative student communities, 
            sharing curated academic resources, and exploring open-source AI models.
          </p>

          <div className="cta-group hero-load hero-load-delay-4">
            <a
              href="#socials"
              className="btn-primary"
              onClick={(e) => handleNavClick(e, '#socials')}
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
          </div>
        </div>

        <div className="hero-right-col hero-load hero-load-delay-3">
          <div className="hero-image-wrapper">
            {/* Multi-Layered 3D Parallax Stack Container */}
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
    </section>
  );
};
export default Hero;
