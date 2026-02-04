import React from 'react';
import { parcoursData } from '../../data/parcoursData';
import styles from './Timeline.module.css';

const Timeline = () => {
  return (
    <section className={styles.timelineSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.mainTitle}>Mon Évolution & Parcours</h2>
          <p className={styles.introText}>
            Un parcours d'apprentissage continu, de la découverte du code à l'expertise Full-Stack.
          </p>
        </div>

        <div className={styles.timelineWrapper}>
          <div className={styles.centralLine}></div>

          <div className={styles.itemsContainer}>
            {parcoursData.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.id} 
                  className={`${styles.timelineItem} ${item.side === 'left' ? styles.leftSide : styles.rightSide}`}
                >
                  {/* Carte */}
                  <div className={styles.cardWrapper}>
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
                  </div>

                  {/* Point central */}
                  <div className={styles.dot} style={{ backgroundColor: item.color, boxShadow: `0 0 20px ${item.color}80` }}></div>

                  {/* Espace vide pour l'équilibre desktop */}
                  <div className={styles.emptySpace}></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.footerCTA}>
          <div className={styles.footerContent}>
            <h3>Et l'aventure continue...</h3>
            <p>Toujours en quête d'apprentissage et d'innovation pour créer des solutions web performantes.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;