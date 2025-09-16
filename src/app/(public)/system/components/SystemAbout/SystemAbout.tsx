import React from "react";
import styles from "./SystemAbout.module.css";

const SystemAbout = () => {
  return (
    <>
      <section className={styles.systemAbout}>
        <div className={styles.aboutMain}>
          <div className={styles.aboutTitle}>
            <h1>
              Design your own <br /> personalised shelving <br /> system with
              the Montana <br /> System.
            </h1>
          </div>
          <div className={styles.aboutDescription}>
            <p>
              The Montana System gives you endless possibilities – with 36 basis
              modules, 4 depths and 43 poetic finishes you can create a shelving
              system just as you like.
            </p>

            <p>
              The system is made in 12 mm MDF. In 2019, the Montana System was
              certified with the EU Ecolabel, guaranteeing you sustainable,
              high-quality furniture which is safe for both the environment and
              your home.
            </p>

             <span>Designer: <strong>Peter Amvar Aliyev</strong></span>
          </div>
        </div>
      </section>
    </>
  );
};

export default SystemAbout;
