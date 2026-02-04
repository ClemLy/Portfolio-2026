import React from 'react';
import Hero from '../../components/Hero/Hero';
import ProjectsGrid from '../../components/Projects/ProjectsGrid';
import Timeline from '../../components/Timeline/Timeline';

const Home = () => {
  return (
    <main>
      <Hero />
      <ProjectsGrid />
      <Timeline />
    </main>
  );
};

export default Home;