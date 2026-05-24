import React from 'react';
import { PROJECTS } from '../../data/constants';
import { IconMap } from '../Icons';
import { TiltCard } from '../ui/TiltCard';

export const Projects = () => {
  return (
    <section className="section" id="projects">
      <div className="container">
        <h2 className="section-title reveal" data-aos="fade-up">Projects</h2>
        <p className="section-subtitle reveal" data-aos="fade-up">Building the future of AI-powered engineering and processes</p>
        <div className="section-divider reveal" data-aos="fade-up" />

        <div className="projects-grid projects-grid--single">
          {PROJECTS.map((project, idx) => {
            const Icon = IconMap[project.icon] || (() => null);
            return (
              <TiltCard
                key={project.title}
                className={`project-tilt-card ${project.glowClass}`}
                maxRotation={12}
                scale={1.02}
                data-aos="fade-up"
                data-aos-delay={idx * 150}
                style={{ overflow: 'visible', background: 'none', border: 'none', boxShadow: 'none' }}
              >
                {/* 3D Depth Card Layers */}
                <div className="card-3d-wrapper">
                  {/* Layer 1: Cosmic Background Glow */}
                  <div className="card-3d-layer card-3d-layer-back" />

                  {/* Layer 2: Glowing Telemetry Dashed Orbit */}
                  <div className="card-3d-layer card-3d-layer-middle" />

                  {/* Layer 3: Main Front Text & Button Content */}
                  <div className="card-3d-layer card-3d-layer-front">
                    <div className="badge-icon-wrapper">
                      <Icon />
                    </div>
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


                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Projects;
