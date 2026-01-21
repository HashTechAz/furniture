import React from 'react';
import { notFound } from 'next/navigation';
import { componentMap, ComponentName } from '@/component-map';

interface PageComponent {
  component: ComponentName;
  props: Record<string, any>;
}

interface InspirationPageData {
  components: PageComponent[];
}

// Yeni səhifələrimiz üçün məlumatları burada saxlayırıq
const inspirationPageData: Record<string, InspirationPageData> = {
  'find-more-inspiration': {
    components: [
      {
        component: 'HeroSection',
        props: {
          title: "Inspiration ",
          titleSpan: "Creative colour styles and furniture for your home",
          buttonText: "Explore Series",
          buttonLink: "/product",
          backgroundImage: "https://cdn.pixabay.com/video/2023/11/25/190661-888327729_tiny.jpg",
          variant: "inspiration"
        }
      },
      {
        component: 'SeriesText', props: {} },
        {
          component: 'InspiringCard',
          props: {}
        }
    ]
  },
  'catalogues': {
    components: [
      {
        component: 'Hero',
        props: {
          title: "Catalogues ",
          titleSpan: "Find inspiration for the home and modern office environments",
          description: "",
          imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-home/2023/location---radiohuset/montana_home_23_24_masala_amber_acacia_camomile_w.jpg?mode=crop&width=1080&height=776",
          imageAlt: "Catalogues",
          backgroundColor: "#3A3126",
          textColor: "#fff",
        }
      },
      {
        component: 'Catalogues',
        props: {}
      }
    ]
  }
};

const getPageData = (slug: string) => {
  return inspirationPageData[slug];
}

const InspirationDynamicPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const pageData = getPageData(slug);

  if (!pageData || !pageData.components) {
    notFound();
  }

  return (
    <main>
      {pageData.components.map((block: PageComponent, index: number) => {
        const Component = componentMap[block.component as ComponentName];

        if (!Component) {
          console.error(`"${block.component}" adlı komponent "component-map.ts"-də tapılmadı.`);
          return null;
        }

        return <Component key={index} {...(block.props as any)} />;
      })}
    </main>
  );
};

export default InspirationDynamicPage;