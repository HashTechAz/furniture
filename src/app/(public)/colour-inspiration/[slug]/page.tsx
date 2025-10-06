import React from "react";
import { notFound } from "next/navigation";
import { componentMap, ComponentName } from "@/component-map";
import pageStyles from "./page.module.css";

const cathrinePaletteRightImageProps = {
  title: "Colour as therapy",
  description: "Colours to Cathrine are both a sort of therapy and sanctuary. Whenever she throws herself at a new decoration project in her home, she works with emotions and energies, and hardly ever have a plan to begin with. Go about it as Cathrine and build your own Montana composition in our vibrant colour palette.  ",
  buttonText: "Explore now",
  buttonLink: "/news/palette-refresh",
  imageUrl: "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg36571.jpg?mode=crop&width=540&height=720",
  backgroundColor: "#C9B176",
};
const inspirationPageData: any = {
  "colour-class": {
    components: [
      {
        component: "Hero",
        props: {
          title: "Colour Class",
          titleSpan: "Learn to embrace the world of colours",
          description:
            "Designer Sarah Gottlieb lives in a city apartment in the vibrant Nørrebro neighborhood of Copenhagen, together with her husband and their three children. Read along for a sneak peek inside the creative mind of Sarah Gottlieb. Designer Sarah Gottlieb lives in a city apartment in the vibrant Nørrebro neighborhood of Copenhagen, together with her husband and",
          imageUrl:
            "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/colours/colour-class/Colour_Class_header.jpg?mode=crop&width=1080&height=776",
          imageAlt: "Colour Class",
          backgroundColor: "#BDD2DA",
          textColor: "#000",
          imageClassName: pageStyles.customHeroImage,
          heroClassName: pageStyles.customHeroLayout,
        },
      },
      { component: "SystemAbout", props: {} },
      { component: "PaletteLeftImage", props: cathrinePaletteRightImageProps },
      { component: "ColourClassCard", props: {} },
    ],
  },
  // 'colours-of-comfort': { /* ... */ }
};

const getPageData = (slug: string) => {
  return inspirationPageData[slug];
};

const ColourInspirationPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
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
          console.error(
            `"${block.component}" adlı komponent "component-map.ts"-də tapılmadı.`
          );
          return null;
        }

        // --- YENİ MƏNTİQ BURADADIR ---
        if (
          [
            "CenterInfoText",
            "Companies",
            "HomeVideo",
            "PaletteRightImage",
            "ProductSlider",
            "Form",
            "Related",
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

export default ColourInspirationPage;
