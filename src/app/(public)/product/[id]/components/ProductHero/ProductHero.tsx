'use client';

import React, { useState } from 'react';
import styles from './ProductHero.module.css';

// Product tipini daha sonra page.tsx'ten alabiliriz
interface Product {
  id: number;
  title: string;
  color: string;
  measurements: string;
  depth: string; // Derinlik için yeni bir alan
  position: string;
  description: string;
  price: string;
  images: string[];
  specifications: {
    material: string;
    finish: string;
    weight: string;
    designer: string;
  };
}

interface ProductHeroProps {
  product: Product;
}

// İkonlar için küçük bileşenler
const IconColor = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 21.9a3.9 3.9 0 003.9-3.9H8.1a3.9 3.9 0 003.9 3.9zM18 17H6v-2h12v2zm.9-4a4.9 4.9 0 00-4.9-4.9V2h-2v6.1a4.9 4.9 0 00-4.9 4.9H18.9z" stroke="currentColor" strokeWidth="1.5"/></svg>;
const IconPosition = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.5"/></svg>;
const IconDepth = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 12H2M12 2v20" stroke="currentColor" strokeWidth="1.5" transform="rotate(45 12 12)"/></svg>;
const IconGallery = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M21.5 15.5l-6-6-9 9" stroke="currentColor" strokeWidth="1.5"/></svg>;


const ProductDetailsHero = ({ product }: ProductHeroProps) => {
    const [activeTab, setActiveTab] = useState<'description' | 'specs'>('description');

  return (
    <section className={styles.hero}>
        {/* Sol Detay Sidebar'ı */}
        <div className={styles.detailsSidebar}>
            <div className={styles.detailItem}>
                <IconColor />
                <span>Colour: {product.color}</span>
            </div>
            <div className={styles.detailItem}>
                <IconPosition />
                <span>Position: {product.position}</span>
            </div>
            <div className={styles.detailItem}>
                <IconDepth />
                <span>Depth: {product.depth}</span>
            </div>
            <div className={styles.detailItem}>
                <IconGallery />
                <span>Gallery</span>
            </div>
            <span className={styles.scrollText}>SCROLL TO VIEW MORE</span>
        </div>

        {/* Orta Ürün Resmi */}
        <div className={styles.imageContainer}>
            <img src={product.images[0]} alt={product.title} className={styles.productImage} />
            <p className={styles.zoomText}>Tap here to zoom</p>
        </div>

        {/* Sağ Bilgi Alanı */}
        <div className={styles.infoContainer}>
            <h1 className={styles.title}>{product.title}</h1>
            
            <div className={styles.tabs}>
                <button 
                    className={activeTab === 'description' ? styles.activeTab : ''}
                    onClick={() => setActiveTab('description')}
                >
                    Description
                </button>
                <button 
                    className={activeTab === 'specs' ? styles.activeTab : ''}
                    onClick={() => setActiveTab('specs')}
                >
                    Specifications
                </button>
            </div>
            
            <div className={styles.tabContent}>
                {activeTab === 'description' ? (
                    <p>{product.description}</p>
                ) : (
                    <p>Material: {product.specifications.material}</p>
                )}
                <span>Designer: {product.specifications.designer}</span>
            </div>

            <div className={styles.links}>
                <a href="#">Read more</a>
                <a href="#">See downloads</a>
            </div>

            <button className={styles.findStoreButton}>Find store</button>

            <div className={styles.guarantees}>
                <span>10 year guarantee</span>
                <span>EU Ecolabel certified</span>
                <span>Danish production</span>
            </div>
        </div>
    </section>
  );
};

export default ProductDetailsHero;