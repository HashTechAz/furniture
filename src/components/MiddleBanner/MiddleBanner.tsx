import React from "react";
import styles from "./MiddleBanner.module.css";

interface MiddleBannerProps {
  largeImageUrl: string;
  smallImageUrl: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  layout?: 'imageLeft' | 'imageRight';
  // 1. ƏVVƏL UNUDULMUŞ PROPU BURA YENİDƏN ƏLAVƏ EDİRİK
  smallImageHeight?: string; 
  textBlockWidth?: string;
  reversedSmallImageHeight?: string; // Reversed layout için ayrı height
}

const MiddleBanner = ({
  largeImageUrl,
  smallImageUrl,
  title,
  description,
  buttonText,
  buttonLink,
  layout = 'imageLeft',
  smallImageHeight = '750px', 
  textBlockWidth = '30%',
  reversedSmallImageHeight = '500px', 
}: MiddleBannerProps) => {

  const LargeImageBlock = (
    <div 
      className={styles.leftBanner} 
      style={{ backgroundImage: `url("${largeImageUrl}")` }}
    ></div>
  );

  const TextAndSmallImageBlock = (
    <div className={styles.rightBanner}>
      <div 
        className={styles.rightImg}
        // 3. HÜNDÜRLÜYÜ STİLƏ YENİDƏN TƏTBİQ EDİRİK
        style={{ 
          backgroundImage: `url("${smallImageUrl}")`,
          height: layout === 'imageRight' ? reversedSmallImageHeight : smallImageHeight,
        }}
      ></div>
      <div className={styles.rightText}>
        <h1 className={styles.title}>{title}</h1>
        <p>{description}</p>
        <div>
          <a href={buttonLink} className={styles.heroButton}>
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className={`${styles.mBanner} ${layout === 'imageRight' ? styles.reversed : ''}`}>
        {layout === 'imageLeft' ? (
          <>
            {LargeImageBlock}
            {TextAndSmallImageBlock}
          </>
        ) : (
          <>
            {TextAndSmallImageBlock}
            {LargeImageBlock}
          </>
        )}
      </section>
    </>
  );
};

export default MiddleBanner;