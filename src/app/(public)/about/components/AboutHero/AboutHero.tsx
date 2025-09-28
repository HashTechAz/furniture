import React from "react";
import styles from "./AboutHero.module.css";

const AboutHero = () => {
  return (
    <>
      <section className={styles.aboutHero}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>About Montana — <span>Let's create playful spaces</span></h1>
            <p className={styles.description}>
              The family-owned Montana Furniture has provided generations with
              personalized storage solutions, since 1982. The Danish high-end
              furniture company was established by Peter J. Lassen, who also
              created the modular Montana System. Today, the company is run by
              Peter’s son Joakim Lassen, who is the fifth generation of his
              family to work with furniture and the great-grandson of
              manufacturer Fritz Hansen.
            </p>
          </div>
            <div className={styles.heroImage}>
              <img
                src='https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-home/2023/location---radiohuset/montana_home_23_24_ruby_hokkaido_iris_cumin_detail_01_w.jpg?mode=crop&width=1080&height=776'
                alt='Montana Company'
                className={styles.heroImageImg}
              />
            </div>
        </div>
      </section>
    </>
  );
};

export default AboutHero;
