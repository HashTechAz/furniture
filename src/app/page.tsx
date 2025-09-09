import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Modern Design Solutions</h1>
          <p>
            Discover Montana Furniture's innovative design solutions for modern living and working spaces. 
            Quality craftsmanship meets contemporary aesthetics.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/products" className={styles.primaryButton}>
              Explore Products
            </Link>
            <Link href="/series" className={styles.secondaryButton}>
              View Series
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featured}>
        <div className={styles.featuredContent}>
          <div className={styles.sectionTitle}>
            <h2>Featured Products</h2>
            <p>
              Discover our most popular furniture pieces, designed to enhance your space with style and functionality.
            </p>
          </div>
          
          <div className={styles.productsGrid}>
            <div className={styles.productCard}>
              <div className={styles.productImage}>
                Product Image
              </div>
              <div className={styles.productInfo}>
                <h3>Montana System Storage</h3>
                <p>Modular storage solutions for modern living spaces</p>
                <div className={styles.productPrice}>From $299</div>
              </div>
            </div>
            
            <div className={styles.productCard}>
              <div className={styles.productImage}>
                Product Image
              </div>
              <div className={styles.productInfo}>
                <h3>Montana Mini Collection</h3>
                <p>Compact furniture perfect for smaller spaces</p>
                <div className={styles.productPrice}>From $199</div>
              </div>
            </div>
            
            <div className={styles.productCard}>
              <div className={styles.productImage}>
                Product Image
              </div>
              <div className={styles.productInfo}>
                <h3>Panton Wire Series</h3>
                <p>Elegant wire furniture with timeless appeal</p>
                <div className={styles.productPrice}>From $149</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className={styles.news}>
        <div className={styles.newsContent}>
          <div className={styles.sectionTitle}>
            <h2>Latest News</h2>
            <p>
              Stay updated with our latest product launches, design insights, and company news.
            </p>
          </div>
          
          <div className={styles.newsGrid}>
            <div className={styles.newsCard}>
              <div className={styles.newsImage}>
                News Image
              </div>
              <div className={styles.newsContent}>
                <div className={styles.newsDate}>December 15, 2024</div>
                <h3 className={styles.newsTitle}>
                  New Montana Free Collection Launches
                </h3>
                <p className={styles.newsExcerpt}>
                  Discover our latest collection featuring innovative design solutions for contemporary living spaces.
                </p>
              </div>
            </div>
            
            <div className={styles.newsCard}>
              <div className={styles.newsImage}>
                News Image
              </div>
              <div className={styles.newsContent}>
                <div className={styles.newsDate}>December 10, 2024</div>
                <h3 className={styles.newsTitle}>
                  Sustainability Initiatives Update
                </h3>
                <p className={styles.newsExcerpt}>
                  Learn about our continued commitment to sustainable manufacturing and environmental responsibility.
                </p>
              </div>
            </div>
            
            <div className={styles.newsCard}>
              <div className={styles.newsImage}>
                News Image
              </div>
              <div className={styles.newsContent}>
                <div className={styles.newsDate}>December 5, 2024</div>
                <h3 className={styles.newsTitle}>
                  Design Award Recognition
                </h3>
                <p className={styles.newsExcerpt}>
                  Montana Furniture receives international recognition for innovative design excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Ready to Transform Your Space?</h2>
          <p>
            Explore our complete range of furniture solutions and find the perfect pieces for your home or office.
          </p>
          <Link href="/contact" className={styles.primaryButton}>
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}