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
          <h5>About Montana</h5>
          <ul>
            <li>
              <Link href="/">Customize your solution</Link>
            </li>
            <li>
              <Link href="/">41 colors & 2 veneers</Link>
            </li>
            <li>
              <Link href="/">Susainability</Link>
            </li>
            <li>
              <Link href="/">Designers</Link>
            </li>
          </ul>


          <h5>Product Series</h5>
          <ul>
            <li>
              <Link href="/">Montana Selection</Link>
            </li>
            <li>
              <Link href="/">Montana Mini</Link>
            </li>
            <li>
              <Link href="/">Montana Mega</Link>
            </li>
            <li>
              <Link href="/">Kevi Chairs</Link>
            </li>
            <li>
              <Link href="/">All product series</Link>
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
