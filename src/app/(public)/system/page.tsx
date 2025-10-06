import React from "react";
import SystemHero from "./components/SystemHero/SystemHero";
import SystemAbout from "./components/SystemAbout/SystemAbout";
import Size from "./components/Size/Size";
import ProductSlider from "../../../components/ProductSlider/ProductSlider";
import SystemPalette from "../../../components/Palette/SystemPalette";
import PaletteLeftImage from "../../../components/Palette/PaletteLeftImage/PaletteLeftImage";

const thirdPaletteData = {
  category: "",
  title: "Creating good design demands honesty and respect",
  description:
    "Montana Furniture is a family-owned company, established in 1982, leading within storage and furniture for private homes and contemporary office spaces. The company is founded by Peter J. Lassen, who is also the designer of the Montana system.",
  description2:
    "All Montana modules are designed, developed and made in Denmark. Every day, in a small town on the island of Funen over 140 professionals work hard to uphold the highest standards of processing, painting and assembling – making sure that your Montana furniture will last a lifetime.",
  buttonText: "Learn more",
  buttonLink: "/design/balance",
  imageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/designer-portraits/montana_peter_joakim_lassen_01.jpg?mode=crop&width=828&height=595",
  backgroundColor: "#2C3587",
} as const;

const page = () => {
  return (
    <>
      <div
        id='header-trigger'
        style={{ height: 1, backgroundColor: "#2C3587" }}
      />
      <SystemHero title="Environment and quality — Montana's environmental certifications and initiatives" />
      <SystemAbout />
      <Size />
      <ProductSlider
        variant='system'
        titleTop='Montana System inspiration'
        titleBottom=''
      />
      <PaletteLeftImage
        title='Renew – your Montana'
        description='Do you feel like something new? Change a shelf, get a new back panel, switch the castors, revamp your modules with striking handles in a complementary colour or add a brand new set of colourful legs.

'
        buttonText='Discover Colour Classes here'
        buttonLink='/collections/summer'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/celine-hallas/celinehallasxmontana_color_05.jpg?mode=crop&width=580&height=400'
        backgroundColor='#B48451'
        imageSize='large'
      />
      <SystemPalette
        category=''
        title='System – customization options'
        description='Tailor your Montana system with these quick customizations and accessories.'
        features={[
          'Swap shelves and back panels',
          'Add coloured handles and legs',
          'Optional castors for mobility',
        ]}
        buttonText='Discover accessories'
        buttonLink='#'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/studio/montana_home_23_24_a05_kevilounge_ara_azure_read_acacia_detail_h.jpg?mode=crop&width=828&height=1104'
        backgroundColor='#E6E8EF'
        layout='textLeft' /* text left, image right */
        variant='default'
        imagePosition={{
          width: "370px",
          height: "500px",
          top: "40px",
          left: "0px",
        }}
      />
      <PaletteLeftImage
        title='Creating good design demands honesty and respect'
        description='Montana Furniture is a family-owned company, established in 1982, leading within storage and furniture for private homes and contemporary office spaces. The company is founded by Peter J. Lassen, who is also the designer of the Montana system.

All Montana modules are designed, developed and made in Denmark. Every day, in a small town on the island of Funen over 140 professionals work hard to uphold the highest standards of processing, painting and assembling – making sure that your Montana furniture will last a lifetime.'
        buttonText='Discover Colour Classes here'
        buttonLink='/collections/summer'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/designer-portraits/montana_peter_joakim_lassen_01.jpg?mode=crop&width=828&height=595'
        backgroundColor='#2C3587'
        imageSize='large'
      />
      <div style={{ marginBottom: '40px' }}>
        <ProductSlider
          titleTop='Montana System inspiration'
          titleBottom=''
        />
      </div>
    </>
  );
};

export default page;
