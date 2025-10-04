
import React from 'react';
import { notFound } from 'next/navigation';
import { componentMap, ComponentName } from '@/component-map'; 
import pageStyles from './page.module.css';


const firstFabrikBanner = {
    largeImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/fabrik/montana_fabrik_portrait_ingrid_01_h.jpg?mode=crop&width=1520&height=2027",
    smallImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/creative-minds/fabrik/montana_fabrik_portrait_doghundre_01_w.jpg?mode=crop&width=1520&height=1093",
    title: "Ingrid's trolley",
    description: "Ingrid with her personalised trolley that - much like the office dog, Hundre - follows her around everywhere in the studio. This way she has her sewing gear at hand all day.",
    buttonText: "Daha Çox Kəşf Et",
    buttonLink: "/link-unvani",
    smallImageHeight: "550px",
  };

  const secondFabrikBanner = {
    largeImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/fabrik/montana_fabrik_portrait_jenny_01_h.jpg?mode=crop&width=1520&height=2027",
    smallImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/creative-minds/fabrik/montana_fabrik_portrait_jenny_02_w.jpg?mode=crop&width=1520&height=1093",
    title: "Ingrid's trolley",
    description: "Ingrid with her personalised trolley that - much like the office dog, Hundre - follows her around everywhere in the studio. This way she has her sewing gear at hand all day.",
    buttonText: "Daha Çox Kəşf Et",
    buttonLink: "/link-unvani",
    smallImageHeight: "550px",      
};

const lumikelloHeroProps = {
  title: "Inside the creative mind of",
  titleSpan: "Lumikello",
  description: "Five years ago, when Eva Kaiser founded her creative label Lumikello, she also started sharing images on Instagram of the new interior products photographed in her home. This was the very beginning of Eva’s creative journey as an influencer, which has also led her to working with interior decoration for clients. Read along for a peek inside the creative mind of Eva Kaiser aka Lumikello.",
  imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/creative-minds/lumikello/portrat_l.jpg?mode=crop&width=828&height=828",
  imageAlt: "Lumikello Space",
  backgroundColor: "#EEE7E1", // Lumikello üçün fərqli rəng
  textColor: "#333",
  imageClassName: pageStyles.customHeroImage,
  heroClassName: pageStyles.customHeroLayout,
};

const lumikelloBanner1Props = {
  largeImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/lumikello/montana_march03.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/lumikello/montana_lumikello_april10_p.jpg?mode=crop&width=1520&height=2027",
  title: "KEEP dresser in the entrance hall",
  description: "The Montana KEEP dresser in Beetroot with Iris handles for scarves, keys and other belongings in Eva's entrance hall.",
  buttonText: "See the Details",
  buttonLink: "#",
  // "normal" ölçü üçün smallImageHeight propertisini vermirik
};

const lumikelloPaletteLeftProps = {
  title: 'Eva advice – begin small and invest in help',
  description: 'If you would like to approach colours like Eva, you should find inspiration for colour combinations in nature, books and your wardrobe. She advises you to find your own personal favourites instead of looking too much to magazines and trends. Begin with small adjustments like a new green cushion for your sofa and take your time to discover how that colour makes you feel.',
  buttonText: 'Explore Colours',
  buttonLink: '/colours',
  imageUrl: 'https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/lumikello/montana_lumikello02_p.jpg?mode=crop&width=540&height=720',
  backgroundColor: '#D9D5CF',
  imageSize: 'normal',
};

const lumikelloBanner2Props = {
  largeImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/lumikello/lumikello_montana_januar6_p.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/creative-minds/lumikello/lumikello_montana_januar2_s.jpg?mode=crop&width=1520&height=1520",
  title: "Harmony in Design",
  description: "Every piece is carefully selected to contribute to a cohesive and harmonious interior, balancing form and function.",
  buttonText: "Learn More",
  buttonLink: "#",
  layout: "imageRight", // Reverse banner
};

const lumikelloGalleryProps = {
  layout: 'reversed', // Şəkillərin sırasını tərs çevirir
  images: [ // "Swantje" səhifəsi üçün xüsusi iki şəkil
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/lumikello/homestory8_p.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/lumikello/bluna_fresko_p.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string] // TypeScript-ə bunun iki elementli massiv olduğunu bildiririk
};

