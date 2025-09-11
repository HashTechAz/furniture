import React from 'react';
import styles from './CategoryCard.module.css';

// Komponentin qəbul etdiyi props-lar (artıq Link olmadığı üçün "id" yoxdur)
interface CategoryCardProps {
  imageUrl: string;
  label: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ imageUrl, label }) => {
  return (
    // Kartın ümumi konteyneri
    <div className={styles.slideContainer}>
      
      {/* Şəklin konteyneri. Hover effekti bu elementə tətbiq olunur. */}
      <div className={styles.slideItem}>
        
        {/* Standart <img> teqi. Şəkil burada göstərilir. */}
        <img 
          src={imageUrl} 
          alt={label} 
          className={styles.cardImage} 
        />
        
      </div>
      
      {/* Kartın altındakı məhsulun adı */}
      <p className={styles.slideCaption}>{label}</p>

    </div>
  );
};

export default CategoryCard;