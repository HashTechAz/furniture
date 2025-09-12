import styles from "./Palette.module.css";

interface PaletteProps {
  // ...digər proplar eyni qalır...
  category?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  backgroundColor: string;
  // DƏYİŞİKLİK BURADADIR:
  imagePosition: {
    width: string;
    height: string;
    top: string;
    left?: string;  // Opsional oldu (sual işarəsi əlavə edildi)
    right?: string; // Yeni opsional prop əlavə edildi
  };
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
  imagePosition,
  layout = 'textLeft',
}: PaletteProps) {

  // 3. DÜZÜLÜŞƏ GÖRƏ LAZIM OLAN CLASS TƏYİN EDİLİR
  const sectionClassName = `${styles.paletteMain} ${layout === 'textRight' ? styles.reversed : ''}`;

  return (
    // VƏ BURADA İSTİFADƏ EDİLİR
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
          style={{
            backgroundImage: `url("${imageUrl}")`,
            ...imagePosition,
          }}
        ></div>
      </div>
    </section>
  );
}