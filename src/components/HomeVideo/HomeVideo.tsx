import React from "react";
import styles from "./HomeVideo.module.css";
import Image from 'next/image'  
interface HomeVideoProps {
  variant?: 'default' | 'mobile' | 'colours' | 'rightAligned'; // YENİ VARIANTI ƏLAVƏ ET
  imageUrl?: string;
}

const HomeVideo = ({ variant = 'default', imageUrl }: HomeVideoProps) => {
  const containerClass = `${styles.videoMain} ${styles[variant] || ''}`;

  return (
    <>
      <section className={containerClass}>
        <div className={styles.videoContent} style={{position:"relative"}}>
          <Image
            fill
            src={imageUrl || 'https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/fairs-and-showrooms/skindergade-showroom/montana_showroom_skindergade_09_w.jpg?mode=crop&width=1520&height=1093'}
            alt='Montana'
          />
        </div>
      </section>
    </>
  );
};

export default HomeVideo;