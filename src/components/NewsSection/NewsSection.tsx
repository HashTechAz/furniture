import React from 'react';
import styles from "./NewsSection.module.css";
import NewsCard from "../NewsCard/NewsCard";
import { BackendCollection } from "@/lib/collections";

interface NewsSectionProps {
  collections: BackendCollection[];
  limit?: number;
  showTitle?: boolean;
  customGridClass?: string;
}

const NewsSection = ({ collections, limit, showTitle = true, customGridClass }: NewsSectionProps) => {
  const displayData = limit && collections ? collections.slice(0, limit) : collections || [];
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7042";

  return (
    <section className={styles.newsSection}>
      {showTitle && (
        <div className={styles.newsHeader}>
          <h2 className={styles.newsTitle}>Collections</h2>
        </div>
      )}
      <div className={customGridClass || styles.newsGrid}>
        {displayData.map((collection) => (
          <NewsCard
            key={collection.id}
            imageSrc={
              collection.coverImageUrl
                ? collection.coverImageUrl.startsWith('http')
                  ? collection.coverImageUrl
                  : `${API_URL}${collection.coverImageUrl}`
                : '/images/placeholder.jpg'
            }
            title={collection.name}
            description={collection.description}
            href={`/product?collectionId=${collection.id}`}
          />
        ))}
      </div>
    </section>
  );
};

export default NewsSection;