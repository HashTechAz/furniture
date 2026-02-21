import React from "react";
import styles from "./CategoryCard.module.css";
import systemStyles from "../ProductSlider/ProductSliderSystem.module.css";
import Image from "next/image";

interface CategoryCardProps {
  imageUrl: string;
  label: string;
  variant?: "default" | "system";
  size?: "wide" | "normal" | "default";
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  imageUrl,
  label,
  variant = "default",
  size = "default",
}) => {
  const currentStyles = variant === "system" ? systemStyles : styles;

  const getSizeClass = () => {
    if (variant === "system") {
      if (size === "wide")
        return `${currentStyles.slideItem} ${currentStyles.wide}`;
      if (size === "normal")
        return `${currentStyles.slideItem} ${currentStyles.normal}`;
    }
    return currentStyles.slideItem;
  };

  return (
    <div className={currentStyles.slideContainer}>
      <div className={getSizeClass()} style={{ position: "relative" }}>
        <Image
          fill
          src={imageUrl}
          alt={label}
          className={currentStyles.cardImage}
          sizes='(max-width: 768px) 180px, (max-width: 1024px) 280px, 320px'
        />
      </div>

      <p className={currentStyles.slideCaption}>{label}</p>
    </div>
  );
};

export default CategoryCard;
