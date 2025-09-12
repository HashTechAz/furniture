import styles from "./Palette.module.css";

// 1. "imagePosition" propu interfeysdən silindi
interface PaletteProps {
  category?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  backgroundColor: string;
  layout?: 'textLeft' | 'textRight';
}

export default function Palette({
  category,
  title,
  description,
  buttonText,
  buttonLink,
  imageUrl,
  backgroundColor,
  layout = 'textLeft',
  // 2. "imagePosition" propu arqumentlərdən silindi
}: PaletteProps) {

  const sectionClassName = `${styles.paletteMain} ${layout === 'textRight' ? styles.reversed : ''}`;

  return (
    <section className={sectionClassName}>
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
          // 3. Style-dan "imagePosition" silindi, yalnız şəkil qaldı
          style={{
            backgroundImage: `url("${imageUrl}")`,
          }}
        ></div>
      </div>
    </section>
  );
}