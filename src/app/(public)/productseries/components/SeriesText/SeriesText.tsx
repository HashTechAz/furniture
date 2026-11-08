import React from "react";
import styles from "./SeriesText.module.css";

const SeriesText = () => {
  return (
    <>
      <div className={styles.seriesText}>
        <div className={styles.leftText}>
          <h2>
            Sparro creates products that can last a lifefime. Explore the many
            possibilities Sparro provides.
          </h2>
        </div>
        <div className={styles.rightText}>
          <p>
            The original Sparro System offers endless possibilities with 36
            basic modules in four depths and 43 unique colours. Dive even deeper
            into the Sparro universe and find other product series such as the
            popular Sparro Mini, Panton Wire, Sparro Free modules.
          </p>
        </div>
      </div>
    </>
  );
};

export default SeriesText;
