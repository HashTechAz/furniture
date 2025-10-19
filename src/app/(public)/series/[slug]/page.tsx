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
  },
  "guarantees": {
    heroProps: {
      title: "Guarantees",
      description: "Our design requirements and quality control ensure that your Montana products, when used correctly last for a lifetime. At Montana, we take the environment and quality seriously. Over 25 years ago, we introduced our own set of environmental account in consultation with the Danish Environmental Protection Agency.",
      backgroundColor: "#3B7840",
      color: "#fff"
    },
    components: [
      {
        component: "CenterInfoText",
        props: {
          title: "Quality Guarantee - Built to Last a Lifetime",
          description: "Every Montana piece is crafted with the highest quality materials and attention to detail. Our furniture is designed to withstand daily use while maintaining its beauty and functionality for generations. We stand behind our products with comprehensive warranties and exceptional customer service.",
          secondParagraph: "Our 10-year structural warranty covers all frame components, ensuring your Montana furniture maintains its integrity and stability for a decade of daily use. The 5-year finish warranty protects against manufacturing defects in paint, lacquer, and surface treatments, keeping your furniture looking beautiful year after year. We offer lifetime warranty on all hardware and moving parts, including hinges, drawer slides, and mounting systems, guaranteeing smooth operation throughout the furniture's life. Our customer service team provides free consultation and support for assembly, maintenance, and any questions about your Montana furniture, ensuring you get the most out of your investment."
        }
      },
      {
        component: "PaletteLeftImage",
        props: {
          title: "Quality Guarantee - Built to Last a Lifetime",
          description: "Every Montana piece is crafted with the highest quality materials and attention to detail. Our furniture is designed to withstand daily use while maintaining its beauty and functionality for generations. We stand behind our products with comprehensive warranties and exceptional customer service.",
          buttonText: "Learn more about our quality",
          buttonLink: "/series/guarantees",
          imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/margrethe-collab/montana_3newcolours_2023_margretheodgaard_05_h.jpg?mode=crop&width=540&height=720",
          backgroundColor: "#E8F4F8",
        }
      },
      {
        component: "Related",
        props: {}
      }
    ]
  },
  "assembly": {
    heroProps: {
      title: "Assembly guides — PDFs and video tutorials",
      description: "Find step-by-step assembly guides and technical specifications. If you need further assistance or have questions regarding assembly, please get in touch with your nearest Montana retailer.",
      backgroundColor: "#F4F4F1",
      color: "#000"
    },
    components: [
     
        {
          component: "AssemblyList",
          props: {
            title: "Assembly Guides",
            lists: [
              {
                title: "Basic Assembly",
                items: [
                  "Step 1: Unpack all components",
                  "Step 2: Check all parts are present", 
                  "Step 3: Read instructions carefully",
                  "Step 4: Prepare workspace",
                  "Step 5: Begin assembly",
                  "Step 6: Test functionality",
                  "Step 7: Final inspection"
                ]
              },
              {
                title: "Advanced Assembly",
                items: [
                  "Step 1: Advanced preparation",
                  "Step 2: Specialized tools required",
                  "Step 3: Complex component assembly",
                  "Step 4: Precision alignment",
                  "Step 5: Quality control checks",
                  "Step 6: Professional finishing",
                  "Step 7: Final testing"
                ]
              },
              {
                title: "Maintenance Guide",
                items: [
                  "Step 1: Regular cleaning schedule",
                  "Step 2: Component inspection",
                  "Step 3: Lubrication points",
                  "Step 4: Wear assessment",
                  "Step 5: Replacement parts",
                  "Step 6: Professional service",
                  "Step 7: Documentation update"
                ]
              }
            ]
          }
        },
        {
          component: "Related",
          props: {}
        }
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
