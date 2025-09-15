import React from "react";
import styles from "./SustainabilityGallery.module.css";

const SustainabilityGallery = () => {
  return (
    <section className={styles.susImgBox}>
      <div className={styles.leftImg}>
        <img
          src="https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/factory/montana_factory_2022_20_h.jpg?mode=crop&width=1520&height=2027"
          alt="Montana Factory"
        />
      </div>
      <div className={styles.leftImg}>
        <img
          src="https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/factory/montana_factory_2022_21_h.jpg?mode=crop&width=1520&height=2027"
          alt="Montana Factory"
        />
      </div>
    </section>
  );
};

export default SustainabilityGallery;
