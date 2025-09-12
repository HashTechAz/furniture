import styles from "./Palette.module.css";

interface PaletteProps {
  category?: string;
  title: string;
  description: string;
  description2?: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  backgroundColor: string;
  layout?: 'textLeft' | 'textRight';
  variant?: 'default' | 'third';
}

export default function Palette({
  category,
  title,
  description,
  description2,
  buttonText,
  buttonLink,
  imageUrl,
  backgroundColor,
  layout = 'textLeft',
  variant = 'default',
  // 2. "imagePosition" propu arqumentlərdən silindi
}: PaletteProps) {

  const sectionClassName = `${styles.paletteMain} ${layout === 'textRight' ? styles.reversed : ''} ${variant === 'third' ? styles.thirdVariant : ''}`;

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
          {description2 && <p>{description2}</p>}
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