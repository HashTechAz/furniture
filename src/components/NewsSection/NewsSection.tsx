import React from 'react';
import styles from "./NewsSection.module.css";
import NewsCard from "../NewsCard/NewsCard";


const newsData = [
  {
    id: 1,
    title: "The Montana News",
    description: "Breaking the rules with bold colours and uncompromising design Montana Furniture and KIMPOP are thrilled to introduce an exclusive collection, KIMPOP Limited Editions, that pushes the boundaries of traditional design.",
    image: "https://www.masaankara.com/wp-content/uploads/dresuar-ayna-modelleri-bursa-inegol-ARDIC_6406.webp"
  },
  {
    id: 2,
    title: "Refreshing the Palette",
    description: "Whether you’re looking to add warmth, make a bold statement, or create a subtle touch of elegance, the new colours empower you to design a space that feels uniquely yours.",
    image: "https://koctas-img.mncdn.com/mnpadding/600/600/ffffff/productimages/5000048827/5000048827_1_MC/8873340141618_1686556846393.jpg"
  },
  {
    id: 3,
    title: "The Montana News",
    description: "Breaking the rules with bold colours and uncompromising design Montana Furniture and KIMPOP are thrilled to introduce an exclusive collection, KIMPOP Limited Editions, that pushes the boundaries of traditional design.",
    image: "https://www.masaankara.com/wp-content/uploads/dresuar-ayna-modelleri-bursa-inegol-ARDIC_6406.webp"
  },
  {
    id: 4,
    title: "Refreshing the Palette",
    description: "Whether you’re looking to add warmth, make a bold statement, or create a subtle touch of elegance, the new colours empower you to design a space that feels uniquely yours.",
    image: "https://koctas-img.mncdn.com/mnpadding/600/600/ffffff/productimages/5000048827/5000048827_1_MC/8873340141618_1686556846393.jpg"
  },
];

const NewsSection = () => {
  return (
    <section className={styles.newsSection}>
      <div className={styles.newsHeader}>
        <h2 className={styles.newsTitle}>Current News</h2>
      </div>
      <div className={styles.newsGrid}>
        {newsData.map((newsItem) => (
          <NewsCard
            key={newsItem.id}
            imageSrc={newsItem.image}
            title={newsItem.title}
            description={newsItem.description}
          />
        ))}
      </div>
    </section>
  );
};

export default NewsSection;