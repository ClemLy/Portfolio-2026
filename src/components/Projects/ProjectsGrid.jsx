import React from 'react';
import { projectsData } from '../../data/projectsData';
import ProjectCard from './ProjectCard';
import styles from './ProjectsGrid.module.css';

const ProjectsGrid = () => {
  return (
    <section id="projets" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Projets Réalisés</h2>
          <p className={styles.subtitle}>
            Une sélection de projets combinant innovation technique, 
            performance optimale et respect des standards d'éco-conception.
          </p>
        </div>

        <div className={styles.grid}>
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;