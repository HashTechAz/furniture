import React from 'react';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  title?: string;
  titleSpan?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
  variant?: 'default' | 'productseries';
}

const HeroSection = ({ 
  title = "Paradigm", 
  titleSpan = "The new language of lounge",
  buttonText = "Explore now",
  buttonLink = "#",
  backgroundImage,
  variant = 'default'
}: HeroSectionProps) => {
    return (
        <section className={`${styles.hero} ${variant === 'productseries' ? styles.productseriesVariant : ''}`}>
            {/* Yuxarı rəngli hissə */}
            <div className={styles.heroTop}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        {title} <span>{titleSpan}</span>
                    </h1>
                    <a href={buttonLink} className={styles.heroButton}>
                        {buttonText}
                    </a>
                </div>
            </div>
            {/* Aşağı şəkil hissəsi */}
            <div 
              className={styles.heroBottom}
              style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
            ></div>
        </section>
    );
};

export default HeroSection;