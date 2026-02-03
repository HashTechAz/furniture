"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import styles from "./ProductsContent.module.css";
import NavbarCategoryCard from "../NavbarMenuCards/NavbarCategoryCard";

// API & Types
import { getCategories, Category } from "@/lib/categories";

const ProductsContent = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 🔥 QIFIL (Strict Mode Double Fetch-i əngəlləmək üçün)
  const dataFetchedRef = useRef(false);

  // API-dən Kateqoriyaları Çəkirik
  useEffect(() => {
    // Əgər artıq yükləyibsə, bir daha yükləməsin
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load product categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const promoCardData = {
    id: 1,
    label: "Montana System",
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/montana_colourps_amber_camomile_rhubarb_flint_oat.jpg?mode=crop&width=1520&height=2027",
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
            <li><Link href="/sustainability">Sustainability</Link></li>
            <li><Link href="/designers">Designers</Link></li>
          </ul>

          <h5><Link href="/productseries">Product Series</Link></h5>
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
                  
                  {isLoading ? (
                    <p style={{color: '#999'}}>Loading categories...</p>
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <ul key={category.id}>
                        <h5>
                          <Link href={`/product?CategoryId=${category.id}`}>
                            {category.name}
                          </Link>
                        </h5>

                        {category.subCategories && category.subCategories.length > 0 ? (
                          category.subCategories.map((sub) => (
                            <li key={sub.id}>
                              <Link href={`/product?CategoryId=${sub.id}`}>
                                {sub.name}
                              </Link>
                            </li>
                          ))
                        ) : (
                          <li>
                            <Link href={`/product?CategoryId=${category.id}`}>
                                View all {category.name}
                            </Link>
                          </li>
                        )}
                      </ul>
                    ))
                  ) : (
                    <p>No categories found.</p>
                  )}

                </div>
              </div>

              <div className={styles.gridItemMainImage}>
                <NavbarCategoryCard
                  href={promoCardData.href}
                  label={promoCardData.label}
                  imageUrl={promoCardData.imageUrl}
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