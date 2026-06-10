import HeroSequence from './components/HeroSequence';
import PrivateAccessSection from './components/PrivateAccessSection';
import VillaGallery from './components/VillaGallery';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ backgroundColor: 'var(--background)' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '2rem 4rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100
      }}>
        <img src="/icons/logo-zsos.svg" alt="ZSOS Logo" style={{ width: '80px' }} />
      </nav>

      {/* Main Content */}
      <main>
        <HeroSequence />
        <PrivateAccessSection />
        


        {/* 3D Villa Gallery (Horizontal Scroll) */}
        <VillaGallery />

      </main>
      <Footer />
    </div>
  );
}

export default App;
