import React from "react";
import styles from "./sustainability.module.css";
// sustainability

const page = () => {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Environment and quality — Montana’s environmental certifications and
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

      <section className={styles.susImgBox}>
        <div className={styles.leftImg}>
          <img
            src="https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/factory/montana_factory_2022_20_h.jpg?mode=crop&width=1520&height=2027"
            alt=""
          />
        </div>
        <div className={styles.leftImg}>
          <img
            src="https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/factory/montana_factory_2022_21_h.jpg?mode=crop&width=1520&height=2027"
            alt=""
          />
        </div>
      </section>
    </>
  );
};

export default page;
