import React from "react";
import styles from "./Ecolabel.module.css";
import Link from "next/link";

const Ecolabel = () => {
  return (
    <>
      <section className={styles.ecolabel}>
        <h3>EU Ecolabel</h3>
        <p>
          In 2019 Montana was awarded the official EU Ecolabel and is thereby
          among the very first Danish furniture manufacturers to achieve it.
          When developing EU Ecolabel criteria for products, the focus is on the
          product's entire lifecycle, from raw material extraction to
          production, distribution and disposal. Today the following product
          series are certified with the EU Ecolabel:
        </p>

        <ul>
          {[
            "Kevi",
            "Chairik",
            "Marée",
            "Montana System",
            "Montana Selection",
            "Montana TV & Sound",
            "Montana Free",
            "Montana Mega",
            "Montana Mini",
            "Montana 16 mm System (CO16)",
            "Montana Living Things",
            "Montana Noticeboard",
            "Skyline & Skyline Table",
            "Montana Lockers",
          ].map((product) => (
            <li key={product}>
              <Link href={"/"}>{product}</Link>
            </li>
          ))}
        </ul>

        <p>
          CEO at Montana Joakim Lassen says: "Achieving this certification has
          been very important to us, and it's something we've worked towards for
          a long time. I'm delighted that Montana is one of the first furniture
          manufacturers in Europe to achieve it because I consider
          sustainability a key part of our responsibilities as a manufacturer in
          Denmark."
        </p>

        <p className={styles.newEu}>
          The objective of the EU Ecolabel is to reduce the overall
          environmental impact of the production and consumption of goods. The
          label looks at the entire product’s life cycle and the environmental
          problems that arise along the way – for the benefit of people, the
          environment and the earth’s resources.
        </p>

        <div className={styles.newListBox}>
            <h3>The EU Ecolabel guarantees</h3>
          <ul className={styles.newList}>
            {[
              "that a high percentage of wood is from legal sustainably managed forests",
              "tough restrictions on the use of environmentally hazardous substances",
              "that wood has low emissions of the allergenic substance formaldehyde",
              "tough restrictions on the use of toxic substances",
              "a 5-year product guarantee (Montana has opted to retain its 10-year product guarantee)",
            ].map((guarantee) => (
              <li key={guarantee}>
                <span>{guarantee}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.endPara}>
          CEO at Montana Joakim Lassen says: "Achieving this certification has
          been very important to us, and it's something we've worked towards for
          a long time. I'm delighted that Montana is one of the first furniture
          manufacturers in Europe to achieve it because I consider
          sustainability a key part of our responsibilities as a manufacturer in
          Denmark."
        </p>
      </section>
    </>
  );
};

export default Ecolabel;
