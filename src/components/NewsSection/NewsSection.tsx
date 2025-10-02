import React from 'react';
import styles from "./NewsSection.module.css";
import NewsCard from "../NewsCard/NewsCard";

interface NewsSectionProps {
  limit?: number;
  showTitle?: boolean;
  customGridClass?: string;
}


const newsData = [
  {
    id: 1,
    title: "The Montana News",
    description: "Breaking the rules with bold colours and uncompromising design Montana Furniture and KIMPOP are thrilled to introduce an exclusive collection, KIMPOP Limited Editions, that pushes the boundaries of traditional design.",
    image: "https://www.masaankara.com/wp-content/uploads/dresuar-ayna-modelleri-bursa-inegol-ARDIC_6406.webp"
  },
  {
    id: 2,
    title: "Refreshing the Palette",
    description: "Whether you're looking to add warmth, make a bold statement, or create a subtle touch of elegance, the new colours empower you to design a space that feels uniquely yours.",
    image: "https://koctas-img.mncdn.com/mnpadding/600/600/ffffff/productimages/5000048827/5000048827_1_MC/8873340141618_1686556846393.jpg"
  },
  {
    id: 3,
    title: "New Collection Launch",
    description: "Discover our latest furniture collection featuring innovative designs and sustainable materials that bring style and functionality to your home.",
    image: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-mini/ss25/montana_mini_displayshelf_rosehip_flint_amber_ruby_clay_h.jpg?mode=crop&width=540&height=720"
  },
  {
    id: 4,
    title: "Designer Collaboration",
    description: "We're excited to announce our new collaboration with renowned designers bringing fresh perspectives to modern furniture design.",
    image: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/designer-portraits/montana_margretheodgaard_newcolours2019_01_s.jpg?mode=crop&width=640&height=640"
  },
  {
    id: 5,
    title: "Sustainability Focus",
    description: "Our commitment to environmental responsibility continues with new eco-friendly materials and sustainable production methods.",
    image: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-home/2023/location---radiohuset/montana_home_23_24_ruby_hokkaido_iris_cumin_detail_01_w.jpg?mode=crop&width=1080&height=776"
  },
  {
    id: 6,
    title: "Color Trends 2024",
    description: "Explore the latest color trends for 2024 and how to incorporate them into your interior design with Montana furniture.",
    image: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-02/Montana_Colour_Class_2_header_iris_2024.jpg?mode=crop&width=828&height=595"
  },
  {
    id: 7,
    title: "Workspace Solutions",
    description: "Transform your home office with our new workspace furniture collection designed for productivity and comfort.",
    image: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-office/2022/montana_office_canteen_breakoutarea_mosertable_kevi_12mmsystem_h_crop.jpg?mode=crop&width=828&height=595"
  },
  {
    id: 8,
    title: "Storage Innovation",
    description: "Discover our latest storage solutions that combine functionality with beautiful design to maximize your space.",
    image: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/studio/montana_home_23_24_a05_kevilounge_ara_azure_read_acacia_detail_h.jpg?mode=crop&width=828&height=1104"
  },
  {
    id: 9,
    title: "Modular Systems",
    description: "Learn about our modular furniture systems that adapt to your changing needs and lifestyle.",
    image: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/location---radiohuset/montana_home_23_24_ruby_hokkaido_iris_cumin_02_h.jpg?mode=crop&width=828&height=1104"
  },
  {
    id: 10,
    title: "Design Philosophy",
    description: "Understanding the principles behind Montana's design philosophy and how it shapes our furniture collections.",
    image: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/designer-portraits/montana_peter_joakim_lassen_01.jpg?mode=crop&width=828&height=595"
  },
  {
    id: 11,
    title: "Material Innovation",
    description: "Explore the advanced materials and techniques we use to create durable and beautiful furniture pieces.",
    image: "https://b2c.montana-episerver.com/globalassets/inriver/product/0e2060/montana_home_22_23_kevi_madsnoergaard_upholstery_pantontable_detail_01_h.jpg?mode=crop&width=540&height=720"
  },
  {
    id: 12,
    title: "Customer Stories",
    description: "Read inspiring stories from our customers who have transformed their spaces with Montana furniture.",
    image: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/panton-x-montana/montana_pantonova_1xconcave_1xconvex_leatherbrandy_cushion_pantonwire_black_h.jpg?mode=crop&width=1520&height=2027"
  },
  {
    id: 13,
    title: "Award Recognition",
    description: "Montana furniture receives international recognition for design excellence and innovation in furniture manufacturing.",
    image: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-home/2020/montana_home20_21_hilowtable_pantonone_hokkaido_monarch_whiteoak_vanilla_balsamic_02_w.jpg?mode=crop&width=1080&height=776"
  },
  {
    id: 14,
    title: "Future Vision",
    description: "A glimpse into the future of furniture design and how Montana is shaping the next generation of home furnishings.",
    image: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-accessories/montana_home_23_24_colourframemirror_rosehip_clay_iris_acacia_masala_h.jpg?mode=crop&width=540&height=720"
  }
];

const NewsSection = ({ limit, showTitle = true, customGridClass }: NewsSectionProps) => {
  const displayData = limit ? newsData.slice(0, limit) : newsData;
  
  return (
    <section className={styles.newsSection}>
      {showTitle && (
        <div className={styles.newsHeader}>
          <h2 className={styles.newsTitle}>Current News</h2>
        </div>
      )}
      <div className={customGridClass || styles.newsGrid}>
        {displayData.map((newsItem) => (
          <NewsCard
            key={newsItem.id}
            imageSrc={newsItem.image}
            title={newsItem.title}
            description={newsItem.description}
          />
        ))}
      </div>
    </section>
  );
};

export default NewsSection;