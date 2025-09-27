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
  variant?: 'default' | 'third' | 'colorClass'; // Yeni variant əlavə edildi
  imagePosition?: {
    width: string;
    height: string;
    top: string;
    left?: string;
    right?: string;
  };
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
  imagePosition,
}: PaletteProps) {

  // Yeni variant üçün klass əlavə edildi
  const sectionClassName = `${styles.paletteMain} ${
    layout === 'textRight' ? styles.reversed : ''
  } ${variant === 'third' ? styles.thirdVariant : ''} ${
    variant === 'colorClass' ? styles.colorClassVariant : ''
  }`;

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
          style={{
            backgroundImage: `url("${imageUrl}")`,
            ...(imagePosition && {
              width: imagePosition.width,
              height: imagePosition.height,
              top: imagePosition.top,
              ...(imagePosition.left ? { left: imagePosition.left } : {}),
              ...(imagePosition.right ? { right: imagePosition.right } : {}),
            })
          }}
        ></div>
      </div>
    </section>
  );
}
