import React from "react";
import styles from "./MiddleBanner.module.css";
import Image from 'next/image'  
interface MiddleBannerProps {
  largeImageUrl: string;
  smallImageUrl: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  layout?: 'imageLeft' | 'imageRight';
  smallImageHeight?: string;
}

const MiddleBanner = ({
  largeImageUrl,
  smallImageUrl,
  title,
  description,
  buttonText,
  buttonLink,
  layout = 'imageLeft',
  smallImageHeight,
}: MiddleBannerProps) => {

  const LargeImageBlock = (
    <div className={styles.leftBanner} style={{position:"relative"}}>
       <Image  fill src={largeImageUrl} alt={title} />
    </div>
  );

  const TextAndSmallImageBlock = (
    <div className={styles.rightBanner}>
      <div className={styles.rightImgContainer} style={{ height: smallImageHeight, position:"relative"   }}>
         <Image  fill src={smallImageUrl} alt={title} className={styles.rightImg} />
      </div>
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
  );
};

export default MiddleBanner;
