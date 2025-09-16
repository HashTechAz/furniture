import React from 'react';
import styles from './CategoryCard.module.css';
import systemStyles from '../ProductSlider/ProductSliderSystem.module.css';

// Komponentin qəbul etdiyi props-lar (artıq Link olmadığı üçün "id" yoxdur)
interface CategoryCardProps {
  imageUrl: string;
  label: string;
  variant?: 'default' | 'system';
}

const CategoryCard: React.FC<CategoryCardProps> = ({ imageUrl, label, variant = 'default' }) => {
  const currentStyles = variant === 'system' ? systemStyles : styles;
  return (
    // Kartın ümumi konteyneri
    <div className={currentStyles.slideContainer}>
      
      {/* Şəklin konteyneri. Hover effekti bu elementə tətbiq olunur. */}
      <div className={currentStyles.slideItem}>
        
        {/* Standart <img> teqi. Şəkil burada göstərilir. */}
        <img 
          src={imageUrl} 
          alt={label} 
          className={currentStyles.cardImage} 
        />
        
      </div>
      
      {/* Kartın altındakı məhsulun adı */}
      <p className={currentStyles.slideCaption}>{label}</p>

    </div>
  );
};

export default CategoryCard;