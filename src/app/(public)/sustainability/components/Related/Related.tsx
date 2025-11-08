import React from "react";
import styles from "./Related.module.css";
import Image from "next/image"; 
const Related = () => {
  const relatedItems = [
    {
      image:
        "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-home/2021/montana_home21_22_collect_rosehip_amber_w.jpg?mode=crop&width=640&height=460",
      title: "Materials and care",
      description:
        "Buy now and keep forever. Here are our guidelines on how to best maintain your new Montana product. ",
    },
    {
      image:
        "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-home/2023/location---radiohuset/montana_home_23_24_ruby_hokkaido_iris_cumin_02_w.jpg?mode=crop&width=640&height=460",
      title: "Environmental initiatives",
      description:
        "The Montana system is designed by founder Peter Lassen. The CEO of the company is the son of Peter Lassen, Joakim Lassen.",
    },
    {
      image:
        "https://b2c.montana-episerver.com/globalassets/inriver/product/001619/montana_display_campaign_asy1_camomile_w.jpg?mode=crop&width=640&height=460",
      title: "Colour Class",
      description:
        "Watch our video tutorials and find out more about how to assemble Montana Furniture modules and furniture. Watch video of your product line here.",
    },
  ];

  return (
    <>
      <section className={styles.related}>
        <h1>Related articles</h1>

        <div className={styles.relatedMain}>
          {relatedItems.map((item, index) => (
            <div className={styles.relatedItems} key={index}>
              <Image src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Related;
