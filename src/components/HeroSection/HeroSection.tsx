import React from "react";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  variant?: "default" | "productseries" | "inspiration";
}

const HeroSection = ({ variant = "default" }: HeroSectionProps) => {
  return (
    <section
      className={`${styles.hero} ${
        variant === "productseries" ? styles.productseriesVariant : ""
      } ${variant === "inspiration" ? styles.inspirationVariant : ""}`}
    >
      <div className={styles.heroBottom}>
        <iframe
          className={styles.heroVideo}
          src="https://player.vimeo.com/video/1239316939?background=1&autoplay=1&autopause=0&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&badge=0"
          title="Sparro Hero Video"
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          loading="eager"
          tabIndex={-1}
        />
      </div>
    </section>
  );
};

export default HeroSection;
