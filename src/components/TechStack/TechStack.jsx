import React, { useState } from 'react';
import { techTabs, lighthouseMetrics, certifications } from '../../data/techStackData';
import { ArrowRight, Activity, Leaf, Code2, Server } from 'lucide-react';
import styles from './TechStack.module.css';

const TechStack = () => {
  const [activeTab, setActiveTab] = useState('frontend');
  const [hoveredTech, setHoveredTech] = useState(null);

  const activeTabData = techTabs.find(tab => tab.id === activeTab) || techTabs[0];

  return (
    <section className={styles.stackSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Mon Écosystème de Développement</h2>
          <p className={styles.subtitle}>Une architecture pensée pour la performance et l'impact environnemental.</p>
        </div>

        {/* 1. Diagramme d'Architecture */}
        <div className={styles.archDiagram}>
          <div className={styles.diagramNode} style={{ '--node-color': '#3B82F6' }}>
            <div className={styles.iconCircle}><Code2 size={32} /></div>
            <span>Frontend</span>
          </div>
          <div className={styles.connector}>
            <ArrowRight size={24} className={styles.arrow} />
            <span className={styles.connectorText}>API REST</span>
          </div>
          <div className={styles.diagramNode} style={{ '--node-color': '#22D3EE' }}>
            <div className={styles.iconCircle}><Activity size={32} /></div>
            <span>Logic</span>
          </div>
          <div className={styles.connector}>
            <ArrowRight size={24} className={styles.arrow} />
            <span className={styles.connectorText}>Queries</span>
          </div>
          <div className={styles.diagramNode} style={{ '--node-color': '#3B82F6' }}>
            <div className={styles.iconCircle}><Server size={32} /></div>
            <span>Backend</span>
          </div>
        </div>

        <div className={styles.mainGrid}>
          {/* 2. Onglets et Tech Grid */}
          <div className={styles.techPanel}>
            <div className={styles.tabsList}>
              {techTabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button 
                    key={tab.id}
                    className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className={styles.techGrid}>
              {activeTabData.technologies.map(tech => (
                <div 
                  key={tech.name} 
                  className={styles.techCard}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  <div className={styles.techCardHeader}>
                    <div className={styles.indicator} style={{ backgroundColor: activeTabData.color }}></div>
                    <h4>{tech.name}</h4>
                  </div>
                  <div className={`${styles.tooltip} ${hoveredTech === tech.name ? styles.showTooltip : ''}`}>
                    <p>{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Panel Expertise Numérique (Lighthouse + Certifs) */}
          <div className={styles.ecoPanel}>
            <div className={styles.ecoHeader}>
              <Leaf className={styles.leafIcon} />
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
                      <div 
                        className={styles.progressBar} 
                        style={{ width: `${metric.score}%`, backgroundColor: metric.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.certifSection}>
              <h4 className={styles.smallTitle}>Garanties Techniques</h4>
              <div className={styles.certifCards}>
                {certifications.map((cert) => (
                  <div key={cert.title} className={styles.certCard}>
                    <div className={styles.certHeader}>
                      <span className={`${styles.certBadge} ${cert.badge === 'Certifié' ? styles.isCertified : ''}`}>
                        {cert.badge}
                      </span>
                      <h5>{cert.title}</h5>
                    </div>
                    <p>{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;