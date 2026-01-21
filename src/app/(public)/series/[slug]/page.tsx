'use client'; 
 
 import React, { useState, useEffect } from "react"; 
 import { notFound, useParams } from "next/navigation"; 
 import { componentMap, ComponentName } from "@/component-map";
 import pageStyles from "./page.module.css";
 import SystemHero, { SystemHeroProps } from "../../system/components/SystemHero/SystemHero";
 import PageBuilder from '@/components/PageBuilder/PageBuilder';

interface PageComponent {
  component: ComponentName;
  props: Record<string, any>;
}

interface SeriesPageData {
  heroProps?: SystemHeroProps;
  components: PageComponent[];
}
 
 interface PaletteProps {
   title: string;
   description: string;
   buttonText: string;
   buttonLink: string;
   imageUrl: string;
   backgroundColor: string;
   imageSize?: 'normal' | 'large' | 'custom';
   category?: string;
   description2?: string;
   features?: string[];
   layout?: 'textLeft' | 'textRight';
   variant?: 'default' | 'third';
   imagePosition?: {
     width: string;
     height: string;
     top: string;
     left?: string;
     right?: string;
   };
 }
 
 interface PaletteData {
   id: string;
   componentType: 'PaletteRightImage' | 'PaletteLeftImage' | 'SystemPalette';
   props: PaletteProps;
 }
 
 const seriesPageData: Record<string, SeriesPageData> = {
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
             // ... (assembly list data olduğu kimi qalır)
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
 
const SeriesDetailPage = () => { 
  const params = useParams(); 
  const slug = params?.slug as string;

  const [pagePalettes, setPagePalettes] = useState<PaletteData[]>([]);
  const [loadingPalettes, setLoadingPalettes] = useState(false);
  const [paletteError, setPaletteError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (slug === 'guarantees') {
      const fetchPalettes = async () => {
        setLoadingPalettes(true);
        setPaletteError(null);
        setPagePalettes([]);
        try {
          const response = await fetch('/api/palettes');
          if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
          }
          const allPaletteData: { seriesGuaranteesPage?: PaletteData[] } = await response.json();
          setPagePalettes(allPaletteData.seriesGuaranteesPage || []);
        } catch (err) {
           if (err instanceof Error) {
              setPaletteError(err.message);
          } else {
              setPaletteError('An unknown error occurred while fetching palettes');
          }
          console.error("Failed to fetch palettes for guarantees:", err);
        } finally {
          setLoadingPalettes(false);
        }
      };
      fetchPalettes();
    } else {
      setLoadingPalettes(false);
      setPagePalettes([]); 
      setPaletteError(null);
    }
  }, [slug, mounted]);
 
  const renderPalette = (palette: PaletteData) => {
    const Component = componentMap[palette.componentType as ComponentName]; 

    if (!Component) {
      console.error(`"${palette.componentType}" komponenti tapılmadı.`);
      return null;
    }

    return <Component key={palette.id} {...(palette.props as any)} />;
  };
 
   if (!slug) {
     return <div>Loading page...</div>;
   }
 
   const pageData = getPageData(slug);
 
   if (!pageData) {
     notFound();
   }
 
   return (
     <main>
      {pageData.heroProps && (
         <SystemHero {...(pageData.heroProps as SystemHeroProps)} />
      )}
      <PageBuilder components={pageData.components} />
      {/* --------------------------- */}

      {slug === 'guarantees' && mounted && (
        <div className={pageStyles.bannerWrapper}>
          {loadingPalettes ? <p>Loading palette...</p> :
           paletteError ? <p>Error loading palette: {paletteError}</p> :
           pagePalettes.length > 0 ? (
             pagePalettes.map(palette => renderPalette(palette))
           ) :
           <p>Palette data not found for guarantees.</p>
          }
        </div>
      )}
    </main>
   );
 };
 
 export default SeriesDetailPage;