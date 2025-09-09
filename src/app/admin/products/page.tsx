import Link from 'next/link';
import styles from './page.module.css';

export default function ProductsPage() {
  const products = [
    { id: 1, name: 'Montana System Storage Unit', category: 'Storage', price: '$299', status: 'Active' },
    { id: 2, name: 'Montana Mini Desk', category: 'Tables', price: '$199', status: 'Active' },
    { id: 3, name: 'Panton Wire Chair', category: 'Chairs', price: '$149', status: 'Active' },
    { id: 4, name: 'Montana Free Coffee Table', category: 'Tables', price: '$249', status: 'Draft' },
    { id: 5, name: 'Storage Accessories Set', category: 'Accessories', price: '$49', status: 'Active' },
  ];

  return (
    <div className={styles.productsPage}>
      <div className={styles.pageHeader}>
        <div>
          <h1>Products</h1>
          <p>Manage your product catalog and inventory</p>
        </div>
        <Link href="/admin/products/new" className={styles.addButton}>
          Add New Product
        </Link>
      </div>

      <div className={styles.filters}>
        <select className={styles.filterSelect}>
          <option value="">All Categories</option>
          <option value="storage">Storage</option>
          <option value="tables">Tables</option>
          <option value="chairs">Chairs</option>
          <option value="accessories">Accessories</option>
        </select>
        <select className={styles.filterSelect}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
        <input
          type="text"
          placeholder="Search products..."
          className={styles.searchInput}
        />
      </div>

      <div className={styles.productsTable}>
        <div className={styles.tableHeader}>
          <div>Name</div>
          <div>Category</div>
          <div>Price</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        
        {products.map((product) => (
          <div key={product.id} className={styles.tableRow}>
            <div className={styles.productName}>{product.name}</div>
            <div className={styles.productCategory}>{product.category}</div>
            <div className={styles.productPrice}>{product.price}</div>
            <div>
              <span className={`${styles.status} ${styles[product.status.toLowerCase()]}`}>
                {product.status}
              </span>
            </div>
            <div className={styles.actions}>
              <Link href={`/admin/products/${product.id}/edit`} className={styles.editButton}>
                Edit
              </Link>
              <button className={styles.deleteButton}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
