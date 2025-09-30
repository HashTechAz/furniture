import styles from "./PaletteLeft.module.css";

interface PaletteLeftProps {
  category?: string;
  title: string;
  description: string;
  description2?: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  backgroundColor: string;
  imagePosition?: {
    width: string;
    height: string;
    top: string;
    left?: string;
    right?: string;
  };
}

export default function PaletteLeft({
  category,
  title,
  description,
  description2,
  buttonText,
  buttonLink,
  imageUrl,
  backgroundColor,
  imagePosition,
}: PaletteLeftProps) {
  return (
    <section className={styles.paletteMain}>
      {/* Resim solda */}
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

      {/* Text sağda */}
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
    </section>
  );
}
