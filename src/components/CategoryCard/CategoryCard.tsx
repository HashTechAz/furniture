import React from 'react';
import styles from './CategoryCard.module.css';
import systemStyles from '../ProductSlider/ProductSliderSystem.module.css';
import Image from 'next/image'; 
// Komponentin qəbul etdiyi props-lar (artıq Link olmadığı üçün "id" yoxdur)
interface CategoryCardProps {
  imageUrl: string;
  label: string;
  variant?: 'default' | 'system';
  size?: 'wide' | 'normal' | 'default';
}

const CategoryCard: React.FC<CategoryCardProps> = ({ imageUrl, label, variant = 'default', size = 'default' }) => {
  const currentStyles = variant === 'system' ? systemStyles : styles;
  
  // Size'a göre sınıf belirleme
  const getSizeClass = () => {
    if (variant === 'system') {
      if (size === 'wide') return `${currentStyles.slideItem} ${currentStyles.wide}`;
      if (size === 'normal') return `${currentStyles.slideItem} ${currentStyles.normal}`;
    }
    return currentStyles.slideItem;
  };
  
  return (
    // Kartın ümumi konteyneri
    <div className={currentStyles.slideContainer}>
      
      {/* Şəklin konteyneri. Hover effekti bu elementə tətbiq olunur. */}
      <div className={getSizeClass()}>
        
        {/* Standart <img> teqi. Şəkil burada göstərilir. */}
        <Image 
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