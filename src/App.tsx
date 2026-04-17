import { ParticleBackground } from './components/ParticleBackground';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Philosophy } from './sections/Philosophy';
import { Contact } from './sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-hacker-bg text-hacker-text relative overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Philosophy />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
