import React from "react";
import { notFound } from "next/navigation";
import { componentMap, ComponentName } from "@/component-map";
import pageStyles from "./page.module.css";
import SystemHero from "../../system/components/SystemHero/SystemHero";

const seriesPageData: any = {
  "learn-more-about": {
    heroProps: {
      title: "Customer support — We are ready to help private and professional customers",
      backgroundColor: "#2D303B",
      color: "#fff"
    },
    components: [
      {
        component: "SeriesAbout",
        props: {}
      },
      {
        component: "TrustBadges",
        props: {}
      },
    ]
  }
};

const getPageData = (slug: string) => {
  return seriesPageData[slug];
};

const SeriesDetailPage = async ({
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
      {pageData.heroProps && (
        <SystemHero {...pageData.heroProps} />
      )}
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
            "SeriesAbout",
            "TrustBadges",
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

export default SeriesDetailPage;
