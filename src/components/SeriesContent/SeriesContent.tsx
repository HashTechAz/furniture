import React from 'react';
import styles from './SeriesContent.module.css'; 
import NavbarCategoryCard from '../NavbarMenuCards/NavbarCategoryCard';

const seriesCategories = [
  { id: 1, label: 'Montana System', imageUrl: 'https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/montana_colourps_amber_camomile_rhubarb_flint_oat.jpg?mode=crop&width=1520&height=2027', href: '/system' },
  { id: 2, label: 'Montana Selection', imageUrl: 'https://images.montanafurniture.com/width=400,height=400,quality=75/23380-8a-1.webp', href: '/selection' },
  { id: 3, label: 'Montana Free', imageUrl: 'https://images.montanafurniture.com/width=400,height=400,quality=75/23380-8a-1.webp', href: '/free' },
  { id: 4, label: 'Pantonova', imageUrl: 'https://images.montanafurniture.com/width=400,height=400,quality=75/23380-8a-1.webp', href: '/pantonova' },
  { id: 5, label: 'Montana System', imageUrl: 'https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/montana_colourps_amber_camomile_rhubarb_flint_oat.jpg?mode=crop&width=1520&height=2027', href: '/system' },
  { id: 6, label: 'Montana Selection', imageUrl: 'https://images.montanafurniture.com/width=400,height=400,quality=75/23380-8a-1.webp', href: '/selection' },
  { id: 7, label: 'Montana Free', imageUrl: 'https://images.montanafurniture.com/width=400,height=400,quality=75/23380-8a-1.webp', href: '/free' },
  { id: 8, label: 'Pantonova', imageUrl: 'https://images.montanafurniture.com/width=400,height=400,quality=75/23380-8a-1.webp', href: '/pantonova' },
];

const SeriesContent = () => {
  return (
    <>
     <section className={styles.seriesCategoryMain}>
      <div className={styles.seriesCategoryText}><h5>Lorem2</h5></div>
      <div className={styles.contentWrapper}>
      <div className={styles.gridContainer}>
        {seriesCategories.map((category) => (
          <NavbarCategoryCard
            key={category.id}
            href={category.href}
            label={category.label}
            imageUrl={category.imageUrl}
          />
        ))}
      </div>
    </div>
     </section>
    </>
  );
};

export default SeriesContent;