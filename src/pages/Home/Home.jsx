import React from 'react';
import Hero from '../../components/Hero/Hero';
import ProjectsGrid from '../../components/Projects/ProjectsGrid';
import Timeline from '../../components/Timeline/Timeline';
import TechStack from '../../components/TechStack/TechStack';

const Home = () => {
  return (
    <main>
      <Hero />
      <ProjectsGrid />
      <Timeline />
      <TechStack />
    </main>
  );
};

export default Home;