import React from "react";
import styles from "./ChooseSize.module.css";

const ChooseSize = () => {
  return (
    <>
      <section className={styles.chooseSize}>
        <div className={styles.chooseMain}>
          <div className={styles.chooseHeader}>
            <h1>1. Choose the size</h1>
            <p>First, you need to create the design and choose between our basic
            modules. They are available in various sizes, so you can build with
            different depths, heights and widths. Make your own combinations to
            suit your home.</p>
          </div>

          <div className={styles.chooseImage}>
            <img src="https://b2c.montana-episerver.com/globalassets/icons/montana-system/montana_12mm_system_w_ny.jpg?mode=crop&width=1520&height=1093" alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default ChooseSize;
