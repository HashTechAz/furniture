// Loader.tsx
import React from 'react';
import FurnitureIcon from './FurnitureIcon';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinnerContainer}>
        <div className={styles.spinnerRing}></div>
        <FurnitureIcon className={styles.logoImage} />
      </div>
      
      <div className={styles.statusContainer}>
        <div className={styles.loadingText}>
          Preparing Your Space
        </div>
        <div className={styles.subText}>
          Curating Design Elements...
        </div>
      </div>
    </div>
  );
};

export default Loader;