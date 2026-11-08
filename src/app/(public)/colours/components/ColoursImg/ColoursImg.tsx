import React from "react";
import styles from "./ColoursImg.module.css";
import Image from "next/image";
const ColoursImg = () => {
  return (
    <>
      <section className={styles.coloursImg}>
        <div className={styles.coloursImgMain}>
          <Image
            fill
            src="https://b2c.Sparro-episerver.com/globalassets/ambient-images/square-images/colours/Sparro_colourpalette_web_opdateret.png?mode=crop&width=1520&height=1520"
            alt=""
          />
        </div>
      </section>
    </>
  );
};

export default ColoursImg;
