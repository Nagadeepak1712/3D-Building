import React, { useMemo } from 'react';
import Hyperspeed from './Hyperspeed';

const Footer: React.FC = () => {
  const hyperspeedOptions = useMemo(() => ({
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: "turbulentDistortion",
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [20, 60],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.2, 0.2],
    carFloorSeparation: [0.05, 1],
    colors: {
      roadColor: 526344,
      islandColor: 657930,
      background: 0,
      shoulderLines: 1250072,
      brokenLines: 1250072,
      leftCars: [14441248, 14459680, 14426144],
      rightCars: [3361783, 15066861, 12568307],
      sticks: 12970219,
    }
  }), []);

  return (
    <footer style={{ position: 'relative', width: '100%', minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      <Hyperspeed effectOptions={hyperspeedOptions} />
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#000', padding: '2rem' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Enter the Future</h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Discover unmatched performance and design. Join us today.
        </p>
        <button style={{
          marginTop: '2rem',
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          backgroundColor: '#03B3C3',
          color: '#fff',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(3, 179, 195, 0.4)',
          transition: 'transform 0.2s'
        }}>
          Get Started
        </button>
      </div>
      <div style={{ position: 'absolute', bottom: '2rem', zIndex: 10, color: 'rgba(0,0,0,0.6)', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} ZSOS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
