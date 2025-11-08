import React from "react";
import styles from "./Size.module.css";
import ChooseSize from "./ChooseSize/ChooseSize";
import DetailSize from "./DetailSize/DetailSize";
import FavouriteColors from "./FavouriteColors/FavouriteColors";
import Image from "next/image"; 
const Size = () => {
  return (
    <>
      <section className={styles.size}>
        <div className={styles.sizeContent}>
          {[
            {
              img: "https://b2c.montana-episerver.com/globalassets/icons/montana-system/system_step1_size_ny.png?mode=crop&width=540&height=540",
              title: "Choose Size",
              text: "Choose between 36 basic modules in 4 depths.",
            },
            {
              img: "https://b2c.montana-episerver.com/globalassets/icons/montana-system/system_step2_customize.png?mode=crop&width=540&height=540",
              title: "Customize",
              text: "choose between components.",
            },
            {
              img: "https://b2c.montana-episerver.com/globalassets/icons/montana-system/system_step2_colour.png?mode=crop&width=540&height=540",
              title: "Colour",
              text: "Choose between 43 finishes.",
            },
          ].map((item, idx) => (
            <div className={styles.sizeItems} style={{position:"relative"}} key={idx}>
                <div style={{position:"relative", width:"100%", height:"250px" }}>
                   <Image  fill src={item.img} alt={item.title} />
                </div>
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>

      </section>

      <ChooseSize/>

      <DetailSize
        title="2. Decide on the details"
        description="Create your own personal look and choose from our vast catalogue of shelving, doors, drawers, trays and lighting. You must also decide whether your Montana design should be placed on a plinth, legs, castors or mounted on the wall."
        items={[
          {
            image: "https://b2c.montana-episerver.com/globalassets/icons/montana-system/system_suspension.png?mode=crop&width=540&height=540",
            title: "Suspended",
            text: "Open storage for display and daily use.",
          },
          {
            image: "https://b2c.montana-episerver.com/globalassets/icons/montana-system/system_legs.png?mode=crop&width=540&height=540",
            title: "Legs",
            text: "Keep belongings out of sight with classic doors.",
          },
          {
            image: "https://b2c.montana-episerver.com/globalassets/icons/montana-system/system_plinth.png?mode=crop&width=540&height=540",
            title: "Plinth",
            text: "Organise smaller items with various drawer options.",
          },
          {
            image: "https://b2c.montana-episerver.com/globalassets/icons/montana-system/system_castors.png?mode=crop&width=540&height=540",
            title: "Castors",
            text: "Choose plinths, legs, castors or wall mounting.",
          },

          {
            image: "https://b2c.montana-episerver.com/globalassets/icons/montana-system/system_doors_handles.png?mode=crop&width=540&height=540",
            title: "Doors with handles",
            text: "Open storage for display and daily use.",
          },
          {
            image: "https://b2c.montana-episerver.com/globalassets/icons/montana-system/system_doors_nohandles.png?mode=crop&width=540&height=540",
            title: "Doors with push",
            text: "Keep belongings out of sight with classic doors.",
          },
          {
            image: "https://b2c.montana-episerver.com/globalassets/icons/montana-system/system_glass_doors.png?mode=crop&width=540&height=540",
            title: "Glass doors",
            text: "Organise smaller items with various drawer options.",
          },
          {
            image: "https://b2c.montana-episerver.com/globalassets/icons/montana-system/system_glass_shelves.png?mode=crop&width=540&height=540",
            title: "Castors",
            text: "Choose plinths, legs, castors or wall mounting.",
          },

          {
            image: "https://b2c.montana-episerver.com/globalassets/icons/montana-system/system_drawers.png?mode=crop&width=540&height=540",
            title: "Drawers",
            text: "Open storage for display and daily use.",
          },
          {
            image: "https://b2c.montana-episerver.com/globalassets/icons/montana-system/system_square_trays.png?mode=crop&width=540&height=540",
            title: "Square trays",
            text: "Keep belongings out of sight with classic doors.",
          },
          {
            image: "https://b2c.montana-episerver.com/globalassets/icons/montana-system/system_trays.png?mode=crop&width=540&height=540",
            title: "Trays",
            text: "Organise smaller items with various drawer options.",
          },
          {
            image: "https://b2c.montana-episerver.com/globalassets/icons/montana-system/system_lighting.png?mode=crop&width=540&height=540",
            title: "Lighting",
            text: "Choose plinths, legs, castors or wall mounting.",
          },
        ]}
      />
 
      <FavouriteColors/>
    </>
  );
};

export default Size;
