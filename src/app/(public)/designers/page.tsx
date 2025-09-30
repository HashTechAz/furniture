import React from "react";
import Hero from "@/components/Hero/Hero";
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
  description: "Anders Hermansen is a designer from the Royal Danish Academy of Fine Arts, mastering industrial design and furniture architecture. He graduated in 1982 at the age of only 22. As a recent graduate, he began working for Danish design companies such as Louis Poulsen, Paustian and Bang & Olufsen. Significant for Hermansen is his unique handmade wire sketch furniture.",
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

// Related componentinin üzeri için yeni palette verisi
const relatedDesignersPaletteData = {
  category: "Designers",
  title: "Erik Magnussen",
  description: "Erik Magnussen graduated as a ceramicist in 1960 and started working for highly esteemed Bing & Grøndahl as an industrial designer. Since the late 1970s, Magnussen has been synonymous with the Stelton thermos. A key theme of Erik Magnussen’s work is simplicity – nothing is superfluous.",
  buttonText: "Discover more",
  buttonLink: "/designers",
  imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/designer-portraits/erik-magnussen_bw-720x840.jpg?mode=crop&width=540&height=720",
  backgroundColor: "#BDD2DA",
  imagePosition: {
    width: "370px",
    height: "500px",
    top: "40px",
    left: "0px",
  },
  layout: "textLeft",
} as const;

// Related componentinin üzeri için yeni banner verisi
const relatedBannerData = {
  largeImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-szene/lundgaardtranbergarchitects_02-1920x1080.png?mode=crop&width=1520&height=2027",
  smallImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/designer-portraits/lundgaardtranbergarchitects_03-720x840.png?mode=crop&width=1520&height=1520",
  title: "Lundgaard & Tranberg",
  description: "Lundgaard & Tranberg Architects is a Danish architecture office founded in 1985 by architects Boje Lundgaard and Lene Tranberg. Lundgaard & Tranberg is renowned for their iconic buildings in Denmark, among others the Tietgen Dormitory, Axel Towers and theRoyal Danish Theatre’s Playhouse in Copenhagen.",
  buttonText: "Learn more",
  buttonLink: "/designers",
};

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
      <MiddleBanner {...bannerDataDefault} smallImageHeight="550px" />
      <MiddleBanner {...secondBannerData} smallImageHeight="550px" />
      <MiddleBanner {...relatedBannerData} smallImageHeight="550px" />
      <Related />
    </div>
  );
};

export default DesignersPage;
