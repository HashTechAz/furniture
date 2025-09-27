import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
    return (
        <section className={styles.hero}>
            {/* Yuxarı rəngli hissə */}
            <div className={styles.heroTop}>
                {/* Səhvin olduğu təkrarlanan blok buradan silindi */}
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Paradigm <span>The new language of lounge</span>
                    </h1>
                    <a href="#" className={styles.heroButton}>
                        Explore now
                    </a>
                </div>
            </div>
            {/* Aşağı şəkil hissəsi */}
            <div className={styles.heroBottom}></div>
        </section>
    );
};

export default HeroSection;