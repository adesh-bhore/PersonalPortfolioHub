import React, { useRef, useState } from 'react';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ children, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    const centerX = width / 2;
    const centerY = height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // Invert for natural feel, increased intensity
    const rotateY = ((x - centerX) / centerX) * 12; // Increased intensity

    // Determine transform origin based on which corner is being hovered
    let transformOrigin = 'center';
    if (x < width / 2 && y < height / 2) { // Top-left
      transformOrigin = 'bottom right';
    } else if (x > width / 2 && y < height / 2) { // Top-right
      transformOrigin = 'bottom left';
    } else if (x < width / 2 && y > height / 2) { // Bottom-left
      transformOrigin = 'top right';
    } else { // Bottom-right
      transformOrigin = 'top left';
    }

    setStyle({
      '--rotateX': `${rotateX}deg`,
      '--rotateY': `${rotateY}deg`,
      '--transform-origin': transformOrigin,
    } as React.CSSProperties);
  };

  const handleMouseLeave = () => {
    setStyle({
      '--rotateX': '0deg',
      '--rotateY': '0deg',
      '--transform-origin': 'center',
    } as React.CSSProperties);
  };

  return (
    <div
      className={`floating-card ${className}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      <div 
        className="floating-card-content w-full h-full"
        style={{
          ...style,
          transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)',
          transform: `rotateX(var(--rotateX, 0)) rotateY(var(--rotateY, 0))`,
          transformOrigin: 'var(--transform-origin, center)',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FloatingCard;