import React from 'react';
import { ExternalLink, Gauge } from 'lucide-react';
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
            <Gauge size={16} color="#22D3EE" />
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
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;