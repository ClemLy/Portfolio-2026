import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion'; // Ajout de framer-motion
import { ExternalLink, Gauge, ArrowLeft } from 'lucide-react';
import { projectsData } from '../../data/projectsData';
import styles from './ProjectDetail.module.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);

  // Sécurité si l'ID dans l'URL ne correspond à rien
  if (!project) return <div className={styles.error}>Projet introuvable</div>;

  // Variants pour les animations de cascade
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.main 
      className={styles.detailPage}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Helmet>
        <title>{project.title} | Clémentin LY</title>
        <meta name="description" content={`Découvrez le projet ${project.title} : ${project.subtitle || project.problematique?.substring(0, 150)}`} />
        <meta property="og:title" content={`${project.title} - Étude de cas par Clémentin LY`} />
        <meta property="og:description" content={project.subtitle} />
        <meta property="og:image" content={`https://clementin-portfolio.vercel.app${project.image}`} />
        <meta property="og:type" content="article" />
      </Helmet>
      
      <div className={styles.container}>
        <motion.div variants={itemVariants}>
          <Link to="/" className={styles.backLink}>
            <ArrowLeft size={20} />
            Retour aux projets
          </Link>
        </motion.div>
        
        <motion.header className={styles.header} variants={itemVariants}>
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
        </motion.header>

        {/* Image */}
        {project.image && (
          <motion.div 
            className={styles.heroImage}
            variants={itemVariants}
            transition={{ duration: 0.4 }}
          >
            <img src={project.image} alt={project.title} />
          </motion.div>
        )}

        {/* Section Défi & Architecture */}
        {(project.problematique || project.solution || project.architecture) && (
          <motion.section className={styles.section} variants={itemVariants}>
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
                      <motion.div 
                        key={index} 
                        className={`${styles.archItem} ${index % 2 === 0 ? styles.blueItem : styles.cyanItem}`}
                        whileHover={{ x: 10, backgroundColor: "rgba(30, 41, 59, 0.5)" }}
                      >
                        <span className={styles.dot}></span>
                        <div className={styles.archContent}>
                          <strong className={styles.archName}>{item.name}</strong>
                          <p className={styles.archDetails}>{item.details}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        )}


        {/* Section Galerie */}
        {project.gallery && project.gallery.length > 0 && (
          <motion.section 
            className={styles.gallerySection}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className={styles.sectionTitle}>Aperçus du projet</h2>
            <div className={styles.galleryGrid}>
              {project.gallery.slice(0, 3).map((img, index) => (
                <motion.div 
                  key={index} 
                  className={styles.galleryItem}
                  whileHover={{ y: -10 }}
                >
                  <img src={img} alt={`${project.title} screenshot ${index + 1}`} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
        

        {/* Section Lighthouse */}
        {project.lighthouse && (
          <motion.section 
            className={styles.lighthouseCard}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={styles.lighthouseHeader}>
              <Gauge size={32} className={styles.gaugeIcon} color="#22D3EE" />
              <h2 className={styles.lighthouseTitle}>Performance & Éco-conception</h2>
            </div>

            <div className={styles.lighthouseGrid}>
              {Object.entries(project.lighthouse).map(([key, value], index) => {
                const isCyan = index % 2 === 0;
                const strokeColor = isCyan ? "#22D3EE" : "#3B82F6";
                
                return (
                  <div key={key} className={styles.scoreColumn}>
                    <div className={styles.scoreInfo}>
                      <span className={styles.scoreLabel}>
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className={styles.scoreValueText}>{value}</span>
                    </div>

                    <div className={styles.progressCircleWrapper}>
                      <svg className={styles.svgCircle} viewBox="0 0 120 120">
                        {/* Cercle de fond (piste) */}
                        <circle
                          cx="60"
                          cy="60"
                          r={radius}
                          stroke="rgba(255, 255, 255, 0.05)"
                          strokeWidth="8"
                          fill="none"
                        />
                        {/* Cercle de progression animé */}
                        <motion.circle
                          cx="60"
                          cy="60"
                          r={radius}
                          stroke={strokeColor}
                          strokeWidth="8"
                          strokeLinecap="round"
                          fill="none"
                          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                          whileInView={{ strokeDashoffset: circumference * (1 - value / 100) }}
                          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                          viewport={{ once: true }}
                        />
                      </svg>
                      <span className={styles.scoreValueInside}>{value}</span>
                    </div>

                    <div className={`${styles.bottomBar} ${isCyan ? styles.cyanBar : styles.blueBar}`}>
                      <motion.div 
                        className={styles.barFill} 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${value}%` }}
                        transition={{ duration: 1, delay: 0.8 }}
                        viewport={{ once: true }}
                      ></motion.div>
                    </div>
                  </div>
                );
              })}
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
          </motion.section>
        )}

        {/* Section Contact */}
        <motion.section 
          className={styles.contactCTA}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
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
        </motion.section>
      </div>
    </motion.main>
  );
};

export default ProjectDetail;