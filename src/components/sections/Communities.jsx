import React from 'react';
import { COMMUNITY_GROUPS, SOCIAL_LINKS } from '../../data/constants';
import { IconMap } from '../iconMap';
import { TiltCard } from '../ui/TiltCard';

export const Communities = () => {
  const WhatsAppIcon = IconMap['WhatsApp'];

  return (
    <>
      {/* ─── Communities Section ─── */}
      <section className="section" id="communities">
        <div className="container">
          <h2 className="section-title reveal" data-aos="fade-up">My Communities</h2>
          <p className="section-subtitle reveal" data-aos="fade-up">Join the network, ask questions, and let's grow together</p>
          <div className="section-divider reveal" data-aos="fade-up" />

          <div className="social-grid reveal-stagger">
            {COMMUNITY_GROUPS.map((c) => {
              const Icon = IconMap[c.icon] || (() => null);
              return (
                <a
                  key={c.title}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card-anchor"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  style={{ maxWidth: '400px', margin: '0 auto', gridColumn: '1 / -1', display: 'block', width: '100%', minHeight: '440px' }}
                  data-aos="fade-up"
                >
                  <TiltCard
                    className={`community-tilt-card ${c.glowClass}`}
                    maxRotation={10}
                    scale={1.01}
                    style={{ overflow: 'visible', background: 'none', border: 'none', boxShadow: 'none', height: '100%' }}
                  >
                    {/* 3D Depth Card Layers */}
                    <div className="card-3d-wrapper" style={{ height: '100%' }}>
                      {/* Layer 1: Green Background Glow */}
                      <div className="card-3d-layer card-3d-layer-back" />

                      {/* Layer 2: Spinning Telemetry Orbit */}
                      <div className="card-3d-layer card-3d-layer-middle" />

                      {/* Layer 3: Main Text & Button Content */}
                      <div className="card-3d-layer card-3d-layer-front" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '100%' }}>
                        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                          <Icon style={{ width: '3.5rem', height: '3.5rem', color: '#25D366' }} />
                        </div>
                        <h3>{c.title}</h3>
                        <p style={{ margin: '0.5rem 0' }}>{c.desc}</p>
                        <span className="btn-primary wa-glow" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
                          {c.linkText}
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Space Section (Towards The Cosmos Big Card) ─── */}
      <section className="space-section" id="space" aria-labelledby="space-heading" style={{ marginTop: '0', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <TiltCard
            className="space-card wa-glow"
            maxRotation={8}
            scale={1.01}
            style={{ margin: '0 auto', maxWidth: '400px', padding: '0', overflow: 'visible', background: 'none', border: 'none', boxShadow: 'none', minHeight: '440px', width: '100%' }}
            data-aos="fade-up"
          >
            {/* 3D Depth Card Layers */}
            <div className="card-3d-wrapper" style={{ height: '100%' }}>
              {/* Layer 1: Cosmic Nebula Backdrop */}
              <div className="card-3d-layer card-3d-layer-back" />

              {/* Layer 2: Glowing Telemetry Ring */}
              <div className="card-3d-layer card-3d-layer-middle" />

              {/* Layer 3: Main Text & CTA */}
              <div className="card-3d-layer card-3d-layer-front" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '100%' }}>
                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  <WhatsAppIcon style={{ width: '3.5rem', height: '3.5rem', color: '#25D366' }} />
                </div>
                <h2 id="space-heading" style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: '700', letterSpacing: '-0.5px' }}>
                  Towards The Cosmos
                </h2>
                <p style={{ fontSize: '1rem', lineHeight: '1.5', margin: '0.5rem 0', color: 'var(--text-secondary)', fontWeight: '300' }}>
                  Space science captivates me as much as chemical engineering. From rocket propulsion chemistry 
                  to closed-loop life support systems and planetary habitats — the intersection of chemical engineering 
                  and space exploration is where humanity's future lies. Join our channel to stay updated.
                </p>
                <a
                  href="https://whatsapp.com/channel/0029Vb6Oa7eJkK7DfyFc7E3Z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary wa-glow"
                  style={{ fontSize: '0.95rem', padding: '0.8rem 1.8rem', marginTop: '1.5rem', display: 'inline-block' }}
                >
                  Join WhatsApp Channel →
                </a>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* ─── Socials Section ─── */}
      <section className="section" id="socials">
        <div className="container">
          <h2 className="section-title reveal" data-aos="fade-up">Connect With Me</h2>
          <p className="section-subtitle reveal" data-aos="fade-up">Follow my engineering and AI explorer journey across platforms</p>
          <div className="section-divider reveal" data-aos="fade-up" />

          <div className="social-grid reveal-stagger">
            {SOCIAL_LINKS.map((c, idx) => {
              const Icon = IconMap[c.icon] || (() => null);
              return (
                <a
                  key={c.title}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card-anchor"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <TiltCard
                    className={`social-card-tilt ${c.glowClass}`}
                    maxRotation={12}
                    scale={1.02}
                    style={{ height: '100%', overflow: 'visible', background: 'none', border: 'none', boxShadow: 'none' }}
                  >
                    {/* 3D Depth Card Layers */}
                    <div className="card-3d-wrapper" style={{ height: '100%' }}>
                      {/* Layer 1: Brand-Specific Nebula Glow */}
                      <div className="card-3d-layer card-3d-layer-back" />

                      {/* Layer 2: Telemetry Orbits */}
                      <div className="card-3d-layer card-3d-layer-middle" />

                      {/* Layer 3: Main Front Text Details */}
                      <div className="card-3d-layer card-3d-layer-front" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div className="badge-icon-wrapper">
                          <Icon />
                        </div>
                        <h3>{c.title}</h3>
                        <p style={{ flexGrow: 1 }}>{c.desc}</p>
                        <span className="join-link" style={{ marginTop: '1rem', display: 'inline-block' }}>
                          {c.linkText}
                        </span>
                      </div>


                    </div>
                  </TiltCard>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
export default Communities;
