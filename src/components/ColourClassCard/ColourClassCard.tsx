import React from 'react';
import styles from './ColourClassCard.module.css';

const allCardsData = [
  {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-01/Montana_Colour_Class_1_DREAM_amber_2024.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 1",
    description: "Colour Class is a unique digital concept.",
  },
  {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-02/Montana_Colour_Class_2_montanasystem_pine_iris_2024.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 2",
    description: "Learn how to use colours to reflect your personality.",
  },
  // ... digər 19 kart üçün məlumatları buraya əlavə edin
  // Nümunə üçün eyni məlumatları təkrarlayıram:
  {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-03/montana_colour_class_3_moser_detail_2024.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 3",
    description: "Colour Class is a unique digital concept.",
  },
  {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-05/Montana_Colour_Class_5_system_balsamic_2024.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 4",
    description: "Learn how to use colours to reflect your personality.",
  },
    {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-06/Montana_Colour_Class_6_livingroom_2024.jpg.jpg.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 5",
    description: "Colour Class is a unique digital concept.",
  },
  {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-07/Montana-Colour-Class-7-kitchen-2024.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 6",
    description: "Learn how to use colours to reflect your personality.",
  },
    {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-08/Montana-Colour-Class-8-free-masala-2024.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 7",
    description: "Colour Class is a unique digital concept.",
  },
  {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-09/Montana-Colour-Class-9-system-mist-2024.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 8",
    description: "Learn how to use colours to reflect your personality.",
  },
    {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-10/montana_colour_class_10_montana_system_oyster_masala.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 9",
    description: "Colour Class is a unique digital concept.",
  },
  {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-11/Montana-Colour-Class-11-system-iris-2024.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 10",
    description: "Learn how to use colours to reflect your personality.",
  },
    {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-12/montana_colour_class_12_montana_system_snow_white_oak.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 11",
    description: "Colour Class is a unique digital concept.",
  },
  {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-13/Montana-Colour-Class-13-nightstand-rosehip.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 12",
    description: "Learn how to use colours to reflect your personality.",
  },
    {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-14/montana_colour_class_14_kevi_2052_hokkaido.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 13",
    description: "Colour Class is a unique digital concept.",
  },
  {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-15/Montana-Colour-Class-15-system-masala.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 14",
    description: "Learn how to use colours to reflect your personality.",
  },
    {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-16/montana_colour_class_16_coloux_box_free_ruby.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 15",
    description: "Colour Class is a unique digital concept.",
  },
  {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-17/montana_colour_class_17_1.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 16",
    description: "Learn how to use colours to reflect your personality.",
  },
    {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-18/montana_colour_class_18_2_2025.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 17",
    description: "Colour Class is a unique digital concept.",
  },
  {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-12/montana_colour_class_12_montana_system_snow_white_oak.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 18",
    description: "Learn how to use colours to reflect your personality.",
  },
    {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-08/Montana-Colour-Class-8-free-masala-2024.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 19",
    description: "Colour Class is a unique digital concept.",
  },
  {
    imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-06/Montana_Colour_Class_6_livingroom_2024.jpg.jpg.jpg?mode=crop&width=640&height=640",
    title: "Colour Class 20",
    description: "Learn how to use colours to reflect your personality.",
  },
 
];

const ColourClassCard = () => {
  return (
    <div className={styles.cardSection}>
      <div className={styles.cardMain}>
        {allCardsData.map((card, index) => (
          <div className={styles.colourClassCard} key={index}>
            <div className={styles.colourClassCardImage}>
              <img src={card.imageUrl} alt={card.title} />
            </div>
            <div className={styles.colourClassCardTitle}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColourClassCard;