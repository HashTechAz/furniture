import React from "react";
import Hero from "@/components/Hero/Hero";
import MiddleBanner from "@/components/MiddleBanner/MiddleBanner";
import Related from "../sustainability/components/Related/Related";
import PaletteLeftImage from "@/components/Palette/PaletteLeftImage/PaletteLeftImage";
import PaletteRightImage from "@/components/Palette/PaletteRightImage/PaletteRightImage";

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


const bannerNewDataDefault = {
  largeImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/panton-x-montana/montana_pantonova_1xconcave_1xconvex_leatherbrandy_cushion_pantonwire_black_h.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/designer-portraits/jakob_wagner_01.jpg?mode=crop&width=1520&height=2027",
  title: "Verner Panton",
  description: "Verner Panton is considered one of Denmark's most influential 20th-century furniture and interior designers, not to mention one of the most avant-gardes. During his career, he created innovative and futuristic designs in a variety of materials and in vibrant, exotic colours.",
  buttonText: "Explore Now",
  buttonLink: "#",
};

const lastBannerData = {
  largeImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/paradigm/montana_home_25_26_paradigmsofa_hero2_pantonwire_kevilounge_h.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/designer-portraits/montana_erik_rasmussen_portrait_h.jpg?mode=crop&width=1520&height=2027",
  title: "Erik Rasmussen",
  description: "Rasmussen’s designs are sculptural and minimalist, with a strong sense of form and materiality. With a background in both architecture and graphic design, he approached each project with a sharp eye for composition and space. His work reflects a timeless Scandinavian sensibility.",
  buttonText: "Explore Now",
  buttonLink: "#",
};




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
      <PaletteLeftImage
        title='Peter Amvar Aliyev'
        description='Back in 1982, Peter J. Lassen founded the family company, Montana Furniture. Montana is based on Lassen’s philosophy; that every one of us has a need for freedom to create our own personal spaces. Hence, the now well-known “Making room for personality” became the natural slogan for the new box of freedom.'
        buttonText='Read more about Amvar Aliyev'
        buttonLink='/collections/summer'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/designer-portraits/peter_joakim_lassen_montana_2018_2bw.jpg?mode=crop&width=540&height=720'
        backgroundColor='#2C3587'
      />
      <MiddleBanner {...bannerDataDefault} smallImageHeight="550px" />
      <PaletteRightImage
        title='Margrethe Odgaard'
        description="Margrethe Odgaard graduated in 2005 from The Royal Danish Academy of Fine Arts, School of Design in Copenhagen and also studied at The Rhode Island School of Design in the US. In 2016 she won the prestigious Torsten and Wanja Söderberg Prize for her colour and textile work.

In the summer of 2019, Montana launched a brand new colour palette developed in collaboration with colour expert Margrethe Odgaard. "
        buttonText='Explore now'
        buttonLink='/news/palette-refresh'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/designer-portraits/montana_margretheodgaard_newcolours2019_02_s.jpg?mode=crop&width=540&height=720'
        backgroundColor='#2C3587'
      />
      <MiddleBanner {...secondBannerData} smallImageHeight="550px" />
      <PaletteRightImage
        title='Erik Magnussen'
        description="Erik Magnussen graduated as a ceramicist in 1960 and started working for highly esteemed Bing & Grøndahl as an industrial designer. Since the late 1970s, Magnussen has been synonymous with the Stelton thermos. A key theme of Erik Magnussen’s work is simplicity – nothing is superfluous."
        buttonText='Explore now'
        buttonLink='/news/palette-refresh'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/designer-portraits/erik-magnussen_bw-720x840.jpg?mode=crop&width=540&height=720'
        backgroundColor='#BDD2DA'
      />
      <MiddleBanner {...relatedBannerData} smallImageHeight="550px" />
      <PaletteRightImage
        title='Jørgen Rasmussen'
        description='Jørgen Rasmussen graduated from the Royal Danish Academy of Fine Arts in 1955 and in 1957, Jørgen and his twin brother, Ib, started their own studio with a focus on single-family houses.'
        buttonText='Discover Colour Classes here'
        buttonLink='/collections/summer'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/designer-portraits/montana_jorgenrasmussen_02_bw_s.jpg?mode=crop&width=640&height=640'
        backgroundColor='#EAEFD9'
        imageSize='custom'
      />
      <MiddleBanner {...bannerNewDataDefault} />
      <PaletteRightImage
        title='Kasper Mose'
        description='Kasper Mose is a Danish architect with 15 year’s experience from reputable Danish studios such as Arkitema and Friis & Moltke. He is best known for the iconic Moser Table.'
        buttonText='Discover Colour Classes here'
        buttonLink='/collections/summer'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/designer-portraits/montana_kasper_mose_mosertable_01_crpped_s.png?mode=crop&width=640&height=640'
        backgroundColor='#3D271F'
        imageSize='custom'
      />
      <MiddleBanner {...lastBannerData} smallImageHeight="550px" />
      <Related />
    </div>
  );
};

export default DesignersPage;