const swantjeHeroProps = {
  title: "Inside the creative minds of",
  titleSpan: "Swantje Hinrichsen",
  description: "Swantje Hinrichsen is an art director, graphic designer and colourist with a strong focus on creating colourful visual identities and interior design. Swantje lives with her partner in a subdivided house from 1930 in the German city of Münster. Read along for a peek inside the creative mind of Swantje Hinrichsen.", // Mətni dəyişə bilərsiniz
  imageUrl: "https://b2c.montana-episerver.com/globalassets/inriver/product/0hilow160c/portrait_swantje_s.jpg?mode=crop&width=828&height=828", // Şəkli dəyişin
  imageAlt: "Swantje Hinrichsen",
  backgroundColor: "#C9B176", // İstədiyiniz rəng
  textColor: "#333",
  imageClassName: pageStyles.customHeroImage, // Ümumi stili tətbiq edirik
  heroClassName: pageStyles.customHeroLayout,  // Ümumi stili tətbiq edirik
};

const swantjeHeroBanner1Props = {
  largeImageUrl: "https://b2c.montana-episerver.com/globalassets/inriver/product/0hilow160c/circus_hallway._p.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl: "https://b2c.montana-episerver.com/globalassets/inriver/product/0hilow160c/2020-11-23-13.36.08_l.jpg?mode=crop&width=1520&height=1093",
  title: "A happy entrance hall",
  description: "When visiting Swantje, you get welcomed by the CARRY dresser in the energetic colour Parsley. Right beside is a clothing rack in the bold colour Monarch creating an entrance hall with a playful atmosphere.",
  buttonText: "Shop the look Montana",
  buttonLink: "#",
  // "normal" ölçü üçün smallImageHeight propertisini vermirik
};

