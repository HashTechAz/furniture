import styles from "./Palette.module.css";

interface PaletteProps {
  category?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  backgroundColor: string;
  imagePosition: {
    width: string;
    height: string;
    top: string;
    left: string;
  };
}

export default function Palette({
  category,
  title,
  description,
  buttonText,
  buttonLink,
  imageUrl,
  backgroundColor,
  imagePosition,
}: PaletteProps) {
  return (
    <section className={styles.paletteMain}>
      <div className={styles.paletteTextBox}>
        {category && (
          <h1 className={styles.paletteTextBoxTitle}>
            <span>{category}</span>
          </h1>
        )}
        <h2 className={styles.paletteTextBoxTitle}>
          <span>{title}</span>
        </h2>
        <div className={styles.paletteDescription}>
          <p>{description}</p>
        </div>
        <div>
          <a href={buttonLink} className={styles.heroButton}>
            {buttonText}
          </a>
        </div>
      </div>

      <div className={styles.paletteImgBox}>
        <div
          className={styles.paletteOneColor}
          style={{ backgroundColor: backgroundColor }}
        ></div>
        <div
          className={styles.paletteJpg}
          // DÜZƏLİŞ BURADADIR
          style={{
            backgroundImage: `url("${imageUrl}")`,
            ...imagePosition,
          }}
        ></div>
      </div>
    </section>
  );
}