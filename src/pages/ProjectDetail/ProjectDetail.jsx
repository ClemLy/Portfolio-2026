import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Gauge, ArrowLeft } from 'lucide-react';
import { projectsData } from '../../data/projectsData';
import styles from './ProjectDetail.module.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);

  // Sécurité si l'ID dans l'URL ne correspond à rien
  if (!project) return <div className={styles.error}>Projet introuvable</div>;

  return (
    <main className={styles.detailPage}>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          <ArrowLeft size={20} />
          Retour aux projets
        </Link>
        
        <header className={styles.header}>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.subtitle}>{project.subtitle}</p>
          
          {/* Tags */}
          {project.techs && project.techs.length > 0 && (
            <div className={styles.techStack}>
              {project.techs.map(tech => <span key={tech} className={styles.tag}>{tech}</span>)}
            </div>
          )}

          <div className={styles.actionArea}>
            {project.link ? (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
                Découvrir le résultat
                <ExternalLink size={18} />
              </a>
            ) : (
              <button className={styles.disabledBtn} disabled>
                <span className={styles.pulseDot}></span>
                Projet en cours
              </button>
            )}
          </div>
        </header>

        {/* Image */}
        {project.image && (
          <div className={styles.heroImage}>
            <img src={project.image} alt={project.title} />
          </div>
        )}

        {/* Section Défi & Architecture */}
        {(project.problematique || project.solution || project.architecture) && (
          <section className={styles.section}>
            <div className={styles.gridTwoCols}>
              <div>
                <h2 className={styles.sectionTitle}>Défi Technique</h2>
                {project.problematique && (
                  <>
                    <h3 className={styles.subBlue}>Problématique</h3>
                    <p className={styles.text}>{project.problematique}</p>
                  </>
                )}
                {project.solution && (
                  <>
                    <h3 className={styles.subCyan}>Solution Technique</h3>
                    <p className={styles.text}>{project.solution}</p>
                  </>
                )}
              </div>

              {/* Colonne Architecture */}
              {project.architecture && project.architecture.length > 0 && (
                <div className={styles.architectureCard}>
                  <h3 className={styles.archTitle}>Architecture Technique</h3>
                  <div className={styles.archList}>
                    {project.architecture.map((item, index) => (
                      <div key={index} className={`${styles.archItem} ${index % 2 === 0 ? styles.blueItem : styles.cyanItem}`}>
                        <span className={styles.dot}></span>
                        <div className={styles.archContent}>
                          <strong className={styles.archName}>{item.name}</strong>
                          <p className={styles.archDetails}>{item.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}


        {/* Section Galerie */}
        {project.gallery && project.gallery.length > 0 && (
          <section className={styles.gallerySection}>
            <h2 className={styles.sectionTitle}>Aperçus du projet</h2>
            <div className={styles.galleryGrid}>
              {project.gallery.slice(0, 3).map((img, index) => (
                <div key={index} className={styles.galleryItem}>
                  <img src={img} alt={`${project.title} screenshot ${index + 1}`} />
                </div>
              ))}
            </div>
          </section>
        )}
        

        {/* Section Lighthouse */}
        {project.lighthouse && (
          <section className={styles.lighthouseCard}>
            <div className={styles.lighthouseHeader}>
              <Gauge size={32} className={styles.gaugeIcon} color="#22D3EE" />
              <h2 className={styles.lighthouseTitle}>Performance & Éco-conception</h2>
            </div>

            <div className={styles.lighthouseGrid}>
              {Object.entries(project.lighthouse).map(([key, value], index) => (
                <div key={key} className={styles.scoreColumn}>
                  <div className={styles.scoreInfo}>
                    <span className={styles.scoreLabel}>
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className={styles.scoreValueText}>{value}</span>
                  </div>
                  <div className={`${styles.progressCircle} ${index % 2 === 0 ? styles.cyanCircle : styles.blueCircle}`} style={{ '--percent': value }}>
                    <span className={styles.scoreValueInside}>{value}</span>
                  </div>
                  <div className={`${styles.bottomBar} ${index % 2 === 0 ? styles.cyanBar : styles.blueBar}`}>
                    <div className={styles.barFill} style={{ width: `${value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.ecoBox}>
              <h3 className={styles.ecoTitle}>Démarche Éco-responsable</h3>
              <p className={styles.ecoText}>
                Chacun de mes projets intègrent les standards de l'éco-conception web. De l'optimisation critique des assets
                au déploiement sur des infrastructures à faible empreinte carbone, je privilégie des solutions sobres et performantes.
                L'utilisation systématique de la mise en cache avancée, du lazy-loading et de formats d'images nouvelle génération
                permet de réduire de façon importante l'impact environnemental par rapport à un site standard.
              </p>
            </div>
          </section>
        )}

        {/* Section Contact */}
        <section className={styles.contactCTA}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Intéressé par un projet similaire ?</h2>
            <p className={styles.ctaText}>
              Je serais ravi de discuter de votre projet et de voir comment je peux vous aider à
              créer une solution technique performante et éco-responsable.
            </p>
            <a href="mailto:ly.clementin@gmail.com" className={styles.contactBtn}>
              Me contacter
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProjectDetail;