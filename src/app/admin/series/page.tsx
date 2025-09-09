import Link from 'next/link';
import styles from './page.module.css';

export default function SeriesPage() {
  const series = [
    { id: 1, name: 'Montana System', description: 'Modular storage solutions', productCount: 45, status: 'Active' },
    { id: 2, name: 'Montana Mini', description: 'Compact furniture for small spaces', productCount: 32, status: 'Active' },
    { id: 3, name: 'Panton Wire', description: 'Elegant wire furniture', productCount: 28, status: 'Active' },
    { id: 4, name: 'Montana Free', description: 'Innovative design solutions', productCount: 15, status: 'Draft' },
  ];

  return (
    <div className={styles.seriesPage}>
      <div className={styles.pageHeader}>
        <div>
          <h1>Series</h1>
          <p>Manage product series and collections</p>
        </div>
        <Link href="/admin/series/new" className={styles.addButton}>
          Add New Series
        </Link>
      </div>

      <div className={styles.seriesTable}>
        <div className={styles.tableHeader}>
          <div>Name</div>
          <div>Description</div>
          <div>Products</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        
        {series.map((item) => (
          <div key={item.id} className={styles.tableRow}>
            <div className={styles.seriesName}>{item.name}</div>
            <div className={styles.seriesDescription}>{item.description}</div>
            <div className={styles.productCount}>{item.productCount} products</div>
            <div>
              <span className={`${styles.status} ${styles[item.status.toLowerCase()]}`}>
                {item.status}
              </span>
            </div>
            <div className={styles.actions}>
              <Link href={`/admin/series/${item.id}/edit`} className={styles.editButton}>
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
