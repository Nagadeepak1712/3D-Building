import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function PrivateAccessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse position for spotlight
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        height: '100vh', 
        position: 'relative', 
        backgroundColor: 'var(--background)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'none'
      }}
    >
      {/* Background that gets revealed */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/private-mansion.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, black, transparent 80%)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, black, transparent 80%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          zIndex: 1
        }}
      />

      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        pointerEvents: 'none'
      }}>
        <h2 style={{
          fontSize: '4rem',
          color: '#000000',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '1rem'
        }}>
          Private Access
        </h2>
        <p style={{
          color: '#000000',
          fontSize: '1.2rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Explore the unseen. An exclusive portfolio of ultra-luxury estates available strictly off-market.
        </p>
      </div>
      
      {/* Custom Cursor Ring */}
      <motion.div
        style={{
          position: 'absolute',
          left: springX,
          top: springY,
          width: '40px',
          height: '40px',
          border: '1px solid var(--champagne)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          opacity: isHovered ? 0.5 : 0,
          zIndex: 3
        }}
      />
    </section>
  );
}

// Helper to use template strings with MotionValues
import { useMotionTemplate } from 'framer-motion';
