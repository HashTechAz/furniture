import React from "react";
import { notFound } from "next/navigation";
import { componentMap, ComponentName } from "@/component-map";
import pageStyles from "./page.module.css";

const cathrinePaletteRightImageProps = {
  title: "Colour as therapy",
  description: "Colours to Cathrine are both a sort of therapy and sanctuary. Whenever she throws herself at a new decoration project in her home, she works with emotions and energies, and hardly ever have a plan to begin with. Go about it as Cathrine and build your own Montana composition in our vibrant colour palette.",
  buttonText: "Explore now",
  buttonLink: "/news/palette-refresh",
  imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36571.jpg?mode=crop&width=540&height=720",
  backgroundColor: "#C9B176",
};

const cathrinePalette2RightImageProps = {
  title: "Céline Hallas",
  description: "Photographer and Montana colour ambassador @celinehallas has a lifelong passion for colours. Her deep knowledge of colours and how to use them enables her to offer the best advice and inspiration through her pictures. In our digital concept, Colour Class, we've partnered with Color Connaisseur by Céline Hallas to empower you to confidently embrace and transform your interior spaces with the vibrant world of colours.",
  buttonText: "Explore Color Cannaisseur",
  buttonLink: "/news/palette-refresh",
  imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/creative-minds/celine-hallas/celine-hallas.jpg?mode=crop&width=540&height=720",
  backgroundColor: "#EFC7C7",
};

const inspirationPageData: any = {
  "colour-class": {
    components: [
      {
        component: "Hero",
        props: {
          title: "Colour Class",
          titleSpan: "Learn to embrace the world of colours",
          description:
            "Designer Sarah Gottlieb lives in a city apartment in the vibrant Nørrebro neighborhood of Copenhagen, together with her husband and their three children. Read along for a sneak peek inside the creative mind of Sarah Gottlieb. Designer Sarah Gottlieb lives in a city apartment in the vibrant Nørrebro neighborhood of Copenhagen, together with her husband and",
          imageUrl:
            "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/Colour_Class_header.jpg?mode=crop&width=1080&height=776",
          imageAlt: "Colour Class",
          backgroundColor: "#BDD2DA",
          textColor: "#000",
          imageClassName: pageStyles.customHeroImage,
          heroClassName: pageStyles.customHeroLayout,
        },
      },
      { component: "SystemAbout", props: {} },
      { 
        component: "CenterInfoText", 
        props: {
          title: "🎨 Master the Art of Color 🎨",
          description: "Welcome to Montana's exclusive Colour Class, where we transform your understanding of color from basic knowledge to professional expertise. This comprehensive program is designed for anyone who wants to create stunning, harmonious spaces that reflect their personal style and enhance their daily life.",
          secondParagraph: "Through our partnership with Color Connaisseur by Céline Hallas, you'll learn the psychology of color, discover how different hues affect mood and behavior, and master the techniques used by professional interior designers. From understanding color theory to creating mood boards, you'll gain the confidence to make bold color choices that truly transform your space."
        }
      },
      { component: "PaletteLeftImage", props: cathrinePaletteRightImageProps },
      { component: "ColourClassCard", props: {} },
      { component: "PaletteRightImage", props: cathrinePalette2RightImageProps },
      {component: 'Form', props: {}},
      
    ],
  },
  "colours-of-comfort": {
    components: [
      {
        component: 'SystemHero',
        props: {
          title: 'Colours of comfort - A new palette for serene spaces',
          backgroundColor: '#EFC7C7',
          color: '#000',
        }
      },
      { 
        component: "Companies", 
        props: {
          title: "The psychology of color in interior design goes far beyond mere aesthetics – curated comfort color palette draws inspiration from nature's most soothing elements, from the gentle warmth of morning sunlight to the calming depths of forest greens and ocean blues. These colors aren't just beautiful to look at; they're scientifically proven to reduce stress, promote relaxation, and create a sense of security and peace in your home environment.",
          author: "Céline Hallas",
          authorTitle: "Color Ambassador & Photographer"
        }
      },
      {
        component: "HomeVideo",
        props: {
          imageUrl:
            "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/creative-minds/ceciline-hallas/celinehallasxmontana_color_03.jpg?mode=crop&width=1520&height=10933",
        },
      },
        { 
          component: "CenterInfoText", 
          props: {
            title: "🌟 Creating Comfort Through Color 🌟",
            description: "Colors have the remarkable ability to transform not just our spaces, but our emotions and well-being. In our fast-paced world, creating a sanctuary at home has become more important than ever. The right color palette can instantly make a room feel warm and inviting, or cool and calming, depending on what you need most.",
            secondParagraph: "Our carefully curated collection of comfort colors draws inspiration from nature's most soothing palettes – from the soft blush of a sunset to the deep, grounding tones of earth and stone. These colors aren't just beautiful; they're scientifically proven to promote relaxation, reduce stress, and create a sense of security and peace in your home."
          }
        },
      { component: "FrameColors", props: {} },
      { component: "ComfortCard", props: {} },
       {component: "ProductSlider", props: {}}
    ],
  },
  'inspiring-styles': {
    components: [
      {
        component: 'Hero',
        props: {
          title: "Colour Class",
          titleSpan: "Learn to embrace the world of colours",
          description:
            "Designer Sarah Gottlieb lives in a city apartment in the vibrant Nørrebro neighborhood of Copenhagen, together with her husband and their three children. Read along for a sneak peek inside the creative mind of Sarah Gottlieb. Designer Sarah Gottlieb lives in a city apartment in the vibrant Nørrebro neighborhood of Copenhagen, together with her husband and",
          imageUrl:
            "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/colours/montana_colourps_amber_camomile_rhubarb_flint_oat_w.jpg?mode=crop&width=1080&height=776",
          imageAlt: "Colour Class",
          backgroundColor: "#EAEFD9",
          textColor: "#000",
        },
      },
      {component: "ColourClassCard", props: {allCardsData: []}}
    ]
  }
};

const getPageData = (slug: string) => {
  return inspirationPageData[slug];
};

const ColourInspirationPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const pageData = getPageData(slug);

  if (!pageData || !pageData.components) {
    notFound();
  }

  return (
    <main>
      {pageData.components.map((block: any, index: number) => {
        const Component = componentMap[block.component as ComponentName];

        if (!Component) {
          console.error(
            `"${block.component}" adlı komponent "component-map.ts"-də tapılmadı.`
          );
          return null;
        }

        if (
          [
            "CenterInfoText",
            "Companies",
            "HomeVideo",
            "Related",
            "ColourClassCard",
          ].includes(block.component)
        ) {
          return (
            <div key={index} className={pageStyles.bannerWrapper}>
              <Component {...block.props} />
            </div>
          );
        }

        return <Component key={index} {...block.props} />;
      })}
    </main>
  );
};

export default ColourInspirationPage;
