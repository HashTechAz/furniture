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

      <section className={styles.certifications}>
        <div className={styles.certificationsMain}>
          <h2>Certifications</h2>
          <p>
            The Montana shelving modules carry the EU Ecolabel, the Danish
            Indoor Climate Label, and the PEFC certification. Further, Montana's
            production comply with the ISO 14001 environmental standards.
          </p>

          <p>
            Montana became one of the first Danish businesses to run
            ‘cradle-to-grave’ analyses of the environmental consequences of a
            given product. Since 2007, we have exclusively used water-based
            lacquer colours, which neither smell nor contain solvents.
          </p>
        </div>
      </section>
    </>
  );
};

export default page;
