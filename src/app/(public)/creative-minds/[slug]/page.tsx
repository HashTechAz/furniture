import React from "react";
import { notFound } from "next/navigation";
import { componentMap, ComponentName } from "@/component-map";
import pageStyles from "./page.module.css";

const firstFabrikBanner = {
  largeImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/fabrik/montana_fabrik_portrait_ingrid_01_h.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/creative-minds/fabrik/montana_fabrik_portrait_doghundre_01_w.jpg?mode=crop&width=1520&height=1093",
  title: "Ingrid's trolley",
  description:
    "Ingrid with her personalised trolley that - much like the office dog, Hundre - follows her around everywhere in the studio. This way she has her sewing gear at hand all day.",
  buttonText: "Daha Çox Kəşf Et",
  buttonLink: "/link-unvani",
  smallImageHeight: "550px",
};

const secondFabrikBanner = {
  largeImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/fabrik/montana_fabrik_portrait_jenny_01_h.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/creative-minds/fabrik/montana_fabrik_portrait_jenny_02_w.jpg?mode=crop&width=1520&height=1093",
  title: "Ingrid's trolley",
  description:
    "Ingrid with her personalised trolley that - much like the office dog, Hundre - follows her around everywhere in the studio. This way she has her sewing gear at hand all day.",
  buttonText: "Daha Çox Kəşf Et",
  buttonLink: "/link-unvani",
  smallImageHeight: "550px",
};

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

const lumikelloBanner1Props = {
  largeImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/lumikello/montana_march03.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/lumikello/montana_lumikello_april10_p.jpg?mode=crop&width=1520&height=2027",
  title: "KEEP dresser in the entrance hall",
  description:
    "The Montana KEEP dresser in Beetroot with Iris handles for scarves, keys and other belongings in Eva's entrance hall.",
  buttonText: "See the Details",
  buttonLink: "#",
  // "normal" ölçü üçün smallImageHeight propertisini vermirik
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

const lumikelloBanner2Props = {
  largeImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/lumikello/lumikello_montana_januar6_p.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/creative-minds/lumikello/lumikello_montana_januar2_s.jpg?mode=crop&width=1520&height=1520",
  title: "Harmony in Design",
  description:
    "Every piece is carefully selected to contribute to a cohesive and harmonious interior, balancing form and function.",
  buttonText: "Learn More",
  buttonLink: "#",
  layout: "imageRight", // Reverse banner
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

const swantjeHeroBanner1Props = {
  largeImageUrl:
    "https://b2c.montana-episerver.com/globalassets/inriver/product/0hilow160c/circus_hallway._p.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl:
    "https://b2c.montana-episerver.com/globalassets/inriver/product/0hilow160c/2020-11-23-13.36.08_l.jpg?mode=crop&width=1520&height=1093",
  title: "A happy entrance hall",
  description:
    "When visiting Swantje, you get welcomed by the CARRY dresser in the energetic colour Parsley. Right beside is a clothing rack in the bold colour Monarch creating an entrance hall with a playful atmosphere.",
  buttonText: "Shop the look Montana",
  buttonLink: "#",
  // "normal" ölçü üçün smallImageHeight propertisini vermirik
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

const cathrineMiddleBanner1Props = {
  largeImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg19859_final.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg19903_final_v2.jpg?mode=crop&width=1520&height=2027",
  title: "“The pink we’ve all dreamed about”",
  description:
    "The KEEP dresser is the perfect storage solution for the bedroom, living room, or hall. Cathrine has it in her bedroom in the soft pink shade, Ruby.",
  buttonText: "Explore dressers and drawers",
  buttonLink: "#",
};

const cathrineGallery3Props = {
  images: [
    // "Swantje" səhifəsi üçün xüsusi iki şəkil
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36482.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36548.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string], // TypeScript-ə bunun iki elementli massiv olduğunu bildiririk
};

const cathrineMiddleBanner2Props = {
  largeImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36363.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36356.jpg?mode=crop&width=1520&height=2027",
  title: "“Cathrine's customised wardrobe”",
  description:
    "Cathrine transformed a room into a stylish walk-in closet. Here, she has a custom Montana System wardrobe in deep green Pine. With drawers, open shelves, and glass shelves, it accommodates all her wardrobe favourites – from shoes to blouses and jewellery.",
  buttonText: "Explore dressers and drawers",
  buttonLink: "#",
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

const teklaMiddleBanner1Props = {
  largeImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/tekla/2_dsc3804-1-2.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/tekla/img_2124-2.jpg?mode=crop&width=1520&height=2027",
  title: "Bring joy to the room",
  description:
    "Tekla tries to decorate her home with colours as much as she can; walls, art, furniture, objects, flowers, rugs, clothing. All things are carefully selected and placed to bring joy to the room. Teklas latest addition to her kitchen is a new linoleum flooring in lilac, dark pistachio and cream yellow chess pattern. She simply placed the new floor over the original grey linoleum floor in case of the couple moving from the rental apartment. The Montana Mini modules in the colour Camomile bring rays of sunlight to Tekla's kitchen. Montana Mini is a series of uncomplicated, versatile storage modules. Available in three variants and only 10 colours, Montana Mini is the easier choice",
  buttonText: "Explore dressers and drawers",
  buttonLink: "#",
  smallImageHeight: "550px",
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

const celineMiddleBanner1Props = {
  largeImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/celine-hallas/celinehallasxmontana_color_02_2020-02-06t17-10-26_conflict.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/celine-hallas/celinehallasxmontana_2019_12_1.jpg?mode=crop&width=1520&height=2027",
  title: "Colour as therapy",
  description:
    "Recently, we painted the livingroom and kitchen in the same colour. We did that to create a coherent look. Our old apartment has a lot of beautifully detailed wood work, and we decided to paint it in a stronger colour to highlight it. The same colour is also used for the flooring in both rooms, creating a perfect canvas for bolder colours and eclectic interior",
  buttonText: "Explore now",
  buttonLink: "/news/palette-refresh",
  smallImageHeight: "550px",
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

const mindsPageData: any = {
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
        props: firstFabrikBanner, // Yuxarıda yaratdığımız obyekti ötürürük
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
        props: secondFabrikBanner, // Tərs çevrilmiş banner
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
      { component: "MiddleBanner", props: lumikelloBanner1Props },
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
      { component: "MiddleBanner", props: lumikelloBanner2Props },
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
      { component: "MiddleBanner", props: swantjeHeroBanner1Props },
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
      { component: "MiddleBanner", props: cathrineMiddleBanner1Props },
      { component: "CenterInfoText", props: {} },
      { component: "Companies", props: {} },
      { component: "SustainabilityGallery", props: cathrineGallery3Props },
      { component: "Companies", props: {} },
      { component: "MiddleBanner", props: cathrineMiddleBanner2Props },
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
      { component: "MiddleBanner", props: teklaMiddleBanner1Props },
      { component: "PaletteRightImage", props: teklaPaletteRightImageProps },
      { component: "CenterInfoText", props: {} },
      { component: "FrameColors", props: {} },
      { component: "MiddleBanner", props: teklaMiddleBanner1Props },
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
      { component: "MiddleBanner", props: celineMiddleBanner1Props },
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
      { component: "MiddleBanner", props: celineMiddleBanner1Props },
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
              <Component {...block.props} />
            </div>
          );
        }

        return <Component key={index} {...block.props} />;
      })}
    </main>
  );
};

export default CreativeMindDetailPage;
