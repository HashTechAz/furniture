import React from "react";
import styles from "./Hero.module.css";

interface HeroProps {
  title: string;
  titleSpan: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  backgroundColor?: string;
  textColor?: string;
}

const Hero = ({ 
  title, 
  titleSpan, 
  description, 
  imageUrl, 
  imageAlt,
  backgroundColor = "#2c3587",
  textColor = "#333"
}: HeroProps) => {
  return (
    <>
      <section 
        className={styles.hero}
        style={{ backgroundColor, color: textColor }}
      >
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              {title} — <span>{titleSpan}</span>
            </h1>
            <p className={styles.description}>
              {description}
            </p>
          </div>
          <div className={styles.imageContent}>
            <div className={styles.heroImage}>
              <img
                src={imageUrl}
                alt={imageAlt}
                className={styles.heroImageImg}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
