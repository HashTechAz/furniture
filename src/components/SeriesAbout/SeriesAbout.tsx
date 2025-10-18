import React from "react";
import styles from "./SeriesAbout.module.css";

const SeriesAbout = () => {
  return (
    <section className={styles.seriesAbout}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div 
            className={styles.cardImage}
            style={{
              backgroundImage: "url('https://media.istockphoto.com/id/1415799772/photo/home-interior-with-vintage-furniture.jpg?s=612x612&w=0&k=20&c=E5aUyAFo5_xjHcdk0nEZGVDipOkYEtyXQmJBskUbqo8=')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
          <div className={styles.cardContent}>
            <h3>Customer Support</h3>
            <p>We are ready to help private and professional customers with any questions about our products, assembly, or care instructions.</p>
          </div>
        </div>
        
        <div className={styles.card}>
          <div 
            className={styles.cardImage}
            style={{
              backgroundImage: "url('https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/studio/montana_home_23_24_a05_kevilounge_ara_azure_read_acacia_detail_h.jpg?mode=crop&width=600&height=500')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
          <div className={styles.cardContent}>
            <h3>Professional Services</h3>
            <p>Our team of experts provides specialized support for interior designers, architects, and commercial clients.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeriesAbout;
