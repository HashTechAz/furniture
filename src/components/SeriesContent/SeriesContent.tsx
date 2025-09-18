import React from "react";
import styles from "./SeriesContent.module.css";
import NavbarCategoryCard from "../NavbarMenuCards/NavbarCategoryCard";
import Link from "next/link";

const seriesCategories = [
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
  {
    id: 5,
    label: "Montana System",
    imageUrl:
      "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2025/location--creative-studio/montana_home_25_26_montanamega_pine_ruby_oregano_balsamic_hazelnut_h.jpg?mode=crop&width=1520&height=2027",
    href: "/system",
  },
  {
    id: 6,
    label: "Montana Selection",
    imageUrl:
      "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-mini/ss25/montana_mini_kidsroom_flint_camomile_fennel_amber_ruby_detail_h.jpg?mode=crop&width=1520&height=2027",
    href: "/selection",
  },
  {
    id: 7,
    label: "Montana Free",
    imageUrl:
      "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2021/montana_home21_22_bureau_flint_02_h.jpg?mode=crop&width=1520&height=2027",
    href: "/free",
  },
  {
    id: 8,
    label: "Pantonova",
    imageUrl:
      "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-tv--sound/2024/montana_tvsound_octave_v_ruby_h.jpg?mode=crop&width=1520&height=2027",
    href: "/pantonova",
  },
  {
    id: 9,
    label: "Pantonova",
    imageUrl:
      "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-mini/ss25/montana_mini_displayshelf_rosehip_flint_amber_ruby_clay_h.jpg?mode=crop&width=1520&height=2027",
    href: "/pantonova",
  },
  {
    id: 10,
    label: "Pantonova",
    imageUrl:
      "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/panton-x-montana/montana_pantonwire_2019_chrome_magazineshelf_h.jpg?mode=crop&width=1520&height=2027",
    href: "/pantonova",
  },
];

const SeriesContent = () => {
  return (
    <>
      <section className={styles.seriesCategoryMain}>
        <div className={styles.seriesCategoryText}>
          <h5>Learn more about</h5>
          <ul>
            <li>
              <Link href="/">Guarantees</Link>
            </li>
            <li>
              <Link href="/">Assembly guides</Link>
            </li>
            <li>
              <Link href="/">Materials and care</Link>
            </li>
            <li>
              <Link href="/">Retailers and showrooms</Link>
            </li>
          </ul>
        </div>
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