const swantjeGalleryProps = {
  layout: 'reversed', // Şəkillərin sırasını tərs çevirir
  images: [ // "Swantje" səhifəsi üçün xüsusi iki şəkil
    "https://b2c.montana-episerver.com/globalassets/inriver/product/0hilow160c/kitchen_details_p.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/inriver/product/0hilow160c/kitchen_and_hallway_p.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string] // TypeScript-ə bunun iki elementli massiv olduğunu bildiririk
};

const swantjeGallery2Props = {
  layout: 'reversed', // Şəkillərin sırasını tərs çevirir
  images: [ // "Swantje" səhifəsi üçün xüsusi iki şəkil
    "https://b2c.montana-episerver.com/contentassets/1b51ede3ba094c9199f4de18e6d1958f/living_room_p.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/swantje/livingroom_2_p.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string] // TypeScript-ə bunun iki elementli massiv olduğunu bildiririk
};

const swantjeGallery3Props = {
  images: [ // "Swantje" səhifəsi üçün xüsusi iki şəkil
    "https://b2c.montana-episerver.com/globalassets/inriver/product/0hilow160c/bedroom_1_p.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/inriver/product/0hilow160c/img_1698_p.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string] // TypeScript-ə bunun iki elementli massiv olduğunu bildiririk
};

// YENİ: Cathrine səhifəsi üçün props
const cathrineHeroProps = {
  title: "Inside the creative minds of",
  titleSpan: "Cathrine De Lichtenberg",
  description: "Housing consultant Cathrine de Lichtenberg lives with her husband Anders and their two daughters in an old, divided patrician villa from 1898 in Frederiksberg, Copenhagen. Read along for a peek inside the creative mind of Cathrine de Lichtenberg.", // Mətni dəyişin
  imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36571.jpg?mode=crop&width=1080&height=776", // Şəkli dəyişin
  imageAlt: "Cathrine De Lichtenberg",
  backgroundColor: "#D0BAE2", // Header ilə eyni rəng (və ya istədiyiniz başqa rəng)
  textColor: "#333",
  heroClassName: pageStyles.customHeroLayout,
  // Fikir verin: `imageClassName` və `heroClassName` proplarını vermirik, çünki standart Hero istəyirik.
};

const cathrineGalleryProps = {
  layout: 'reversed', // Şəkillərin sırasını tərs çevirir
  images: [ // "Swantje" səhifəsi üçün xüsusi iki şəkil
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg19728_final.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg19669_final.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string] // TypeScript-ə bunun iki elementli massiv olduğunu bildiririk
};

const cathrineGallery2Props = {
  images: [ // "Swantje" səhifəsi üçün xüsusi iki şəkil
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36661.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg20061_final.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string] // TypeScript-ə bunun iki elementli massiv olduğunu bildiririk
};

const cathrineMiddleBanner1Props = {
  largeImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg19859_final.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg19903_final_v2.jpg?mode=crop&width=1520&height=2027",
  title: "“The pink we’ve all dreamed about”",
  description: "The KEEP dresser is the perfect storage solution for the bedroom, living room, or hall. Cathrine has it in her bedroom in the soft pink shade, Ruby.",
  buttonText: "Explore dressers and drawers",
  buttonLink: "#",
};

const cathrineGallery3Props = {
  images: [ // "Swantje" səhifəsi üçün xüsusi iki şəkil
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36482.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36548.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string] // TypeScript-ə bunun iki elementli massiv olduğunu bildiririk
};

const cathrineMiddleBanner2Props = {
  largeImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36363.jpg?mode=crop&width=1520&height=2027",
  smallImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36356.jpg?mode=crop&width=1520&height=2027",
  title: "“Cathrine's customised wardrobe”",
  description: "Cathrine transformed a room into a stylish walk-in closet. Here, she has a custom Montana System wardrobe in deep green Pine. With drawers, open shelves, and glass shelves, it accommodates all her wardrobe favourites – from shoes to blouses and jewellery.",
  buttonText: "Explore dressers and drawers",
  buttonLink: "#",
};

const cathrineGallery4Props = {
  images: [ // "Swantje" səhifəsi üçün xüsusi iki şəkil
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36718.jpg?mode=crop&width=1520&height=2027",
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36703.jpg?mode=crop&width=1520&height=2027",
  ] as [string, string] // TypeScript-ə bunun iki elementli massiv olduğunu bildiririk
};

const cathrinePaletteRightImageProps = {
  title: "Colour as therapy",
  description: "Colours to Cathrine are both a sort of therapy and sanctuary. Whenever she throws herself at a new decoration project in her home, she works with emotions and energies, and hardly ever have a plan to begin with. Go about it as Cathrine and build your own Montana composition in our vibrant colour palette.  ",
  buttonText: "Explore now",
  buttonLink: "/news/palette-refresh",
  imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36571.jpg?mode=crop&width=540&height=720",
  backgroundColor: "#D0BAE2",
  
};

const mindsPageData: any = {
  'faebrik': {
    components: [
      {
        component: 'Hero',
        props: {
          title: "Inside the creative minds of",
          titleSpan: "Fæbrik",
          description: "The Norwegian sewing collective Fæbrik, has quickly become a go-to source of inspiration for creative DIY’ers all over the World. Their mission is to make it easier and more fun creating your own clothes from recycled fabrics as well as repairing and renewing old garments – while fostering a more sustainable approach to fashion.",
          imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/creative-minds/fabrik/montana_fabrik_portrait_01_w.jpg?mode=crop&width=1080&height=776",
          imageAlt: "Faebrik Team",
          backgroundColor: "#5F90CA", 
          textColor: "#000",
        }
      },
      {
        component: 'MiddleBanner',
        props: firstFabrikBanner, // Yuxarıda yaratdığımız obyekti ötürürük
      },
      {
        component: 'HomeVideo',
        props: {
          variant: 'rightAligned', // Komponenti sağa yaslamaq üçün
          imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/creative-minds/fabrik/montana_fabrik_portrait_04_w.jpg?mode=crop&width=1520&height=1093"
        }
      },
      {
        component: 'Companies',
        props: {} // Bu komponentin xüsusi propsu yoxdur
      },
      {
        component: 'MiddleBanner',
        props: secondFabrikBanner, // Tərs çevrilmiş banner
      },
      {
        component: 'HomeVideo',
        props: {
          variant: 'rightAligned', // Komponenti sağa yaslamaq üçün
          imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/creative-minds/fabrik/montana_fabrik_portrait_04_w.jpg?mode=crop&width=1520&height=1093"
        }
      },
      {
        component: 'Form',
        props: {}
      },
      {
        component: 'Related',
        props: {} // Bu komponentin xüsusi propsu yoxdur
      }
    ]
  },
   'lumikello': {
    components: [
      { component: 'Hero', props: lumikelloHeroProps },
      { component: 'CenterInfoText', props: {} }, 
      { component: 'MiddleBanner', props: lumikelloBanner1Props },
      { component: 'SustainabilityGallery', props: lumikelloGalleryProps },
      { component: 'HomeVideo', props: { imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/creative-minds/lumikello/homestory7_s.jpg?mode=crop&width=1520&height=1093" } },
      { component: 'Companies', props: {} },
      { component: 'CenterInfoText', props: {} },
      { component: 'FrameColors', props: {} },
      { component: 'PaletteLeftImage', props: lumikelloPaletteLeftProps },
      { component: 'MiddleBanner', props: lumikelloBanner2Props },
      { component: 'ProductNewsSlider', props: { titleTop: "" } },
      { component: 'HomeVideo', props: { imageUrl: "https://themes.muffingroup.com/be/furniturestore/wp-content/uploads/2022/06/furniturestore-slider-pic1.webp" } },
      { component: 'Form', props: {} },
      { component: 'Related', props: {} }
    ]
  },
  'swantje': { // YENİ SƏHİFƏ
    components: [
      { component: 'Hero', props: swantjeHeroProps },
      { component: 'CenterInfoText', props: {} },
      { component: 'MiddleBanner', props: swantjeHeroBanner1Props },
      { component: 'SustainabilityGallery', props: swantjeGalleryProps },
      { component: 'Companies', props: {} },
      { component: 'CenterInfoText', props: {} },
      { component: 'HomeVideo', props: { imageUrl: "https://b2c.montana-episerver.com/globalassets/inriver/product/0hilow160c/maw18456_l.jpg?mode=crop&width=1520&height=1093" } },
      { component: 'SustainabilityGallery', props: swantjeGallery2Props },
      { component: 'ProductNewsSlider', props: { titleTop: "" } },
      { component: 'CenterInfoText', props: {} },
      { component: 'FrameColors', props: {} },
      { component: 'SustainabilityGallery', props: swantjeGallery3Props },
      {component: 'Form', props: {}},
      { component: 'Related', props: {} }
    ]
  },
  'cathrine': { // YENİ SƏHİFƏ
    components: [
      { component: 'Hero', props: cathrineHeroProps },
      { component: 'CenterInfoText', props: {} },
      { component: 'SustainabilityGallery', props: cathrineGalleryProps },
      { component: 'Companies', props: {} },
      { component: 'SustainabilityGallery', props: cathrineGallery2Props },
      { component: 'CenterInfoText', props: {} },
      { component: 'FrameColors', props: {} },
      { component: 'MiddleBanner', props: cathrineMiddleBanner1Props },
      { component: 'CenterInfoText', props: {} },
      { component: 'Companies', props: {} },
      { component: 'SustainabilityGallery', props: cathrineGallery3Props },
      { component: 'Companies', props: {} },
      { component: 'MiddleBanner', props: cathrineMiddleBanner2Props },
      { component: 'SustainabilityGallery', props: cathrineGallery4Props },
      { component: 'ProductNewsSlider', props: { titleTop: "" } },
      {component: 'PaletteRightImage', props: cathrinePaletteRightImageProps },
      {component: 'Form', props: {}},
      {component: 'Related', props: {}},
    ]
  }
};

const getPageData = (slug: string) => {
  return mindsPageData[slug];
}

const CreativeMindDetailPage = async ({ params} : {params: Promise<{slug: string}>}) => {
  const { slug } = await params;
  const pageData = getPageData(slug)

  if (!pageData) {
    notFound();
  }

return (
  <main>
  {pageData.components.map((block: any, index: number) => {
    const Component = componentMap[block.component as ComponentName];

    if (!Component) {
      console.error(`"${block.component}" adlı komponent "component-map.ts"-də tapılmadı.`);
      return null;
    }

    // DƏYİŞİKLİK BURADADIR: `CenterInfoText`-i də şərtə əlavə edirik
    if (['MiddleBanner', 'CenterInfoText', 'Companies', 'HomeVideo', 'PaletteLeftImage', 'ProductSlider', 'Form', 'Related'].includes(block.component)) {
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