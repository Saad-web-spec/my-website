import { useRef, useEffect } from 'react';

export const use3DTilt = (maxRotation = 10, scale = 1.02) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      const width = rect.width;
      const height = rect.height;
      const centerX = rect.left + width / 2;
      const centerY = rect.top + height / 2;

      const offsetX = clientX - centerX;
      const offsetY = clientY - centerY;

      const normX = offsetX / (width / 2);
      const normY = offsetY / (height / 2);

      const rotateX = -(normY * maxRotation);
      const rotateY = normX * maxRotation;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;

      const glare = card.querySelector('.card-glare');
      if (glare) {
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;
        glare.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.15) 0%, transparent 80%)`;
        glare.style.opacity = '1';
      }
    };

    const handleMouseEnter = () => {
      card.style.transition = 'transform 0.1s ease';
      const glare = card.querySelector('.card-glare');
      if (glare) {
        glare.style.transition = 'opacity 0.1s ease';
      }
    };

    const handleMouseLeave = () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

      const glare = card.querySelector('.card-glare');
      if (glare) {
        glare.style.transition = 'opacity 0.5s ease';
        glare.style.opacity = '0';
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxRotation, scale]);

  return cardRef;
};
