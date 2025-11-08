import React from "react";
import styles from "./ComfortCard.module.css";
import Image from 'next/image'
const comfortCardData = [
  {
    id: 1,
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/location---vega/montana_home_23_24_acacia_amber_camomile_mushroom_detail_01_h.jpg?mode=crop&width=540&height=720",
    title: "Acacia",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et sit ratione, saepe, porro quisquam quaerat mollitia illo magni vitae deserunt consectetur eligendi, molestiae sunt corporis?",
  },
  {
    id: 2,
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/studio/montana_home_23_24_c03_preppy_ruby_detail_h.jpg?mode=crop&width=540&height=720",
    title: "Ruby",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et sit ratione, saepe, porro quisquam quaerat mollitia illo magni vitae deserunt consectetur eligendi, molestiae sunt corporis?",
  },
  {
    id: 3,
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/studio/montana_home_23_24_c02_wardrobe_clay_pine_masala_mirror_pantononelounge_h.jpg?mode=crop&width=540&height=720",
    title: "Clay",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et sit ratione, saepe, porro quisquam quaerat mollitia illo magni vitae deserunt consectetur eligendi, molestiae sunt corporis?",
  },
];

const ComfortCard = () => {
  return (
    <>
      <section className={styles.comfortCard}>
        <div className={styles.comfortCardMain}>
          {comfortCardData.map((card) => (
            <div className={styles.comfortCardItem} key={card.id} style={{position:"relative"}}>
            <Image
                 fill
                src={card.imageUrl}
                alt={card.title}
            />
            <div className={styles.comfortCardItemContent}>
              <h3>{card.title}</h3>
              <p>
                {card.description}
              </p>
            </div>
          </div>
        ))}
        </div>
      </section>
    </>
  );
};

export default ComfortCard;
