import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../../data/projectsData';
import ProjectCard from './ProjectCard';
import styles from './ProjectsGrid.module.css';

const ProjectsGrid = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const scrollRef = useRef(null);
  
  // Gestion du nombre de projets en fonction de la taille de l'écran
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(1);
      } else {
        setItemsPerPage(4);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(projectsData.length / itemsPerPage);

  // Réinitialiser la page courante et la position de scroll pour éviter les bugs
  useEffect(() => {
    setCurrentPage(0);
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, [itemsPerPage]);


  // Synchroniser la page courante avec la position de scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth;
      const index = Math.round(scrollPosition / width);
      if (index !== currentPage) {
        setCurrentPage(index);
      }
    }
  };

  const scrollToPage = (pageIndex) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: pageIndex * scrollRef.current.offsetWidth,
        behavior: 'smooth'
      });
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

        <div 
          className={styles.scrollWrapper}
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {Array.from({ length: totalPages }).map((_, pageIdx) => (
            <div key={pageIdx} className={styles.page}>
              <div className={styles.grid}>
                {projectsData
                  .slice(pageIdx * itemsPerPage, (pageIdx + 1) * itemsPerPage)
                  .map((project, index) => (
                    <motion.div 
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* POINTS DE PAGINATION */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                className={`${styles.dot} ${currentPage === idx ? styles.activeDot : ''}`}
                onClick={() => scrollToPage(idx)}
                aria-label={`Aller à la page ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsGrid;