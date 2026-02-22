import React from "react";
import styles from "./HomeVideo.module.css";
import Image from 'next/image'
interface HomeVideoProps {
  variant?: 'default' | 'mobile' | 'colours' | 'rightAligned';
  imageUrl?: string;
}
const HomeVideo = ({ variant = 'default', imageUrl }: HomeVideoProps) => {
  const containerClass = `${styles.videoMain} ${styles[variant] || ''}`;
  return (
    <>
      <section className={containerClass}>
        <div className={styles.videoContent} style={{ position: "relative" }}>
          {imageUrl && (
            <Image
              fill
              src={imageUrl}
              alt='Montana'
            />
          )}
        </div>
      </section>
    </>
  );
};
export default HomeVideo;