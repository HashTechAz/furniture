
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
  imageClassName: pageStyles.lumikelloHeroImage,
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
      { component: 'HomeVideo', props: { imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/creative-minds/lumikello/homestory7_s.jpg?mode=crop&width=1520&height=1093" } },
      { component: 'Companies', props: {} },
      { component: 'PaletteLeftImage', props: lumikelloPaletteLeftProps },
      { component: 'MiddleBanner', props: lumikelloBanner2Props },
      { component: 'ProductNewsSlider', props: { titleTop: "" } },
      { component: 'HomeVideo', props: { imageUrl: "https://themes.muffingroup.com/be/furniturestore/wp-content/uploads/2022/06/furniturestore-slider-pic1.webp" } },

      { component: 'Form', props: {} },
      { component: 'Related', props: {} }
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
  
        if (block.component === 'MiddleBanner') {
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