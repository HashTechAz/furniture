import Link from 'next/link';
import styles from './page.module.css';

export default function Products() {
  const categories = [
    {
      id: 'accessories',
      title: 'Accessories',
      description: 'Essential accessories to complete your furniture setup',
      image: 'Accessories Image'
    },
    {
      id: 'storage',
      title: 'Storage Solutions',
      description: 'Modular storage systems for organized living',
      image: 'Storage Image'
    },
    {
      id: 'tables',
      title: 'Tables',
      description: 'Dining, coffee, and work tables for every need',
      image: 'Tables Image'
    },
    {
      id: 'chairs',
      title: 'Chairs',
      description: 'Comfortable seating solutions for any space',
      image: 'Chairs Image'
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      title: 'Montana System Storage Unit',
      description: 'Modular storage with endless configuration possibilities',
      price: '$299',
      image: 'Product Image'
    },
    {
      id: 2,
      title: 'Montana Mini Desk',
      description: 'Compact workspace solution for small spaces',
      price: '$199',
      image: 'Product Image'
    },
    {
      id: 3,
      title: 'Panton Wire Chair',
      description: 'Elegant wire chair with timeless design',
      price: '$149',
      image: 'Product Image'
    },
    {
      id: 4,
      title: 'Montana Free Coffee Table',
      description: 'Innovative coffee table with unique design',
      price: '$249',
      image: 'Product Image'
    }
  ];

  return (
    <>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1>Our Products</h1>
          <p>
            Explore our comprehensive range of furniture solutions, designed to meet the needs of modern living and working spaces.
          </p>
        </div>
      </div>

      <div className={styles.productsSection}>
        <div className={styles.productsContent}>
          <div className={styles.categoriesGrid}>
            {categories.map((category) => (
              <div key={category.id} className={styles.categoryCard}>
                <div className={styles.categoryImage}>
                  {category.image}
                </div>
                <div className={styles.categoryContent}>
                  <h3 className={styles.categoryTitle}>{category.title}</h3>
                  <p className={styles.categoryDescription}>{category.description}</p>
                  <Link href={`/products/${category.id}`} className={styles.categoryButton}>
                    View Category
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.featuredProducts}>
            <div className={styles.sectionTitle}>
              <h2>Featured Products</h2>
              <p>
                Discover our most popular furniture pieces, carefully selected for their quality and design excellence.
              </p>
            </div>
            
            <div className={styles.productsGrid}>
              {featuredProducts.map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productImage}>
                    {product.image}
                  </div>
                  <div className={styles.productInfo}>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <div className={styles.productPrice}>{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
