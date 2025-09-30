import React from 'react';
import Hero from './Hero';
import About from './About';
import ValueProposition from './ValueProposition';
import Services from './Services';
import SkillsAndExperience from './SkillsAndExperience';
import Work from './Work';
import Testimonials from './Testimonials';
import Contact from './Contact';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <About />
      <ValueProposition />
      <SkillsAndExperience />
      <Services />
      <Work />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default Home;
