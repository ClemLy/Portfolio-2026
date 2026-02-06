import React from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../../data/projectsData';
import ProjectCard from './ProjectCard';
import styles from './ProjectsGrid.module.css';

const ProjectsGrid = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3 
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 100,
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      } 
    }
  };
  
  return (
    <section id="projets" className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>Projets Réalisés</h2>
          <p className={styles.subtitle}>
            Une sélection de projets combinant innovation technique, 
            performance optimale et respect des standards d'éco-conception.
          </p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} 
        >
          {projectsData.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsGrid;