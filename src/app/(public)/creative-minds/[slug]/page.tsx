import React from "react";
import { notFound } from "next/navigation";
import { componentMap, ComponentName } from "@/component-map";
import pageStyles from "./page.module.css";
import middleBannerData from "@/mock/middle-banner/creative-minds-middle/index.json";



const lumikelloHeroProps = {
  title: "Inside the creative mind of",
  titleSpan: "Lumikello",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, velit saepe, est illo enim quo praesentium architecto soluta ducimus minima atque labore suscipit sit aperiam voluptates placeat vero ipsam? Unde libero facilis dolor reprehenderit laborum molestiae a accusantium impedit voluptas?",
  imageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/creative-minds/lumikello/portrat_l.jpg?mode=crop&width=828&height=828",
  imageAlt: "Lumikello Space",
  backgroundColor: "#EEE7E1", // Lumikello üçün fərqli rəng
  textColor: "#333",
  imageClassName: pageStyles.customHeroImage,
  heroClassName: pageStyles.customHeroLayout,
};



const lumikelloPaletteLeftProps = {
  title: "Eva advice – begin small and invest in help",
  description:
    "If you would like to approach colours like Eva, you should find inspiration for colour combinations in nature, books and your wardrobe. She advises you to find your own personal favourites instead of looking too much to magazines and trends. Begin with small adjustments like a new green cushion for your sofa and take your time to discover how that colour makes you feel.",
  buttonText: "Explore Colours",
  buttonLink: "/colours",
  imageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/lumikello/montana_lumikello02_p.jpg?mode=crop&width=540&height=720",
  backgroundColor: "#D9D5CF",
  imageSize: "normal",
};



const lumikelloGalleryProps = {
  layout: "reversed", // Şəkillərin sırasını tərs çevirir
  images: [
    // "Swantje" səhifəsi üçün xüsusi iki şəkil
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/lumikello/homestory8_p.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/lumikello/bluna_fresko_p.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string], // TypeScript-ə bunun iki elementli massiv olduğunu bildiririk
};

const swantjeHeroProps = {
  title: "Inside the creative minds of",
  titleSpan: "Swantje Hinrichsen",
  description:
    "Swantje Hinrichsen is an art director, graphic designer and colourist with a strong focus on creating colourful visual identities and interior design. Swantje lives with her partner in a subdivided house from 1930 in the German city of Münster. Read along for a peek inside the creative mind of Swantje Hinrichsen.", // Mətni dəyişə bilərsiniz
  imageUrl:
    "https://b2c.montana-episerver.com/globalassets/inriver/product/0hilow160c/portrait_swantje_s.jpg?mode=crop&width=828&height=828", // Şəkli dəyişin
  imageAlt: "Swantje Hinrichsen",
  backgroundColor: "#C9B176", // İstədiyiniz rəng
  textColor: "#333",
  imageClassName: pageStyles.customHeroImage, // Ümumi stili tətbiq edirik
  heroClassName: pageStyles.customHeroLayout, // Ümumi stili tətbiq edirik
};



