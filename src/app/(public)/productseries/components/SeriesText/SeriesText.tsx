import React from "react";
import styles from "./SeriesText.module.css";

const SeriesText = () => {
  return (
    <>
      <div className={styles.seriesText}>
        <div className={styles.leftText}>
          <h2>
            Montana creates products that can last a lifefime. Explore the many
            possibilities Montana provides.
          </h2>
        </div>
        <div className={styles.rightText}>
          <p>
            The original Montana System offers endless possibilities with 36
            basic modules in four depths and 43 unique colours. Dive even deeper
            into the Montana universe and find other product series such as the
            popular Montana Mini, Panton Wire, Montana Free modules.
          </p>
        </div>
      </div>
    </>
  );
};

export default SeriesText;
