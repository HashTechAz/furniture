import React from "react";
import styles from "./HomeVideo.module.css";

const HomeVideo = () => {
  return (
    <>
      <section className={styles.videoMain}>
        <div className={styles.videoContent}>
        
          <img
            src='https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/fairs-and-showrooms/skindergade-showroom/montana_showroom_skindergade_09_w.jpg?mode=crop&width=1520&height=1093'
            alt='Montana'
          />
        </div>
      </section>
    </>
  );
};

export default HomeVideo;
