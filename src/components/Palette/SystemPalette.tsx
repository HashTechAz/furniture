import styles from "./SystemPalette.module.css";
import Image from 'next/image'  

interface SystemPaletteProps {
  category?: string;
  title: string;
  description: string;
  description2?: string;
  features?: string[];
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  backgroundColor: string;
  layout?: 'textLeft' | 'textRight';
  variant?: 'default' | 'third';
  imagePosition?: {
    width: string;
    height: string;
    top: string;
    left?: string;
    right?: string;
  };
}

export default function SystemPalette({
  category,
  title,
  description,
  description2,
  features,
  buttonText,
  buttonLink,
  imageUrl,
  backgroundColor,
  layout = 'textLeft',
  variant = 'default',
  imagePosition,
}: SystemPaletteProps) {

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
        {features && features.length > 0 && (
          <ul className={styles.featureList}>
            {features.map((item, idx) => (
              <li key={idx} className={styles.featureItem}>
                <span className={styles.featureBullet} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
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
            ...(imagePosition && {
              width: imagePosition.width,
              height: imagePosition.height,
              top: imagePosition.top,
              ...(imagePosition.left ? { left: imagePosition.left } : {}),
              ...(imagePosition.right ? { right: imagePosition.right } : {}),
            })
          }}
        >
          <Image fill
            src={imageUrl}
            alt={title}
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
}


