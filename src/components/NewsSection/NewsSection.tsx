import React from 'react';
import styles from "./NewsSection.module.css";
import NewsCard from "../NewsCard/NewsCard";


const newsData = [
  {
    id: 1,
    title: "The Montana News",
    description: "Breaking the rules with bold colours and uncompromising design Montana Furniture and KIMPOP are thrilled to introduce an exclusive collection, KIMPOP Limited Editions, that pushes the boundaries of traditional design.",
    image: "https://picsum.photos/id/11/600/400"
  },
  {
    id: 2,
    title: "Refreshing the Palette",
    description: "Whether you’re looking to add warmth, make a bold statement, or create a subtle touch of elegance, the new colours empower you to design a space that feels uniquely yours.",
    image: "https://picsum.photos/id/12/600/400"
  },
  {
    id: 3,
    title: "New Horizons",
    description: "Our new collection brings the perfect blend of modern design and timeless functionality to your living spaces.",
    image: "https://picsum.photos/id/13/600/400"
  },
  {
    id: 4,
    title: "Modular Freedom",
    description: "Discover our modular units that offer endless possibilities for customization, perfectly fitting any room or style.",
    image: "https://picsum.photos/id/14/600/400"
  }
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