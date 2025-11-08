import React from 'react';
import styles from './InspirationContent.module.css';
import Link from 'next/link';
import Image from 'next/image'; 
const SmallInspirationCard = ({ title, imageUrl }: { title: string, imageUrl: string }) => (
  <Link href="#" className={styles.smallCard}>
    <div className={styles.smallCardImageWrapper} style={{position:"relative"}}>
       <Image  fill src={imageUrl} alt={title} />
    </div>
    <span className={styles.smallCardTitle}>{title}</span>
  </Link>
);

const InspirationContent = () => {
  const smallCardsData = [
    { id: 1, title: "Living Rooms", imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-home/2023/studio/montana_home_23_24_a02_octave_ii_acacia_couple_iris_w.jpg?mode=crop&width=1520&height=1093" },
    { id: 2, title: "Bedrooms", imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-home/2020/montana_home20_21_bathroom_iris_look_mushroom_w.jpg?mode=crop&width=1520&height=1093" },
    { id: 3, title: "Dining", imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/studio/montana_home_23_24_c05_dream_acacia_clay_headboard_h.jpg?mode=crop&width=1520&height=1093" },
    { id: 4, title: "Home Office", imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-mini/ss25/montana_mini_kidsroom_flint_camomile_fennel_amber_ruby_rosehip_w.jpg?mode=crop&width=1520&height=1093" },
    { id: 5, title: "Hallway", imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-mini/ss25/montana_mini_kidsroom_flint_camomile_fennel_amber_ruby_rosehip_w.jpg?mode=crop&width=1520&height=1093" },
    { id: 6, title: "Kids' Rooms", imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/location---radiohuset/montana_home_23_24_jwtable_kevi2060_oyster_h.jpg?mode=crop&width=1520&height=1093" },
    { id: 7, title: "Bathroom", imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-home/2023/studio/montana_home_23_24_c04_coat_clay_detail_01_w.jpg?mode=crop&width=1520&height=1093" },
    { id: 8, title: "Kitchen", imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/location---radiohuset/montana_home_23_24_jwtable_kevi2060_oyster_h.jpg?mode=crop&width=1520&height=1093" },
    { id: 9, title: "Outdoor", imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/studio/montana_home_23_24_a03_ripple_cabinet_ii_acacia_01_h.jpg?mode=crop&width=1520&height=1093" },
  ];

  const newsLinks = [
    "KIMPOP Limited Editions",
    "Montana Mini – New colours",
    "Panton Wire – New colours and sizes",
    "Paradigm – The new language of lounge"
  ];

  return (
    <section className={styles.inspirationMain}>
      {/* Sol Menü */}
      <div className={styles.inspirationText}>
        <h5><Link href="/creative-minds">Creative Minds</Link></h5>
        <ul>
          <li><Link href="/creative-minds/faebrik">Faebrik</Link></li>
          <li><Link href="/creative-minds/lumikello">Lumikello</Link></li>
          <li><Link href="/creative-minds/swantje">Swantje Hinrichsen</Link></li>
          <li><Link href="/creative-minds/cathrine">Cathrine De Lichtenberg</Link></li>
          <li><Link href="/creative-minds/tekla">Tekla Evelina Severin</Link></li>
          <li><Link href="/creative-minds/celine">Céline Hallas</Link></li>
          <li><Link href="/creative-minds/sarah">Sarah Gottlieb</Link></li>
        </ul>
        <h5><Link href="/colours">Colour inspiration</Link></h5>
        <ul>
          <li><Link href="/colour-inspiration/colour-class">Color Connaisseur & Montana Furniture</Link></li>
          <li><Link href="/colour-inspiration/colours-of-comfort">Colours of comfort</Link></li>
          <li><Link href="/colours">Colours and surfaces</Link></li>
          <li><Link href="/colour-inspiration/inspiring-styles">Inspiring colour styles</Link></li>
        </ul>
        <h5><Link href="/inspiration/find-more-inspiration">Find more inspiration</Link></h5>
        <ul>
          <li><Link href="/inspiration/catalogues">Explore our catalogues</Link></li>
          <li><Link href="#">Follow us on Instagram</Link></li>
        </ul>
      </div>

        {/* Sağ İçerik Alanı */}
        <div className={styles.contentWrapper}>
        <div className={styles.smallCardsGrid}>
          {smallCardsData.map(card => (
            <SmallInspirationCard key={card.id} title={card.title} imageUrl={card.imageUrl} />
          ))}
        </div>

        {/* DEĞİŞİKLİK: Büyük kart yerine artık bu liste var */}
        <div className={styles.newsListWrapper}>
          <h5>News from Montana</h5>
            <ul>
                {newsLinks.map((link, index) => (
                    <li key={index}>
                        <Link href="#">{link}</Link>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </section>
  );
};

export default InspirationContent;