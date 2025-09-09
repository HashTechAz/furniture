import Link from 'next/link';
import styles from './page.module.css';

export default function CategoriesPage() {
  const categories = [
    { id: 1, name: 'Accessories', description: 'Essential accessories to complete your furniture setup', productCount: 24 },
    { id: 2, name: 'Storage Solutions', description: 'Modular storage systems for organized living', productCount: 45 },
    { id: 3, name: 'Tables', description: 'Dining, coffee, and work tables for every need', productCount: 32 },
    { id: 4, name: 'Chairs', description: 'Comfortable seating solutions for any space', productCount: 28 },
  ];

  return (
    <div className={styles.categoriesPage}>
      <div className={styles.pageHeader}>
        <div>
          <h1>Categories</h1>
          <p>Manage product categories and their organization</p>
        </div>
        <Link href="/admin/categories/new" className={styles.addButton}>
          Add New Category
        </Link>
      </div>

      <div className={styles.categoriesTable}>
        <div className={styles.tableHeader}>
          <div>Name</div>
          <div>Description</div>
          <div>Products</div>
          <div>Actions</div>
        </div>
        
        {categories.map((category) => (
          <div key={category.id} className={styles.tableRow}>
            <div className={styles.categoryName}>{category.name}</div>
            <div className={styles.categoryDescription}>{category.description}</div>
            <div className={styles.productCount}>{category.productCount} products</div>
            <div className={styles.actions}>
              <Link href={`/admin/categories/${category.id}/edit`} className={styles.editButton}>
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
