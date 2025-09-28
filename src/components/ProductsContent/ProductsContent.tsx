import React from "react";
import styles from "./ProductsContent.module.css";
import NavbarCategoryCard from "../NavbarMenuCards/NavbarCategoryCard";
import Link from "next/link";

const ProductsContent = () => {
  // Resim olan kart için örnek veri
  const cardData = {
    id: 1,
    label: "Montana System",
    imageUrl:
      "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/montana_colourps_amber_camomile_rhubarb_flint_oat.jpg?mode=crop&width=1520&height=2027",
    href: "/system",
  };

  return (
    <>
      <section className={styles.productsCategoryMain}>
        <div className={styles.productsCategoryText}>
          <h5><Link href="/about">About Montana</Link></h5>
          <ul>
            <li><Link href="/system">Customize your solution</Link></li>
            <li><Link href="/colours">41 colors & 2 veneers</Link></li>
            <li><Link href="/sustainability">Susainability</Link></li>
            <li><Link href="/designers">Designers</Link></li>
          </ul>

          <h5>Product Series</h5>
          <ul>
            <li><Link href="/product">Montana Selection</Link></li>
            <li><Link href="/product">Montana Mini</Link></li>
            <li><Link href="/product">Montana Mega</Link></li>
            <li><Link href="/product">Kevi Chairs</Link></li>
            <li><Link href="/product">All product series</Link></li>
          </ul>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.gridContainer}>
            <div className={styles.gridItemMain}>
              <div className={styles.gridItemMainText}>
                <div className={styles.listsGrid}>
                  {[...Array(6)].map((_, index) => (
                    <ul key={index}>
                      <h5>Montana List</h5>
                      <li><Link href="/product">Montana Selection</Link></li>
                      <li><Link href="/product">Montana Mini</Link></li>
                      <li><Link href="/product">Montana Mega</Link></li>
                      <li><Link href="/product">Kevi Chairs</Link></li>
                      <li><Link href="/product">All product series</Link></li>
                    </ul>
                  ))}
                </div>
              </div>

              {/* Resim Bölümü (Sadece 1 kart) */}
              <div className={styles.gridItemMainImage}>
                <NavbarCategoryCard
                  href={cardData.href}
                  label={cardData.label}
                  imageUrl={cardData.imageUrl}
                />
              </div>
            </div>
            

          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsContent;