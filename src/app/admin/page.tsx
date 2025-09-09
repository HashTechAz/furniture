import styles from './page.module.css';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Products', value: '156', change: '+12%' },
    { label: 'Active Categories', value: '8', change: '+2' },
    { label: 'Total Orders', value: '1,234', change: '+8%' },
    { label: 'Revenue', value: '$45,678', change: '+15%' },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', amount: '$299', status: 'Completed' },
    { id: 'ORD-002', customer: 'Jane Smith', amount: '$149', status: 'Processing' },
    { id: 'ORD-003', customer: 'Bob Johnson', amount: '$199', status: 'Pending' },
    { id: 'ORD-004', customer: 'Alice Brown', amount: '$249', status: 'Completed' },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1>Dashboard</h1>
        <p>Welcome to the Montana Furniture admin panel</p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statChange}>{stat.change}</div>
          </div>
        ))}
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.recentOrders}>
          <h2>Recent Orders</h2>
          <div className={styles.ordersTable}>
            <div className={styles.tableHeader}>
              <div>Order ID</div>
              <div>Customer</div>
              <div>Amount</div>
              <div>Status</div>
            </div>
            {recentOrders.map((order) => (
              <div key={order.id} className={styles.tableRow}>
                <div>{order.id}</div>
                <div>{order.customer}</div>
                <div>{order.amount}</div>
                <div>
                  <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.quickActions}>
          <h2>Quick Actions</h2>
          <div className={styles.actionButtons}>
            <a href="/admin/products/new" className={styles.actionButton}>
              Add New Product
            </a>
            <a href="/admin/categories/new" className={styles.actionButton}>
              Add New Category
            </a>
            <a href="/admin/series/new" className={styles.actionButton}>
              Add New Series
            </a>
            <a href="/admin/orders" className={styles.actionButton}>
              View All Orders
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
