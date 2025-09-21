import React from 'react';
import styles from './InspirationContent.module.css';
import Link from 'next/link';
import NavbarCategoryCard from '../NavbarMenuCards/NavbarCategoryCard'; // Mevcut kart bileşenini kullanıyoruz

// Küçük kart bileşeni güncellendi: Metin resmin altına gelecek şekilde düzenlendi.
const SmallInspirationCard = ({ title, imageUrl }: { title: string, imageUrl: string }) => (
  <Link href="#" className={styles.smallCard}>
    <div className={styles.smallCardImageWrapper}>
      <img src={imageUrl} alt={title} />
    </div>
    <span className={styles.smallCardTitle}>{title}</span>
  </Link>
);

const InspirationContent = () => {
  // Örnek veriler
  const mainCardData = {
    id: 1,
    label: "Creative Spaces",
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2025/location--creative-studio/montana_home_25_26_montanamega_pine_ruby_oregano_balsamic_hazelnut_h.jpg?mode=crop&width=1520&height=2027",
    href: "/inspiration/creative-spaces",
  };

  const smallCardsData = [
    { id: 1, title: "Living Rooms", imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-home/2023/studio/montana_home_23_24_a02_octave_ii_acacia_couple_iris_w.jpg?mode=crop&width=1520&height=1093" },
    { id: 2, title: "Bedrooms", imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/montana-home/2023/location---radiohuset/montana_home_23_24_keep_hokkaido_q.jpg?mode=crop&width=540&height=540" },
    { id: 3, title: "Dining", imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/montana-home/2023/location---copenhagen-flat/montana_home_23_24_pantonovaconcave_linear_boucle01_02_q.jpg?mode=crop&width=540&height=540" },
    { id: 4, title: "Home Office", imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/montana-home/2023/location---copenhagen-flat/montana_home_23_24_pantonone_flint_q.jpg?mode=crop&width=540&height=540" },
    { id: 5, title: "Hallway", imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/montana-home/2023/location---copenhagen-flat/montana_home_23_24_mirror_ruby_q.jpg?mode=crop&width=540&height=540" },
    { id: 6, title: "Kids' Rooms", imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/montana-mini/ss25/montana_mini_kidsroom_flint_camomile_fennel_amber_ruby_detail_q.jpg?mode=crop&width=540&height=540" },
    { id: 7, title: "Bathroom", imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/montana-home/2020/montana_home20_21_bathroom_iris_look_mushroom_detail_01_q.jpg?mode=crop&width=540&height=540" },
    { id: 8, title: "Kitchen", imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/montana-kitchen/montana_kitchen_2022_05_q.jpg?mode=crop&width=540&height=540" },
    { id: 9, title: "Outdoor", imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/panton-x-montana/pantonova/montana_pantonova_outdoor_2023_01_q.jpg?mode=crop&width=540&height=540" },
  ];

  return (
    <section className={styles.inspirationMain}>
      {/* Sol Menü */}
      <div className={styles.inspirationText}>
        <h5>Explore</h5>
        <ul>
          <li><Link href="#">Customer Stories</Link></li>
          <li><Link href="#">Design Guides</Link></li>
          <li><Link href="#">Colour Classes</Link></li>
        </ul>
        <h5>Styles</h5>
        <ul>
          <li><Link href="#">Minimalist</Link></li>
          <li><Link href="#">Maximalist</Link></li>
          <li><Link href="#">Colourful</Link></li>
          <li><Link href="#">Nordic</Link></li>
        </ul>
        <h5>Professionals</h5>
        <ul>
          <li><Link href="#">Case Studies</Link></li>
          <li><Link href="#">Downloads</Link></li>
          <li><Link href="#">Design Tools</Link></li>
        </ul>
      </div>

      {/* Sağ İçerik Alanı */}
      <div className={styles.contentWrapper}>
        {/* DEĞİŞİKLİK: Küçük kartlar sola alındı */}
        <div className={styles.smallCardsGrid}>
          {smallCardsData.map(card => (
            <SmallInspirationCard key={card.id} title={card.title} imageUrl={card.imageUrl} />
          ))}
        </div>

        {/* DEĞİŞİKLİK: Büyük kart sağa alındı */}
        <div className={styles.mainCardWrapper}>
            <NavbarCategoryCard
                href={mainCardData.href}
                label={mainCardData.label}
                imageUrl={mainCardData.imageUrl}
            />
        </div>
      </div>
    </section>
  );
};

export default InspirationContent;