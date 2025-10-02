import React from "react";
import styles from "./BigHero.module.css";

const BigHero = () => {
  return (
    <>
      <section className={styles.bigHero}>
        <div className={styles.bigHeroContent}>
          <div className={styles.bigHeroTitleContainer}>
            <h1 className={styles.bigHeroTitle}>
              <span>Creative minds</span> — Get your interior inspiration from
              colourful personalities
            </h1>
          </div>
          <div className={styles.bigHeroImageContainer}>
            <img src="https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg19903_final_v2.jpg?mode=crop&width=1080&height=776" alt="Creative minds" />
          </div>
        </div>
      </section>
    </>
  );
};

export default BigHero;
