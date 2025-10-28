import React from 'react';
import styles from "./NewsSection.module.css";
import NewsCard from "../NewsCard/NewsCard";
import newsData from "../../mock/newsData.json";

interface NewsSectionProps {
  limit?: number;
  showTitle?: boolean;
  customGridClass?: string;
}

const NewsSection = ({ limit, showTitle = true, customGridClass }: NewsSectionProps) => {
  const displayData = limit ? newsData.slice(0, limit) : newsData;
  
  return (
    <section className={styles.newsSection}>
      {showTitle && (
        <div className={styles.newsHeader}>
          <h2 className={styles.newsTitle}>Lorem Ipsum News</h2>
        </div>
      )}
      <div className={customGridClass || styles.newsGrid}>
        {displayData.map((newsItem) => (
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