import React from "react";
import styles from "./FlexImages.module.css";
import Image from "next/image";
const FlexImages = () => {
  return (
    <>
      <section className={styles.imagesSection}>
        <div className={styles.imagesMain}>
          <div className={styles.imagesLeft}>
            <Image
              src="https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/factory/montana_factory_eu_commission_2022_11_h.jpg?mode=crop&width=1520&height=2027"
              alt=""
            />
          </div>
          <div className={styles.imagesRight}>
            <Image
              src="https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/factory/montana_factory_2022_02_w.jpg?mode=crop&width=1520&height=1093"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default FlexImages;
