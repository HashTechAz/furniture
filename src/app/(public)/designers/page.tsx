import React from "react";
import Hero from "@/components/Hero/Hero";
import MiddleBanner from "@/components/MiddleBanner/MiddleBanner";
import Related from "../sustainability/components/Related/Related";
import PaletteLeftImage from "@/components/Palette/PaletteLeftImage/PaletteLeftImage";
import PaletteRightImage from "@/components/Palette/PaletteRightImage/PaletteRightImage";

import designersBannerData from "@/mock/middle-banner/designers-middle/index.json";

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
      {/* @ts-ignore */}
      <MiddleBanner {...designersBannerData.designersPage[0].props} />
      <PaletteRightImage
        title='Margrethe Odgaard'
        description="Margrethe Odgaard graduated in 2005 from The Royal Danish Academy of Fine Arts, School of Design in Copenhagen and also studied at The Rhode Island School of Design in the US. In 2016 she won the prestigious Torsten and Wanja Söderberg Prize for her colour and textile work.

In the summer of 2019, Montana launched a brand new colour palette developed in collaboration with colour expert Margrethe Odgaard. "
        buttonText='Explore now'
        buttonLink='/news/palette-refresh'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/designer-portraits/montana_margretheodgaard_newcolours2019_02_s.jpg?mode=crop&width=540&height=720'
        backgroundColor='#2C3587'
      />
      {/* @ts-ignore */}
      <MiddleBanner {...designersBannerData.designersPage[1].props} />
      <PaletteRightImage
        title='Erik Magnussen'
        description="Erik Magnussen graduated as a ceramicist in 1960 and started working for highly esteemed Bing & Grøndahl as an industrial designer. Since the late 1970s, Magnussen has been synonymous with the Stelton thermos. A key theme of Erik Magnussen’s work is simplicity – nothing is superfluous."
        buttonText='Explore now'
        buttonLink='/news/palette-refresh'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/designer-portraits/erik-magnussen_bw-720x840.jpg?mode=crop&width=540&height=720'
        backgroundColor='#BDD2DA'
      />
      {/* @ts-ignore */}
      <MiddleBanner {...designersBannerData.designersPage[2].props} />
      <PaletteRightImage
        title='Jørgen Rasmussen'
        description='Jørgen Rasmussen graduated from the Royal Danish Academy of Fine Arts in 1955 and in 1957, Jørgen and his twin brother, Ib, started their own studio with a focus on single-family houses.'
        buttonText='Discover Colour Classes here'
        buttonLink='/collections/summer'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/designer-portraits/montana_jorgenrasmussen_02_bw_s.jpg?mode=crop&width=640&height=640'
        backgroundColor='#EAEFD9'
        imageSize='custom'
      />
      {/* @ts-ignore */}
      <MiddleBanner {...designersBannerData.designersPage[3].props} />
      <PaletteRightImage
        title='Kasper Mose'
        description='Kasper Mose is a Danish architect with 15 year’s experience from reputable Danish studios such as Arkitema and Friis & Moltke. He is best known for the iconic Moser Table.'
        buttonText='Discover Colour Classes here'
        buttonLink='/collections/summer'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/designer-portraits/montana_kasper_mose_mosertable_01_crpped_s.png?mode=crop&width=640&height=640'
        backgroundColor='#3D271F'
        imageSize='custom'
      />
      {/* @ts-ignore */}
      <MiddleBanner {...designersBannerData.designersPage[4].props} />
      <Related />
    </div>
  );
};

export default DesignersPage;
