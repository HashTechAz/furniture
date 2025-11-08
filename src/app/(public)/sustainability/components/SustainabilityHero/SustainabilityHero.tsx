import React from "react";
import styles from "./SustainabilityHero.module.css";

const SustainabilityHero = () => {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Environment and quality — Montana&apos;s environmental certifications and
          initiatives
        </h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut
          turpis sit amet elit feugiat convallis. Integer sodales, nisl a
          dignissim molestie, arcu ligula aliquam lacus, vitae porta lectus
          lacus nec dolor.
        </p>
      </div>
    </section>
  );
};

export default SustainabilityHero;
