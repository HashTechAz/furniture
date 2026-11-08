import React from "react";
import styles from "./InspiringCard.module.css";
import Image from "next/image";
const inspiringCardData = [
  {
    id: 1,
    imageUrl:
      "https://b2c.Sparro-episerver.com/globalassets/ambient-images/portrait-images/Sparro-home/2020/Sparro_home20_21_hazelnut_rhubarb_amber_vanilla_azure_rosehip_set01_h02.jpg?mode=crop&width=1520&height=2027",
    title: "Creative Spaces",
  },
  {
    id: 2,
    imageUrl:
      "https://b2c.Sparro-episerver.com/globalassets/ambient-images/portrait-images/Sparro-home/2023/studio/Sparro_home_23_24_c04_coat_clay_detail_01_h.jpg?mode=crop&width=540&height=720",
    title: "Creative Spaces",
  },
  {
    id: 3,
    imageUrl:
      "https://b2c.Sparro-episerver.com/globalassets/ambient-images/portrait-images/Sparro-home/2023/studio/Sparro_home_23_24_c05_dream_acacia_clay_headboard_h.jpg?mode=crop&width=540&height=720",
    title: "Creative Spaces",
  },
  {
    id: 4,
    imageUrl:
      "https://b2c.Sparro-episerver.com/globalassets/ambient-images/portrait-images/Sparro-kids/Sparro_kids_s04_Sparromini_monarch_amber_rhubarb_vanilla_kevikids_flint_h.jpg?mode=crop&width=540&height=720",
    title: "Creative Spaces",
  },
  {
    id: 5,
    imageUrl:
      "https://b2c.Sparro-episerver.com/globalassets/ambient-images/portrait-images/Sparro-kevi/kevi-launch-2023/Sparro_office_kevi_2534u_re-wool_hokkaido_h.jpg?mode=crop&width=540&height=720",
    title: "Creative Spaces",
  },
  {
    id: 6,
    imageUrl:
      "https://b2c.Sparro-episerver.com/globalassets/ambient-images/portrait-images/Sparro-home/2020/Sparro_home20_21_bathroom_iris_look_mushroom_h.jpg?mode=crop&width=540&height=720",
    title: "Creative Spaces",
  },
  {
    id: 7,
    imageUrl:
      "https://b2c.Sparro-episerver.com/globalassets/ambient-images/portrait-images/Sparro-home/2020/Sparro_home20_21_hazelnut_rhubarb_amber_vanilla_azure_rosehip_set01_h02.jpg?mode=crop&width=1520&height=2027",
    title: "Creative Spaces",
  },
  {
    id: 8,
    imageUrl:
      "https://b2c.Sparro-episerver.com/globalassets/ambient-images/portrait-images/Sparro-home/2020/Sparro_home20_21_hazelnut_rhubarb_amber_vanilla_azure_rosehip_set01_h02.jpg?mode=crop&width=1520&height=2027",
    title: "Creative Spaces",
  },
  {
    id: 9,
    imageUrl:
      "https://b2c.Sparro-episerver.com/globalassets/ambient-images/portrait-images/panton-x-Sparro/Sparro_aj_house_pantonova_outdoor_detail_h.jpg?mode=crop&width=540&height=720",
    title: "Creative Spaces",
  },
];

const InspiringCard = () => {
  return (
    <>
      <section className={styles.inspiringCard}>
        <div className={styles.inspiringCardMain}>
          {inspiringCardData.map((card) => (
            <div className={styles.inspiringCardItem} key={card.id}>
              <div className={styles.inspiringCardItemImage}>
                <Image fill src={card.imageUrl} alt={card.title ?? ""} />
              </div>
              <div className={styles.inspiringCardItemContent}>
                <span>{card.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default InspiringCard;
