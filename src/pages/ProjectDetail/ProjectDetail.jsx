import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../../data/projectsData';
import styles from './ProjectDetail.module.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);

  if (!project) return <div className={styles.error}>Projet introuvable</div>;

  return (
    <main className={styles.detailPage}>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Retour aux projets
        </Link>
        
        <header className={styles.header}>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.subtitle}>{project.subtitle}</p>
          <div className={styles.techStack}>
            {project.techs.map(tech => <span key={tech} className={styles.tag}>{tech}</span>)}
          </div>
        </header>

        <div className={styles.heroImage}>
          <img src={project.image} alt={project.title} />
        </div>

        {/* Section Défi Technique */}
        <section className={styles.section}>
          <div className={styles.gridTwoCols}>
            <div>
              <h2 className={styles.sectionTitle}>Défi Technique</h2>
              <h3 className={styles.subBlue}>Problématique</h3>
              <p className={styles.text}>{project.problematique}</p>
              <h3 className={styles.subBlue}>Solution Technique</h3>
              <p className={styles.text}>{project.solution}</p>
            </div>
            <div className={styles.architectureCard}>
              <h3 className={styles.archTitle}>Architecture Technique</h3>
              {project.architecture.map((item, index) => (
                <div key={index} className={styles.archItem}>
                  <span className={styles.dot}></span>
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Lighthouse */}
        <section className={styles.lighthouseSection}>
          <h2 className={styles.sectionTitle}>Performance & Éco-conception</h2>
          <div className={styles.lighthouseGrid}>
            {Object.entries(project.lighthouse).map(([key, value]) => (
              <div key={key} className={styles.scoreItem}>
                <div className={styles.progressCircle} style={{'--percent': value}}>
                  <span className={styles.scoreValue}>{value}</span>
                </div>
                <span className={styles.scoreLabel}>{key.replace(/([A-Z])/g, ' $1')}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProjectDetail;