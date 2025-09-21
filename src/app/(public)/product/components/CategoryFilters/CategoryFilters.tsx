import React from 'react';
import styles from './CategoryFilters.module.css';

const CategoryFilters = () => {
  const categories = [
    "All products",
    "Shelving systems",
    "Bookcases",
    "Sideboards",
    "TV units",
    "Wardrobes",
    "Tables",
    "Chairs"
  ];

  return (
    <div className={styles.filterContainer}>
      <ul className={styles.categoryList}>
        {categories.map((category, index) => (
          <li key={index}>
            <a href="#" className={index === 0 ? styles.active : ''}>
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilters;