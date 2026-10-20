import { ParticleBackground } from './components/ParticleBackground';
import { Navigation } from './components/Navigation';
import { CommandPalette } from './components/CommandPalette';
import { ScrollUI } from './components/ScrollUI';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { Stats } from './sections/Stats';
import { About } from './sections/About';
import { LearningGoals } from './sections/LearningGoals';
import { Packaging } from './sections/Packaging';
import { Projects } from './sections/Projects';
import { Philosophy } from './sections/Philosophy';
import { Contact } from './sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-hacker-bg text-hacker-text relative overflow-x-hidden">
      <a href="#main" className="skip-link">
        skip to content
      </a>

      {/* Particle Background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navigation />
      <ScrollUI />
      <CommandPalette />

      {/* Main Content */}
      <main id="main" className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <Stats />
        <About />
        <LearningGoals />
        <Packaging />
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
