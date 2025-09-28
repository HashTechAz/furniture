import React from "react";
import styles from "./HomeVideo.module.css";

// Komponentə variant propu əlavə edirik
interface HomeVideoProps {
  variant?: 'default' | 'mobile';
  imageUrl?: string;
}

const HomeVideo = ({ variant = 'default', imageUrl }: HomeVideoProps) => {
  // className-i variant'a görə dinamik edirik
  const containerClass = `${styles.videoMain} ${variant === 'mobile' ? styles.mobileVariant : ''}`;

  return (
    <>
      <section className={containerClass}>
        <div className={styles.videoContent}>
          <img
            src={imageUrl || 'https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/fairs-and-showrooms/skindergade-showroom/montana_showroom_skindergade_09_w.jpg?mode=crop&width=1520&height=1093'}
            alt='Montana'
          />
        </div>
      </section>
    </>
  );
};

export default HomeVideo;
