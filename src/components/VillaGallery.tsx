import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const villas = [
  '/images/villas/villa_1.png',
  '/images/villas/villa_2.png',
  '/images/villas/villa_3.png',
  '/images/villas/villa_4.png',
  '/images/villas/villa_5.png',
  '/images/villas/villa_6.png',
  '/images/villas/villa_7.png',
  '/images/villas/villa_8.png',
  '/images/villas/villa_9.png',
  '/images/villas/villa_10.png',
];

export default function VillaGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={targetRef} style={{ height: "400vh", position: "relative", backgroundColor: "var(--background)" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
        
        <div style={{ padding: "0 4rem", marginBottom: "4rem" }}>
          <h2 style={{ fontSize: '3rem', color: 'var(--ink)' }}>3D VILLA COLLECTION</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Scroll to explore</p>
        </div>

        <motion.div style={{ x, display: "flex", gap: "4rem", padding: "0 4rem", width: "max-content" }}>
          {villas.map((src, index) => (
             <div key={index} style={{ 
               width: "60vw", 
               height: "60vh", 
               flexShrink: 0, 
               overflow: "hidden", 
               borderRadius: "2px", 
               boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
               border: "1px solid var(--glass-border)"
             }}>
               <img src={src} alt={`3D Villa ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
             </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
