import React from "react";
import styles from "./PaletteLeftImage.module.css";

interface PaletteLeftImageProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  backgroundColor: string;
  imageSize?: 'normal' | 'large';
}

const PaletteLeftImage = ({
  title,
  description,
  buttonText,
  buttonLink,
  imageUrl,
  backgroundColor,
  imageSize = 'normal'
}: PaletteLeftImageProps) => {
  return (
    <>
      <section className={styles.paletteMain}>
        <div className={styles.paletteContainer}>
          <div className={styles.paletteImgBox}>
            <div 
              className={styles.paletteOneColor}
              style={{ backgroundColor: backgroundColor }}
            >
              <div className={imageSize === 'large' ? styles.paletteJpgLarge : styles.paletteJpg}>
                <img src={imageUrl} alt="" />
              </div>
            </div>
          </div>

          <div className={styles.paletteTextBox}>
            <h2 className={styles.paletteTextBoxTitle}>{title}</h2>
            <p>{description}</p>
            <div>
              <a href={buttonLink} className={styles.heroButton}>
                {buttonText}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaletteLeftImage;
