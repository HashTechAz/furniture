import React from "react";
import styles from "./ProductsContent.module.css";
import NavbarCategoryCard from "../NavbarMenuCards/NavbarCategoryCard";
import Link from "next/link";

const productsCategories = [
  {
    id: 1,
    label: "Montana System",
    imageUrl:
      "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/montana_colourps_amber_camomile_rhubarb_flint_oat.jpg?mode=crop&width=1520&height=2027",
    href: "/system",
  },
  {
    id: 2,
    label: "Montana Selection",
    imageUrl:
      "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-accessories/montana_accessories_arrangetray_s_acacia_m_s_ruby_h.jpg?mode=crop&width=1520&height=2027",
    href: "/selection",
  },
  {
    id: 3,
    label: "Montana Free",
    imageUrl:
      "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2020/montana_home20_21_bathroom_iris_look_mushroom_detail_01_h.jpg?mode=crop&width=1520&height=2027",
    href: "/free",
  },
  {
    id: 4,
    label: "Pantonova",
    imageUrl:
      "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-free/montana_free_shelving_312000_fennel_chrome_h.jpg?mode=crop&width=1520&height=2027",
    href: "/pantonova",
  },
];

const ProductsContent = () => {
  return (
    <>
      <section className={styles.productsCategoryMain}>
        <div className={styles.productsCategoryText}>
          <h5>Products</h5>
          <ul>
            <li>
              <Link href="/">Montana System</Link>
            </li>
            <li>
              <Link href="/">Montana Selection</Link>
            </li>
          </ul>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.gridContainer}>
            {productsCategories.map((category) => (
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

export default ProductsContent;
