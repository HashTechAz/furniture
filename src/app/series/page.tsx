import Link from 'next/link';
import styles from './page.module.css';

export default function Series() {
  const series = [
    {
      id: 'montana-system',
      title: 'Montana System',
      description: 'Modular storage solutions that adapt to your changing needs. The Montana System offers endless configuration possibilities for modern living and working spaces.',
      features: [
        'Modular design',
        'Multiple color options',
        'Easy assembly',
        'Durable materials'
      ],
      image: 'Montana System Image'
    },
    {
      id: 'montana-mini',
      title: 'Montana Mini',
      description: 'Compact furniture perfect for smaller spaces. Montana Mini brings the same quality and design principles in a space-efficient format.',
      features: [
        'Space-efficient design',
        'Compact dimensions',
        'Full functionality',
        'Modern aesthetics'
      ],
      image: 'Montana Mini Image'
    },
    {
      id: 'panton-wire',
      title: 'Panton Wire',
      description: 'Elegant wire furniture with timeless appeal. The Panton Wire series combines functionality with sophisticated design.',
      features: [
        'Wire construction',
        'Timeless design',
        'Easy maintenance',
        'Versatile applications'
      ],
      image: 'Panton Wire Image'
    },
    {
      id: 'montana-free',
      title: 'Montana Free',
      description: 'Innovative design solutions for contemporary living. Montana Free pushes the boundaries of furniture design.',
      features: [
        'Innovative design',
        'Contemporary style',
        'High-quality materials',
        'Unique configurations'
      ],
      image: 'Montana Free Image'
    }
  ];

  return (
    <>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1>Our Series</h1>
          <p>
            Discover our carefully curated furniture series, each designed with specific needs and aesthetics in mind. 
            From modular storage to compact solutions, find the perfect series for your space.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.seriesGrid}>
          {series.map((item) => (
            <div key={item.id} className={styles.seriesCard}>
              <div className={styles.seriesImage}>
                {item.image}
              </div>
              <div className={styles.seriesContent}>
                <h2 className={styles.seriesTitle}>{item.title}</h2>
                <p className={styles.seriesDescription}>{item.description}</p>
                <ul className={styles.seriesFeatures}>
                  {item.features.map((feature, index) => (
                    <li key={index} className={styles.seriesFeature}>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/series/${item.id}`} className={styles.seriesButton}>
                  Explore Series
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