const swantjeGalleryProps = {
  layout: "reversed", // Şəkillərin sırasını tərs çevirir
  images: [
    // "Swantje" səhifəsi üçün xüsusi iki şəkil
    "https://b2c.montana-episerver.com/globalassets/inriver/product/0hilow160c/kitchen_details_p.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/inriver/product/0hilow160c/kitchen_and_hallway_p.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string], // TypeScript-ə bunun iki elementli massiv olduğunu bildiririk
};

const swantjeGallery2Props = {
  layout: "reversed", // Şəkillərin sırasını tərs çevirir
  images: [
    // "Swantje" səhifəsi üçün xüsusi iki şəkil
    "https://b2c.montana-episerver.com/contentassets/1b51ede3ba094c9199f4de18e6d1958f/living_room_p.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/swantje/livingroom_2_p.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string], // TypeScript-ə bunun iki elementli massiv olduğunu bildiririk
};

const swantjeGallery3Props = {
  images: [
    // "Swantje" səhifəsi üçün xüsusi iki şəkil
    "https://b2c.montana-episerver.com/globalassets/inriver/product/0hilow160c/bedroom_1_p.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/inriver/product/0hilow160c/img_1698_p.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string], // TypeScript-ə bunun iki elementli massiv olduğunu bildiririk
};

const cathrineHeroProps = {
  title: "Inside the creative minds of",
  titleSpan: "Cathrine De Lichtenberg",
  description:
    "Housing consultant Cathrine de Lichtenberg lives with her husband Anders and their two daughters in an old, divided patrician villa from 1898 in Frederiksberg, Copenhagen. Read along for a peek inside the creative mind of Cathrine de Lichtenberg.", // Mətni dəyişin
  imageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36571.jpg?mode=crop&width=1080&height=776", // Şəkli dəyişin
  imageAlt: "Cathrine De Lichtenberg",
  backgroundColor: "#D0BAE2", // Header ilə eyni rəng (və ya istədiyiniz başqa rəng)
  textColor: "#333",
  heroClassName: pageStyles.customHeroLayout,
  imageClassName: pageStyles.customHeroImage,
  // Fikir verin: `imageClassName` və `heroClassName` proplarını vermirik, çünki standart Hero istəyirik.
};

const cathrineGalleryProps = {
  layout: "reversed", // Şəkillərin sırasını tərs çevirir
  images: [
    // "Swantje" səhifəsi üçün xüsusi iki şəkil
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg19728_final.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg19669_final.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string], // TypeScript-ə bunun iki elementli massiv olduğunu bildiririk
};

const cathrineGallery2Props = {
  images: [
    // "Swantje" səhifəsi üçün xüsusi iki şəkil
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36661.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg20061_final.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string], // TypeScript-ə bunun iki elementli massiv olduğunu bildiririk
};



const cathrineGallery3Props = {
  images: [
    // "Swantje" səhifəsi üçün xüsusi iki şəkil
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36482.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36548.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string], // TypeScript-ə bunun iki elementli massiv olduğunu bildiririk
};



const cathrineGallery4Props = {
  images: [
    // "Swantje" səhifəsi üçün xüsusi iki şəkil
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36718.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36703.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string], // TypeScript-ə bunun iki elementli massiv olduğunu bildiririk
};

const cathrinePaletteRightImageProps = {
  title: "Colour as therapy",
  description:
    "Colours to Cathrine are both a sort of therapy and sanctuary. Whenever she throws herself at a new decoration project in her home, she works with emotions and energies, and hardly ever have a plan to begin with. Go about it as Cathrine and build your own Montana composition in our vibrant colour palette.  ",
  buttonText: "Explore now",
  buttonLink: "/news/palette-refresh",
  imageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36571.jpg?mode=crop&width=540&height=720",
  backgroundColor: "#D0BAE2",
};

const teklaHeroProps = {
  title: "Inside the creative minds of",
  titleSpan: "Tekla Evelina Severin",
  description:
    "Tekla is a Stockholm-based colourist, designer, and photographer, famous for her bold and unconventional colour compositions.", // Mətni dəyişin
  imageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/tekla-x-montana/montana_home_23_24_tekla_severin_acacia_camomile_rosehip_ruby_02_h.jpg?mode=crop&width=828&height=828", // Şəkli dəyişin
  imageAlt: "Tekla Evelina Severin",
  backgroundColor: "#C9B176", // <-- Zəhmət olmasa, istədiyiniz rəngi deyin
  textColor: "#333",
  // "Lumikello" kimi kiçik şəkil düzülüşü üçün bu klasları tətbiq edirik
  imageClassName: pageStyles.customHeroImage,
  heroClassName: pageStyles.customHeroLayout,
};



const teklaPaletteRightImageProps = {
  title: "Cheerful colours",
  description:
    "Tekla describes herself as a bit too serious sometimes, and she is therefore always trying to make herself more eased, spontaneous and cheerful. Her work with colours, interior and imagery is definitely helping with this. Do you like Tekla's style? Find more inspiration on Instagram. Follow @teklan here.",
  buttonText: "Explore now",
  buttonLink: "/news/palette-refresh",
  imageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/tekla-x-montana/montana_home_23_24_tekla_evelina_severin_portrait_02_h.jpg?mode=crop&width=540&height=720",
  backgroundColor: "#DD7D74",
};

const teklaPalette2RightImageProps = {
  title: "Cheerful colours",
  description:
    "There are many great colour books to be inspired by. Tekla shot the cover and has several photos represented inside the book “Who’s afraid of pink, orange and green” by Irene Schampaert. Tekla’s latest purchase is “Palette Perfect” by Lauren Wager. The book offers a wide range of palettes, so you can easily find one to suit your style. Colours are always corresponding with their surroundings and creating a constant dialogue. Tekla advices you to think in different materials and textures to create a deeper dimension; glossy, matt, hairy, woven and transparency. Play around and don’t be afraid to try things out.",
  buttonText: "Explore now",
  buttonLink: "/news/palette-refresh",
  imageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/tekla/img_5587.jpg?mode=crop&width=540&height=720",
  backgroundColor: "#633730",
};

const teklaGalleryProps = {
  images: [
    // "Swantje" səhifəsi üçün xüsusi iki şəkil
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/tekla/montana_insidethecreative_mind_tekla_kevi.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/tekla/montana_insidethecreative_mind_tekla_mini.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string], // TypeScript-ə bunun iki elementli massiv olduğunu bildiririk
};

const celineHeroProps = {
  title: "Inside the creative minds of",
  titleSpan: "Céline Hallas",
  description:
    "Photographer and colour ambassador for Montana, Céline Hallas, lives with her husband Daniel, their two children Samuel and Sienna and their beloved dogs and hamster, Master Yoda, Ziggy Bob and Betty Boop. The family lives in an old, crooked apartment from 1840. Read along for a look inside the creative mind of Céline.", // Mətni dəyişin
  imageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/creative-minds/celine-hallas/celine-hallas.jpg?mode=crop&width=828&height=828", // Şəkli dəyişin
  imageAlt: "Céline Hallas",
  backgroundColor: "#2C3587",
  textColor: "#fff",
  imageClassName: pageStyles.customHeroImage,
  heroClassName: pageStyles.customHeroLayout,
};



const celinePaletteLeftImageProps = {
  title: "Colour as therapy",
  description:
    "Colours to Céline are both a sort of therapy and sanctuary. Whenever she throws herself at a new decoration project in her home, she works with emotions and energies, and hardly ever have a plan to begin with. Go about it as Céline and build your own Montana composition in our vibrant colour palette.  ",
  buttonText: "Explore now",
  buttonLink: "/news/palette-refresh",
  imageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/celine-hallas/celinehallasxmontana_color_05.jpg?mode=crop&width=540&height=720",
  backgroundColor: "#EAEFD9",
};

const celineGalleryProps = {
  images: [
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/celine-hallas/celinehallasxmontana_color_06.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/celine-hallas/celinehallasxmontana_2020_1_1.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string],
};

const celineGallery2Props = {
  images: [
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/celine-hallas/celinehallasxmontana_2019_10_3.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/celine-hallas/celinehallasxmontana_2019_11_1.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string],
};

const sarahHeroProps = {
  title: "Inside the creative minds of",
  titleSpan: "Sarah Gottlieb",
  description:
    "Designer Sarah Gottlieb lives in a city apartment in the vibrant Nørrebro neighborhood of Copenhagen, together with her husband and their three children. Read along for a sneak peek inside the creative mind of Sarah Gottlieb. Designer Sarah Gottlieb lives in a city apartment in the vibrant Nørrebro neighborhood of Copenhagen, together with her husband and", // Mətni dəyişin
  imageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/sarah-gottlieb/01_sarahgotlib_foto-credit-karen-rosetzsky.jpg?mode=crop&width=1080&height=776", // Şəkli dəyişin
  imageAlt: "Sarah Gottlieb",
  backgroundColor: "#EAEFD9",
  textColor: "#000",
};

const sarahPaletteRightImageProps = {
  title: "Colour as therapy",
  description:
    "What exactly are colours? They are a fundamental element in art and design, capable of evoking a wide range of emotions. Together with Montana, Sarah Gottlieb will bring you insightful knowledge about colours in a series of podcast episodes throughout the year. In each episode of The Sound of Colour, host Gottlieb meets with designers, and through their conversations, you will hear about the significance and psychology of colours.",
  buttonText: "Explore now",
  buttonLink: "/news/palette-refresh",
  imageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/the-sound-of-colour/soc_3000x3000px_apple_2.jpg?mode=crop&width=640&height=640",
  backgroundColor: "#EAEFD9",
  imageSize: "custom",
};

interface PageComponent {
  component: string;
  props: Record<string, unknown>;
}

interface PageData {
  components: PageComponent[];
}

const mindsPageData: Record<string, PageData> = {
  faebrik: {
    components: [
      {
        component: "Hero",
        props: {
          title: "Inside the creative minds of",
          titleSpan: "Fæbrik",
          description:
            "The Norwegian sewing collective Fæbrik, has quickly become a go-to source of inspiration for creative DIY’ers all over the World. Their mission is to make it easier and more fun creating your own clothes from recycled fabrics as well as repairing and renewing old garments – while fostering a more sustainable approach to fashion.",
          imageUrl:
            "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/creative-minds/fabrik/montana_fabrik_portrait_01_w.jpg?mode=crop&width=1080&height=776",
          imageAlt: "Faebrik Team",
          backgroundColor: "#5F90CA",
          textColor: "#000",
        },
      },
      {
        component: "MiddleBanner",
        props: middleBannerData.firstFabrikBanner, // Yuxarıda yaratdığımız obyekti ötürürük
      },
      {
        component: "HomeVideo",
        props: {
          variant: "rightAligned", // Komponenti sağa yaslamaq üçün
          imageUrl:
            "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/creative-minds/fabrik/montana_fabrik_portrait_04_w.jpg?mode=crop&width=1520&height=1093",
        },
      },
      {
        component: "Companies",
        props: {}, // Bu komponentin xüsusi propsu yoxdur
      },
      {
        component: "MiddleBanner",
        props: middleBannerData.secondFabrikBanner, // Tərs çevrilmiş banner
      },
      {
        component: "HomeVideo",
        props: {
          variant: "rightAligned", // Komponenti sağa yaslamaq üçün
          imageUrl:
            "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/creative-minds/fabrik/montana_fabrik_portrait_04_w.jpg?mode=crop&width=1520&height=1093",
        },
      },
      {
        component: "Form",
        props: {},
      },
      {
        component: "Related",
        props: {}, // Bu komponentin xüsusi propsu yoxdur
      },
    ],
  },
  lumikello: {
    components: [
      { component: "Hero", props: lumikelloHeroProps },
      {
        component: "CenterInfoText",
        props: {
          title: "✨ Lumikello's Creative Journey ✨",
          description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At minus, nobis porro eius suscipit dolores provident, quam cum laborum sit, officiis odio possimus reprehenderit. Voluptas, rem fugit unde vitae odit voluptate eum accusamus repellendus rerum amet, cupiditate qui distinctio laboriosam!",
          secondParagraph: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum debitis, deleniti ipsam magnam dolor placeat doloremque at optio vitae incidunt.  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse nesciunt itaque quo aliquam quos distinctio eligendi necessitatibus doloribus vero cumque explicabo laudantium nihil quasi facilis, saepe veniam facere ad veritatis! Dignissimos dicta similique ullam libero ducimus voluptate iusto a assumenda consectetur ea quam, nesciunt aut, eligendi asperiores! Temporibus, officia illum."
        }
      },
      { component: "MiddleBanner", props: middleBannerData.lumikelloBanner1Props },
      { component: "SustainabilityGallery", props: lumikelloGalleryProps },
      {
        component: "HomeVideo",
        props: {
          imageUrl:
            "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/creative-minds/lumikello/homestory7_s.jpg?mode=crop&width=1520&height=1093",
        },
      },
      {
        component: "Companies",
        props: {
          title: "Eva's collaboration with Montana Furniture represents the perfect fusion of Scandinavian design principles she shows us that storage doesn't have to be hidden or purely functional – it can be a beautiful, integral part of our home's aesthetic.",
          author: "Eva Kaiser",
          authorTitle: "Creative Director"
        }
      },
      {
        component: "CenterInfoText",
        props: {
          title: "🎨 Eva's Design Philosophy 🎨",
          description: "Eva's design philosophy centers around the belief that your home should be a reflection of your personality and lifestyle. She encourages people to start small with color experiments, gradually building confidence in their design choices.",
          secondParagraph: "Her collaboration with Montana Furniture showcases how modular storage solutions can be both functional and beautiful. Eva proves that good design doesn't have to be expensive or complicated – it's about making thoughtful choices that enhance your daily life."
        }
      },
      { component: "FrameColors", props: {} },
      { component: "PaletteLeftImage", props: lumikelloPaletteLeftProps },
      { component: "MiddleBanner", props: middleBannerData.lumikelloBanner2Props },
      { component: "ProductNewsSlider", props: { titleTop: "" } },
      {
        component: "HomeVideo",
        props: {
          imageUrl:
            "https://themes.muffingroup.com/be/furniturestore/wp-content/uploads/2022/06/furniturestore-slider-pic1.webp",
        },
      },
      { component: "Form", props: {} },
      { component: "Related", props: {} },
    ],
  },
  swantje: {
    components: [
      { component: "Hero", props: swantjeHeroProps },
      { component: "CenterInfoText", props: {} },
      { component: "MiddleBanner", props: middleBannerData.swantjeHeroBanner1Props },
      { component: "SustainabilityGallery", props: swantjeGalleryProps },
      { component: "Companies", props: {} },
      { component: "CenterInfoText", props: {} },
      {
        component: "HomeVideo",
        props: {
          imageUrl:
            "https://b2c.montana-episerver.com/globalassets/inriver/product/0hilow160c/maw18456_l.jpg?mode=crop&width=1520&height=1093",
        },
      },
      { component: "SustainabilityGallery", props: swantjeGallery2Props },
      { component: "ProductNewsSlider", props: { titleTop: "" } },
      { component: "CenterInfoText", props: {} },
      { component: "FrameColors", props: {} },
      { component: "SustainabilityGallery", props: swantjeGallery3Props },
      { component: "Form", props: {} },
      { component: "Related", props: {} },
    ],
  },
  cathrine: {
    components: [
      { component: "Hero", props: cathrineHeroProps },
      { component: "CenterInfoText", props: {} },
      { component: "SustainabilityGallery", props: cathrineGalleryProps },
      { component: "Companies", props: {} },
      { component: "SustainabilityGallery", props: cathrineGallery2Props },
      { component: "CenterInfoText", props: {} },
      { component: "FrameColors", props: {} },
      { component: "MiddleBanner", props: middleBannerData.cathrineMiddleBanner1Props },
      { component: "CenterInfoText", props: {} },
      { component: "Companies", props: {} },
      { component: "SustainabilityGallery", props: cathrineGallery3Props },
      { component: "Companies", props: {} },
      { component: "MiddleBanner", props: middleBannerData.cathrineMiddleBanner2Props },
      { component: "SustainabilityGallery", props: cathrineGallery4Props },
      { component: "ProductNewsSlider", props: { titleTop: "" } },
      { component: "PaletteRightImage", props: cathrinePaletteRightImageProps },
      { component: "Form", props: {} },
      { component: "Related", props: {} },
    ],
  },
  tekla: {
    components: [
      { component: "Hero", props: teklaHeroProps },
      { component: "CenterInfoText", props: {} },
      { component: "Companies", props: {} },
      { component: "MiddleBanner", props: middleBannerData.teklaMiddleBanner1Props },
      { component: "PaletteRightImage", props: teklaPaletteRightImageProps },
      { component: "CenterInfoText", props: {} },
      { component: "FrameColors", props: {} },
      { component: "MiddleBanner", props: middleBannerData.teklaMiddleBanner1Props },
      { component: "ProductNewsSlider", props: { titleTop: "" } },
      { component: "PaletteRightImage", props: teklaPalette2RightImageProps },
      { component: "CenterInfoText", props: {} },
      { component: "Companies", props: {} },
      { component: "SustainabilityGallery", props: teklaGalleryProps },
      { component: "Form", props: {} },
      { component: "Related", props: {} },
    ],
  },
  celine: {
    components: [
      { component: "Hero", props: celineHeroProps },
      { component: "CenterInfoText", props: {} },
      { component: "MiddleBanner", props: middleBannerData.celineMiddleBanner1Props },
      { component: "Companies", props: {} },
      {
        component: "HomeVideo",
        props: {
          imageUrl:
            "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/creative-minds/ceciline-hallas/celinehallasxmontana_color_03.jpg?mode=crop&width=1520&height=10933",
        },
      },
      { component: "CenterInfoText", props: {} },
      { component: "Companies", props: {} },
      { component: "FrameColors", props: {} },
      { component: "CenterInfoText", props: {} },
      { component: "SustainabilityGallery", props: celineGalleryProps },
      { component: "ProductNewsSlider", props: { titleTop: "" } },
      { component: "PaletteLeftImage", props: celinePaletteLeftImageProps },
      { component: "SustainabilityGallery", props: celineGallery2Props },
      { component: "Form", props: {} },
      { component: "Related", props: {} },
    ],
  },
  sarah: {
    // YENİ SƏHİFƏ
    components: [
      { component: "Hero", props: sarahHeroProps },
      { component: "CenterInfoText", props: {} },
      { component: "AboutCompany", props: {} },
      { component: "MiddleBanner", props: middleBannerData.celineMiddleBanner1Props },
      { component: "CenterInfoText", props: {} },
      { component: "SustainabilityGallery", props: celineGalleryProps },
      { component: "PaletteRightImage", props: teklaPaletteRightImageProps },
      { component: "CenterInfoText", props: {} },
      { component: "FrameColors", props: {} },
      { component: "Companies", props: {} },
      { component: "SustainabilityGallery", props: cathrineGallery2Props },
      { component: "AboutCompany", props: {} },
      { component: "PaletteRightImage", props: teklaPaletteRightImageProps },
      { component: "ProductNewsSlider", props: { titleTop: "" } },
      { component: "PaletteRightImage", props: sarahPaletteRightImageProps },
      { component: "Related", props: {} },
    ],
  },
};

const getPageData = (slug: string) => {
  return mindsPageData[slug];
};

const CreativeMindDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const pageData = getPageData(slug);

  if (!pageData) {
    notFound();
  }

  return (
    <main>
      {pageData.components.map((block: PageComponent, index: number) => {
        const Component = componentMap[block.component as ComponentName];

        if (!Component) {
          console.error(
            `"${block.component}" adlı komponent "component-map.ts"-də tapılmadı.`
          );
          return null;
        }

        if (
          [
            "MiddleBanner",
            "CenterInfoText",
            "Companies",
            "HomeVideo",
            "PaletteLeftImage",
            "ProductSlider",
          ].includes(block.component)
        ) {


          return (
            <div key={index} className={pageStyles.bannerWrapper}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Component  {...(block.props as any)} />
            </div>
          );
        }

        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */ }
        return <Component key={index}  {...(block.props as any)} />;
      })}
    </main>
  );
};

export default CreativeMindDetailPage;
