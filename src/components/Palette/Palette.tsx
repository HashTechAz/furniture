import styles from "./Palette.module.css";

export default function Palette() {
  return (
    <>
      <section className={styles.paletteMain}>
        <div className={styles.paletteTextBox}>
          <h1 className={styles.paletteTextBoxTitle}>
            <span>News</span>
          </h1>
          <h2 className={styles.paletteTextBoxTitle}>
            <span>Refreshing the Palette</span>
          </h2>
          <div className={styles.paletteDescription}>
            <p>
              The Montana Mini series is now even more versatile with the
              introduction of an updated colour range. Whether you’re looking to
              add warmth, make a bold statement, or create a subtle touch of
              elegance, the new colours empower you to design a space that feels
              uniquely yours.
            </p>
          </div>
          <div>
            <a href="#" className={styles.heroButton}>
              Explore now
            </a>
          </div>
        </div>

        <div className={styles.paletteImgBox}>
            <div className={styles.paletteOneColor}></div>
            <div className={styles.paletteJpg}></div>
        </div>
      </section>
    </>
  );
}
