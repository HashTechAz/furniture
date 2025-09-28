import React from "react";
import styles from "./ColoursPalette.module.css";

interface ColoursPaletteProps {
  reversed?: boolean;
}

const ColoursPalette = ({ reversed = false }: ColoursPaletteProps) => {
  return (
    <section className={`${styles.paletteMain} ${reversed ? styles.reversed : ''}`}>
      <div className={styles.paletteTextBox}>
        <h2 className={styles.paletteTextBoxTitle}>
          <span>Margrethe Odgaard</span>
        </h2>
        <div className={styles.paletteDescription}>
          <p>
            In the summer of 2019, Montana launched a completely new color
            palette developed in collaboration with Margrethe Odgaard. The
            Danish designer graduated in 2005 from The Royal Danish Academy of
            Fine Arts, School of Design in Copenhagen and also studied at The
            Rhode Island School of Design in the US. In 2016 she won the
            prestigious Torsten and Wanja Söderberg Prize for her colour and
            textile work.
          </p>
        </div>
        <div>
          <a href='/product' className={styles.heroButton}>
            View all colours
          </a>
        </div>
      </div>

      <div className={styles.paletteImgBox}>
        <div
          className={styles.paletteOneColor}
          style={{ backgroundColor: "#BDD2DA" }}
        ></div>
        <div
          className={styles.paletteJpg}
          style={{
            backgroundImage: `url("https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/margrethe-collab/montana_3newcolours_2023_margretheodgaard_08_h.jpg?mode=crop&width=640&height=640")`,
            width: "550px",
            height: "450px",
            top: "60px",
            left: "30px",
          }}
        ></div>
      </div>
    </section>
  );
};

export default ColoursPalette;
