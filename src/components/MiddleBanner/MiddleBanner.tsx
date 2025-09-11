import React from "react";
import styles from "./MiddleBanner.module.css";

const MiddleBanner = () => {
  return (
    <>
      <section className={styles.mBanner}>
        <div className={styles.leftBanner}></div>
        <div className={styles.rightBanner}>
          <div className={styles.rightImg}></div>
          <div className={styles.rightText}>
            <h1 className={styles.title}>New sizes – New colours</h1>
            <p>
              The Panton Wire system has always been celebrated for its balance
              of simplicity and elegance. Now, it takes another step forward
              with thoughtful updates that enhance its versatility and aesthetic
              appeal.
            </p>
            <div>
              <a href="#" className={styles.heroButton}>
                Explore now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MiddleBanner;
