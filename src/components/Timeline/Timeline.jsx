import React from 'react';
import { motion } from 'framer-motion';
import { parcoursData } from '../../data/parcoursData';
import styles from './Timeline.module.css';

const Timeline = () => {
  const lineVariants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: { 
      scaleY: 1, 
      transition: { duration: 1.5, ease: "easeInOut" } 
    }
  };

  const cardVariants = (side) => ({
    hidden: { 
      opacity: 0, 
      x: side === 'left' ? -50 : 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  });

  return (
    <section className={styles.timelineSection} id="expertise">
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.mainTitle}>Mon Évolution & Parcours</h2>
          <p className={styles.introText}>
            Un parcours d'apprentissage continu, de la découverte du code à l'expertise Full-Stack.
          </p>
        </motion.div>

        <div className={styles.timelineWrapper}>
          <motion.div 
            className={styles.centralLine}
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          ></motion.div>

          <div className={styles.itemsContainer}>
            {parcoursData.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.id} 
                  className={`${styles.timelineItem} ${item.side === 'left' ? styles.leftSide : styles.rightSide}`}
                >
                  {/* Carte */}
                  <motion.div 
                    className={styles.cardWrapper}
                    variants={cardVariants(item.side)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <div className={styles.card} style={{ '--item-color': item.color }}>
                      <div className={styles.cardHeader}>
                        <span className={styles.yearBadge}>{item.year}</span>
                      </div>
                      
                      <div className={styles.contentRow}>
                        <div className={styles.iconBox}>
                          <Icon size={24} color={item.color} />
                        </div>
                        <h3 className={styles.cardTitle}>{item.title}</h3>
                      </div>
                      
                      <p className={styles.cardDescription}>{item.description}</p>
                      
                      <div className={styles.gradientBar}></div>
                    </div>
                  </motion.div>

                  {/* Point central */}
                  <motion.div 
                    className={styles.dot} 
                    style={{ backgroundColor: item.color, boxShadow: `0 0 20px ${item.color}80` }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                    viewport={{ once: true }}
                  ></motion.div>

                  {/* Espace vide pour l'équilibre desktop */}
                  <div className={styles.emptySpace}></div>
                </div>
              );
            })}
          </div>
        </div>

        <motion.div 
          className={styles.footerCTA}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className={styles.footerContent}>
            <h3>Et l'aventure continue...</h3>
            <p>Toujours en quête d'apprentissage et d'innovation pour créer des solutions web performantes.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;