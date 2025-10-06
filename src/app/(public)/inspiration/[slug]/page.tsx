import React from 'react';
import { notFound } from 'next/navigation';
import { componentMap, ComponentName } from '@/component-map';

// Yeni səhifələrimiz üçün məlumatları burada saxlayırıq
const inspirationPageData: any = {
  'find-more-inspiration': {
    components: [
      {
        component: 'SystemHero',
        props: {
          title: 'Find More Inspiration',
          backgroundColor: '#EAEFD9', // Açıq rəng
        }
      },
      // Bu səhifəyə gələcəkdə başqa komponentlər əlavə edə bilərsiniz
    ]
  },
  'catalogues': {
    components: [
      {
        component: 'SystemHero',
        props: {
          title: 'Explore Our Catalogues',
          backgroundColor: '#BDD2DA', // Açıq mavi rəng
        }
      },
      // Bu səhifəyə gələcəkdə başqa komponentlər əlavə edə bilərsiniz
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

export default InspirationDynamicPage;