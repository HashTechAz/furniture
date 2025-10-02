// app/(public)/creative-minds/[slug]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import { componentMap, ComponentName } from '@/component-map'; // Addım 1-də yaratdığımız fayl


const firstFabrikBanner = {
    largeImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/fabrik/montana_fabrik_portrait_ingrid_01_h.jpg?mode=crop&width=1520&height=2027",
    smallImageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/creative-minds/fabrik/montana_fabrik_portrait_doghundre_01_w.jpg?mode=crop&width=1520&height=1093",
    title: "Ingrid's trolley",
    description: "Ingrid with her personalised trolley that - much like the office dog, Hundre - follows her around everywhere in the studio. This way she has her sewing gear at hand all day.",
    buttonText: "Daha Çox Kəşf Et",
    buttonLink: "/link-unvani",
    smallImageHeight: "550px",
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
        component: 'ProductSlider',
        props: {
          variant: 'system',
          titleTop: 'Faebrik üçün Xüsusi Məhsullar'
        }
      },
      {
        component: 'NewsSection',
        props: {
          limit: 4,
          showTitle: false,
          customGridClass: "creative-minds-grid"
        }
      },
      {
        component: 'Form',
        props: {}
      }
    ]
  },
  // GƏLƏCƏKDƏ "lumikello" SƏHİFƏSİ ÜÇÜN BURA YENİ BİR BÖLMƏ ƏLAVƏ EDƏCƏKSİNİZ
  // 'lumikello': {
  //   components: [ /* ... fərqli komponent ardıcıllığı ... */ ]
  // }
};

const getPageData = (slug: string) => {
  return mindsPageData[slug];
}

const CreativeMindDetailPage = ({ params }: { params: { slug: string } }) => {
  const pageData = getPageData(params.slug);

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

        return <Component key={index} {...block.props} />;
      })}
    </main>
  );
};

export default CreativeMindDetailPage;