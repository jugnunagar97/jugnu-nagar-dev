import React from 'react';
import Hero from './Hero';
import Clients from './Clients';
import About from './About';
import ValueProposition from './ValueProposition';
import SkillsAndExperience from './SkillsAndExperience';
import Work from './Work';
import Testimonials from './Testimonials';
import Contact from './Contact';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Clients />
      <About />
      <ValueProposition />
      <SkillsAndExperience />
      <Work />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default Home;
