import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { techTabs, lighthouseMetrics, certifications } from '../../data/techStackData';
import { ArrowRight, Activity, Leaf, Code2, Server } from 'lucide-react';
import styles from './TechStack.module.css';

const TechStack = () => {
  const [activeTab, setActiveTab] = useState('frontend');
  const [hoveredTech, setHoveredTech] = useState(null);

  const activeTabData = techTabs.find(tab => tab.id === activeTab) || techTabs[0];

  // Variantes pour l'apparition des cartes technologiques
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className={styles.stackSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>Mon Écosystème de Développement</h2>
          <p className={styles.subtitle}>Une architecture pensée pour la performance et l'impact environnemental.</p>
        </motion.div>

        {/* 1. Diagramme d'Architecture */}
        <div className={styles.archDiagram}>
          {[
            { icon: Code2, label: 'Frontend', color: '#3B82F6', connector: 'API REST' },
            { icon: Activity, label: 'Logic', color: '#22D3EE', connector: 'Queries' },
            { icon: Server, label: 'Backend', color: '#3B82F6' }
          ].map((node, index) => (
            <React.Fragment key={node.label}>
              <motion.div 
                className={styles.diagramNode} 
                style={{ '--node-color': node.color }}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, type: "spring" }}
                viewport={{ once: true }}
              >
                <div className={styles.iconCircle}><node.icon size={32} /></div>
                <span>{node.label}</span>
              </motion.div>
              
              {node.connector && (
                <motion.div 
                  className={styles.connector}
                  initial={{ opacity: 0, width: 0 }}
                  whileInView={{ opacity: 1, width: 'auto' }}
                  transition={{ delay: (index * 0.2) + 0.2 }}
                  viewport={{ once: true }}
                >
                  <ArrowRight size={24} className={styles.arrow} />
                  <span className={styles.connectorText}>{node.connector}</span>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className={styles.mainGrid}>
          {/* 2. Onglets et Tech Grid */}
          <div className={styles.techPanel}>
            <div className={styles.tabsList}>
              {techTabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button 
                    key={tab.id}
                    className={`${styles.tabBtn} ${isActive ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon size={18} />
                    <span style={{ position: 'relative', zIndex: 2 }}>{tab.label}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeTabIndicator"
                        className={styles.activeTabIndicator}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                className={styles.techGrid}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {activeTabData.technologies.map(tech => (
                  <motion.div 
                    key={tech.name} 
                    className={styles.techCard}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                    layout
                  >
                    <div className={styles.techCardHeader}>
                      <div className={styles.indicator} style={{ backgroundColor: activeTabData.color }}></div>
                      <h4>{tech.name}</h4>
                    </div>
                    <div className={`${styles.tooltip} ${hoveredTech === tech.name ? styles.showTooltip : ''}`}>
                      <p>{tech.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3. Panel Expertise Numérique */}
          <motion.div 
            className={styles.ecoPanel}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.ecoHeader}>
              <motion.div
                animate={{ rotate: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <Leaf className={styles.leafIcon} />
              </motion.div>
              <h3>Expertise Numérique Responsable</h3>
            </div>

            <div className={styles.lighthouseGrid}>
              <h4 className={styles.smallTitle}>Scores Lighthouse (Ce site)</h4>
              <div className={styles.metricsList}>
                {lighthouseMetrics.map(metric => (
                  <div key={metric.label} className={styles.metricItem}>
                    <div className={styles.metricLabels}>
                      <span>{metric.label}</span>
                      <span className={styles.score}>{metric.score}</span>
                    </div>
                    <div className={styles.progressTrack}>
                      <motion.div 
                        className={styles.progressBar} 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.score}%` }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                        style={{ backgroundColor: metric.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.certifSection}>
              <h4 className={styles.smallTitle}>Garanties Techniques</h4>
              <div className={styles.certifCards}>
                {certifications.map((cert, index) => (
                  <motion.div 
                    key={cert.title} 
                    className={styles.certCard}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <div className={styles.certHeader}>
                      <span className={`${styles.certBadge} ${cert.badge === 'Certifié' ? styles.isCertified : ''}`}>
                        {cert.badge}
                      </span>
                      <h5>{cert.title}</h5>
                    </div>
                    <p>{cert.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;