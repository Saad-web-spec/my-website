import React from 'react';

const MILESTONES = [
  {
    title: 'B.Sc Chemical Engineering Student',
    subtitle: 'Pursuing Academic Excellence',
    description: "Deepening my knowledge of chemical processes, reaction kinetics, and transport phenomena. Actively working to build a solid theoretical and practical academic foundation in core process systems.",
    date: 'ACADEMICS',
    glowClass: 'timeline-glow-blue'
  },
  {
    title: 'Open-Source AI Modeling',
    subtitle: 'Learning and Fine-Tuning Models',
    description: "Driven by a curiosity for machine learning, fine-tuned and deployed 3 simple, open-source AI models on Hugging Face using chemical engineering datasets to explore automated domain Q&A systems.",
    date: 'AI EXPLORATION',
    glowClass: 'timeline-glow-purple'
  },
  {
    title: 'Cosmic Curiosity & Community Building',
    subtitle: 'Separate Hobbies and Passions',
    description: "Pursuing space sciences and astronomical concepts as an independent curiosity. Separately, dedicating time to building student communities and WhatsApp networks to share academic resources and foster collaboration.",
    date: 'PASSIONS',
    glowClass: 'timeline-glow-cyan'
  }
];

export const AboutTimeline = () => {
  return (
    <section className="section" id="about">
      <div className="container">
        <h2 className="section-title reveal" data-aos="fade-up">About Me</h2>
        <p className="section-subtitle reveal" data-aos="fade-up">The story behind the vision</p>
        <div className="section-divider reveal" data-aos="fade-up" />

        <div className="timeline-wrapper">
          <div className="timeline-center-line"></div>
          
          {MILESTONES.map((m, idx) => {
            const isEven = idx % 2 === 0;
            const alignClass = isEven ? 'timeline-item-left' : 'timeline-item-right';
            
            return (
              <div 
                key={idx} 
                className={`timeline-item ${alignClass} ${m.glowClass}`}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="timeline-node">
                  <div className="timeline-node-inner"></div>
                </div>
                
                <div className="timeline-card glass-card">
                  <span className="timeline-card-date">{m.date}</span>
                  <h3 className="timeline-card-title">{m.title}</h3>
                  <h4 className="timeline-card-subtitle">{m.subtitle}</h4>
                  <p className="timeline-card-desc">{m.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default AboutTimeline;
