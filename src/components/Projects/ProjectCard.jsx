import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div 
      className={styles.card} 
      onClick={() => navigate(`/projet/${project.id}`)}
    >
      <div className={styles.imageWrapper}>
        <img src={project.image} alt={project.title} className={styles.image} />
        {project.lighthouse?.performance && (
          <div className={styles.lighthouseBadge}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
            </svg>
            <span>{project.lighthouse.performance}</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.description}>{project.subtitle}</p>
        
        <div className={styles.techStack}>
          {project.techs.slice(0, 4).map(tech => (
            <span key={tech} className={styles.techBadge}>{tech}</span>
          ))}
        </div>

        <button className={styles.link}>
          Voir le projet 
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;