import React from "react";
import styles from "./ColoursHero.module.css";

const ColoursHero = () => {
  return (
    <>
      <section className={styles.coloursHero}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              The Montana Colours —{" "}
              <span>A colour palette of 43 poetic colours and veneers</span>
            </h1>
            <p className={styles.description}>
              Colours mean everything. Ambience. Atmosphere. Identity. Colours
              are paramount in our design. We want to influence and inspire the
              world of interiors with our take on colours. Bright and light.
              Dense and deep. There is a colour for any purpose.
            </p>
          </div>
          <div className={styles.imageContent}>
            <div className={styles.heroImage}>
              <img
                src='https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-home/2021/montana_home21_22_camomile_iris_amber_pine_pantonova_detail01_w.jpg?mode=crop&width=1080&height=776' // <-- Yeni şəkil URL-i
                alt='Montana Colours Palette'
                className={styles.heroImageImg}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ColoursHero;
