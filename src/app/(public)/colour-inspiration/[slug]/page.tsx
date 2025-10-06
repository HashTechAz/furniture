import React from 'react';
import { notFound } from 'next/navigation';
import { componentMap, ComponentName } from '@/component-map';

const inspirationPageData: any = {
  'colour-class': {
    components: [
      {
        component: 'Hero',
        props: {
          title: "Colour Class",
          titleSpan: "Learn to embrace the world of colours",
          description: "Montana Furniture has teamed up with Color Connaisseur by Céline Hallas to create Colour Class, a unique digital concept designed to empower you to confidently embrace the world of colours within your interior spaces.",
          imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/cc-02/Montana_Colour_Class_2_header_iris_2024.jpg?mode=crop&width=828&height=595",
          imageAlt: "Colour Class",
          backgroundColor: "#BDD2DA",
          textColor: "#000",
        }
      },
     
    ]
  },
  // 'colours-of-comfort': { /* ... */ }
};

const getPageData = (slug: string) => {
  return inspirationPageData[slug];
}

const ColourInspirationPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
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
          console.error(`"${block.component}" adlı komponent "component-map.ts"-də tapılmadı.`);
          return null;
        }

        return <Component key={index} {...block.props} />;
      })}
    </main>
  );
};

export default ColourInspirationPage;