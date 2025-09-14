import styles from './page.module.css';

export default function About() {
  return (
    <>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1>About Montana</h1>
          <p>
            Discover our story, values, and commitment to creating innovative furniture solutions for modern living.
          </p>
        </div>
      </div>

      <div className={styles.aboutContent}>
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.textContent}>
              <h2>Our Story</h2>
              <p>
                Founded with a vision to revolutionize modern furniture design, Montana has been at the forefront 
                of innovative storage and living solutions for over three decades. Our commitment to quality, 
                functionality, and aesthetic excellence has made us a trusted partner for architects, designers, 
                and homeowners worldwide.
              </p>
              <p>
                We believe that furniture should not only serve a purpose but also enhance the way we live and work. 
                Our modular systems and thoughtful designs adapt to changing needs, ensuring that our products 
                remain relevant and valuable for years to come.
              </p>
            </div>
            <div className={styles.imageContent}>
              <div className={styles.placeholderImage}>
                Company Image
              </div>
            </div>
          </div>

          <div className={styles.valuesSection}>
            <h2>Our Values</h2>
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <h3>Innovation</h3>
                <p>We continuously push the boundaries of furniture design, creating solutions that anticipate future needs.</p>
              </div>
              <div className={styles.valueCard}>
                <h3>Quality</h3>
                <p>Every piece is crafted with attention to detail, using premium materials and rigorous quality standards.</p>
              </div>
              <div className={styles.valueCard}>
                <h3>Sustainability</h3>
                <p>We are committed to environmental responsibility, using sustainable materials and manufacturing processes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
