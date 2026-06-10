import { useEffect, useRef, useCallback } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const FRAME_COUNT = 192;
const PRELOAD_WINDOW = 10;

export default function HeroSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const pendingRequests = useRef<Set<number>>(new Set());
  const currentFrameRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const loadImagesAround = useCallback((centerIndex: number, renderCallback?: () => void) => {
    const start = Math.max(0, centerIndex - PRELOAD_WINDOW);
    const end = Math.min(FRAME_COUNT - 1, centerIndex + PRELOAD_WINDOW);

    for (let i = start; i <= end; i++) {
      if (!imageCache.current.has(i) && !pendingRequests.current.has(i)) {
        pendingRequests.current.add(i);
        const img = new Image();
        const frameNum = i.toString().padStart(6, '0');
        img.src = `/images/hero/frame_${frameNum}.png`;
        img.onload = () => {
          imageCache.current.set(i, img);
          pendingRequests.current.delete(i);
          // If the loaded image is the one we're currently waiting for, trigger render
          if (i === currentFrameRef.current && renderCallback) {
            renderCallback();
          }
        };
      }
    }

    // Memory management: evict frames far outside the window
    for (const key of imageCache.current.keys()) {
      if (Math.abs(key - centerIndex) > PRELOAD_WINDOW * 3) {
        imageCache.current.delete(key);
      }
    }
  }, []);

  // Update canvas on scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays but cap at 1.5 for performance
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    
    // Set logical size to window
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    // Set actual size
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const render = (progress: number) => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(progress * FRAME_COUNT)
      );
      
      currentFrameRef.current = frameIndex;
      
      // Load neighbors, and pass render as a callback in case the current frame is missing
      loadImagesAround(frameIndex, () => render(progress));

      const img = imageCache.current.get(frameIndex);
      if (!img) return; // Image not loaded yet, skip render frame

      // Draw image covering the canvas (object-fit: cover equivalent)
      const scale = Math.max(window.innerWidth / img.width, window.innerHeight / img.height);
      const x = (window.innerWidth / 2) - (img.width / 2) * scale;
      const y = (window.innerHeight / 2) - (img.height / 2) * scale;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Initial render setup (preload first chunks)
    loadImagesAround(0, () => render(0));

    const unsubscribe = scrollYProgress.on('change', (v) => {
      render(v);
    });

    const handleResize = () => {
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      render(scrollYProgress.get());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollYProgress, loadImagesAround]);

  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <div ref={containerRef} style={{ height: '400vh', position: 'relative' }}>
      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          opacity
        }}
      >
        <canvas ref={canvasRef} />

        {/* Overlay Content */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(to bottom, rgba(23,19,15,0.0) 0%, rgba(23,19,15,0.3) 100%)',
          pointerEvents: 'none'
        }}>
          <img src="/icons/logo-zsos.svg" alt="ZSOS" style={{ width: '300px', marginBottom: '2rem' }} />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{ color: 'var(--text-main)', fontSize: '1.2rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}
          >
            The ZSOS Be The Future
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
