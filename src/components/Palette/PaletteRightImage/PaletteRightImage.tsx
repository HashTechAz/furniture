import React from "react";
import styles from "./PaletteRightImage.module.css";

interface PaletteRightImageProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  backgroundColor: string;
}

const PaletteRightImage = ({
  title,
  description,
  buttonText,
  buttonLink,
  imageUrl,
  backgroundColor
}: PaletteRightImageProps) => {
  return (
    <>
      <section className={styles.paletteMain}>
        <div className={styles.paletteContainer}>
          <div className={styles.paletteTextBox}>
            <h2 className={styles.paletteTextBoxTitle}>{title}</h2>
            <p>{description}</p>
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
            >
              <div className={styles.paletteJpg}>
                <img src={imageUrl} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaletteRightImage;
