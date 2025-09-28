import React from "react";
import styles from "./ColoursAbout.module.css";

const ColoursAbout = () => {
  return (
    <>
      <section className={styles.coloursAbout}>
        <div className={styles.aboutMain}>
          <div className={styles.aboutTitle}>
            <h1>A colour is no better than the company it is in</h1>
          </div>
          <div className={styles.aboutDescription}>
            <p>
              Create the Montana composition of your dreams with Montana's
              colour palette. The palette features a range of poetic and complex
              colours – all created to appeal to both your visual sense and your
              emotions. Choose between 41 lacquer colours and two veneers: a
              total of 43 EU Eco-labelled variants.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ColoursAbout;
