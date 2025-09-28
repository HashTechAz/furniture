import React from "react";
import Hero from "@/components/Hero/Hero";
import Palette from "@/components/Palette/Palette";
import MiddleBanner from "@/components/MiddleBanner/MiddleBanner";
import Related from "../sustainability/components/Related/Related";

// Designers sayfası için banner verisi
const bannerDataDefault = {
  largeImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/panton-x-montana/montana_pantonova_1xconcave_1xconvex_leatherbrandy_cushion_pantonwire_black_h.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/designer-portraits/montana_verner_panton.jpg?mode=crop&width=1520&height=1520",
  title: "Verner Panton",
  description: "Verner Panton is considered one of Denmark's most influential 20th-century furniture and interior designers, not to mention one of the most avant-gardes. During his career, he created innovative and futuristic designs in a variety of materials and in vibrant, exotic colours.",
  buttonText: "Explore Now",
  buttonLink: "#",
};

// İkinci MiddleBanner için veri
const secondBannerData = {
  largeImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-joint/montana_joint_chair_1211_yellowstone.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/designer-portraits/screenshot_50-1-720x840.png?mode=crop&width=1520&height=1520",
  title: "Anders Hermansen",
  description: "Margrethe Odgaard graduated in 2005 from The Royal Danish Academy of Fine Arts, School of Design in Copenhagen and also studied at The Rhode Island School of Design in the US. In 2016 she won the prestigious Torsten and Wanja Söderberg Prize for her colour and textile work.",
  buttonText: "Learn more",
  buttonLink: "/designers",
};

// Designers sayfası için sustainability palette verisi
const designersPaletteData = {
  category: "Designers",
  title: "Margrethe Odgaard",
  description: "Margrethe Odgaard graduated in 2005 from The Royal Danish Academy of Fine Arts, School of Design in Copenhagen and also studied at The Rhode Island School of Design in the US. In 2016 she won the prestigious Torsten and Wanja Söderberg Prize for her colour and textile work.",
  buttonText: "Learn more",
  buttonLink: "/designers",
  imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/designer-portraits/montana_margretheodgaard_newcolours2019_02_s.jpg?mode=crop&width=540&height=720",
  backgroundColor: "#2C3587",
  imagePosition: {
    width: "370px",
    height: "500px",
    top: "40px",
    left: "0px",
  },
  layout: "textLeft",
} as const;

const DesignersPage = () => {
  return (
    <div>
      <Hero
        title="The Designers"
        titleSpan="Meet the creative minds behind Montana"
        description="Discover the talented designers who have shaped Montana's iconic furniture collection. From the visionary founder Peter J. Lassen to contemporary collaborators like Margrethe Odgaard, each designer brings their unique perspective to create furniture that stands the test of time."
        imageUrl="https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-home/2020/montana_home20_21_hilowtable_pantonone_hokkaido_monarch_whiteoak_vanilla_balsamic_02_w.jpg?mode=crop&width=1080&height=776"
        imageAlt="Montana Designers"
        backgroundColor="#275138"
        textColor="#ffffff"
      />
      <Palette
        category=""
        title="Peter Amvar Aliyev"
        description="Montana Furniture is a family-owned company, established in 1982, leading within storage and furniture for private homes and contemporary office spaces. The company is founded by Peter J. Lassen, who is also the designer of the Montana system."
        buttonText="Learn more"
        buttonLink="/design/balance"
        imageUrl="https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/designer-portraits/peter_joakim_lassen_montana_2018_2bw.jpg?mode=crop&width=540&height=720"
        backgroundColor="#2C3587"
        layout="textRight"
        variant="colorClass"
      />
      <MiddleBanner {...bannerDataDefault} />
      <Palette {...designersPaletteData} />
      <MiddleBanner {...secondBannerData} />
      <Related />
    </div>
  );
};

export default DesignersPage;
