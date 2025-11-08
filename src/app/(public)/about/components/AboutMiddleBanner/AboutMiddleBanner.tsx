import React from "react";
import styles from "./AboutMiddleBanner.module.css";
import Image from 'next/image'
interface AboutMiddleBannerProps {
  largeImageUrl: string;
  smallImageUrl: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  layout?: 'imageLeft' | 'imageRight';
}

const AboutMiddleBanner = ({
  largeImageUrl,
  smallImageUrl,
  title,
  description,
  buttonText,
  buttonLink,
  layout = 'imageLeft',
}: AboutMiddleBannerProps) => {

  const LargeImageBlock = (
    <div className={styles.leftBanner}>
      <Image src={largeImageUrl} alt={title} />
    </div>
  );

  const TextAndSmallImageBlock = (
    <div className={styles.rightBanner}>
      <div className={styles.rightImgContainer}>
        <Image src={smallImageUrl} alt={title} className={styles.rightImg} />
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

export default AboutMiddleBanner;