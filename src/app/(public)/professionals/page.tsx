import { Metadata } from 'next';
import styles from './page.module.css';

// Components
import Toolbox from './components/Toolbox/Toolbox';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import PaletteRightImage from '@/components/Palette/PaletteRightImage/PaletteRightImage';
import PaletteLeftImage from '@/components/Palette/PaletteLeftImage/PaletteLeftImage';
import HomeVideo from '@/components/HomeVideo/HomeVideo';
import NewsSection from '@/components/NewsSection/NewsSection';
import TrustBadges from '@/components/TrustBadges/TrustBadges';
import Contact from '../contact/page';

// Data & API
import { getCollections } from '@/lib/collections';
import paletteData from "@/mock/palette/home-palette/index.json";
import homeVideoData from "@/mock/home-video/index.json";

export const metadata: Metadata = {
  title: 'Professionals | Sparro',
  description: 'Explore Professionals at Sparro. Discover premium and sustainable designs.',
};

export default async function Professionals() {
  const collectionsData = await getCollections();
  const collections = Array.isArray(collectionsData) ? collectionsData : [];

  const homePalettes = paletteData.homePage as any[];
  
  const paletteRight1 = homePalettes.find(p => p.id === 'homePaletteRight1');
  const paletteLeft1 = homePalettes.find(p => p.id === 'homePaletteLeft1');

  return (
    <main>
      <div className={styles.pageHeader}>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <h1>Professionals</h1>
          </div>
        </div>
      </div>

      <Toolbox />

      <ProductSlider />

      {paletteRight1 && <PaletteRightImage {...paletteRight1.props} />}
      
      {paletteLeft1 && <PaletteLeftImage {...paletteLeft1.props} />}

      <div className="hideOnMobile">
        <HomeVideo imageUrl={homeVideoData.homePage.defaultVideo.imageUrl} />
      </div>

      {paletteLeft1 && <PaletteLeftImage {...paletteLeft1.props} />}

      <NewsSection limit={4} collections={collections} />

      <TrustBadges />

      <div style={{ marginTop: '40px' }}>
        <Contact />
      </div>
    </main>
  );
}
