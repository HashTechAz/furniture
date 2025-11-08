import React from "react";
import styles from "./PaletteRightImage.module.css";
import Image from 'next/image'  
interface PaletteRightImageProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  backgroundColor: string;
  imageSize?: 'normal' | 'large' | 'custom';
}

const PaletteRightImage = ({
  title,
  description,
  buttonText,
  buttonLink,
  imageUrl,
  backgroundColor,
  imageSize = 'normal'
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
          {/* BU HİSSƏDƏ DƏYİŞİKLİK EDİLİB */}
          <div className={`${styles.paletteImgBox} ${imageSize === 'large' ? styles.largeImage : ''} ${imageSize === 'custom' ? styles.customImage : ''}`}>
            <div 
              className={styles.paletteOneColor}
              style={{ backgroundColor: backgroundColor }}
            >
              <div className={
                imageSize === 'large' ? styles.paletteJpgLarge : 
                imageSize === 'custom' ? styles.paletteJpgCustom : 
                styles.paletteJpg
              }>
                <Image src={imageUrl} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaletteRightImage;