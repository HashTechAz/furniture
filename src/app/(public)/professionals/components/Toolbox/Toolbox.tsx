import React from 'react';
import styles from './Toolbox.module.css';

const Toolbox = () => {
  const toolboxItems = [
    { id: '2d-3d', title: '2D & 3D files', description: 'Browse our library and find files for your project.', bgColor: '#618dc2', color: '#000' },
    { id: 'showroom', title: 'Digital showroom', description: 'Find high-resolution versions of our ambient and product images, and explore a selection of our contract projects.', bgColor: '#e1e1d8', color: '#000' },
    { id: 'colours', title: 'Colours & materials', description: 'Overview of colours and materials of the series.', bgColor: '#e3ebe3', color: '#000' },
    { id: 'certifications', title: 'Certifications', description: 'Montana is awarded the EU Ecolabel and the Danish Indoor Climate label.', bgColor: '#d0b370', color: '#000' },
    { id: 'pcon', title: 'pCon planner & box', description: 'Explore our catalogue and start your project.', bgColor: '#bbced4', color: '#000' },
    { id: 'sales', title: 'Sales team', description: 'Our sales team provides support to customers worldwide.', bgColor: '#b28355', color: '#000' },
    { id: 'brochure', title: 'Product information brochure', description: 'Explore our interactive product brochure covering our full product range.', bgColor: '#ecebe1', color: '#000' },
    { id: 'office', title: 'Office Selections', description: 'Explore application examples of what is possible with the Montana System.', bgColor: '#fbf0b5', color: '#000' },
    { id: 'planning', title: 'Planning ideas', description: 'Begin your next project with our planning ideas.', bgColor: '#d1c1e1', color: '#000' },
  ];

  return (
    <div className={styles.toolboxSection}>
      <h2 className={styles.sectionTitle}>Montana Toolbox – Resources for your projects</h2>
      <div className={styles.toolboxGrid}>
        {toolboxItems.map((item) => (
          <div 
            key={item.id} 
            className={styles.toolboxCard}
            style={{ backgroundColor: item.bgColor, color: item.color }}
          >
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDescription}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolbox;
