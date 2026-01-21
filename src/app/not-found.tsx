import Link from 'next/link';
import styles from './not-found.module.css';
import FurnitureIcon from '@/components/Loader/FurnitureIcon';

export default function NotFound() {
  return (
    <div className={styles.container}>
      {/* Arxa Plan Dekorasyonları */}
      <div className={styles.bigTextBg}>404</div>
      <div className={styles.circleOne}></div>
      <div className={styles.circleTwo}></div>

      {/* Mərkəzi Kart */}
      <div className={styles.contentCard}>
        <div className={styles.iconWrapper}>
          <FurnitureIcon className={styles.icon} />
        </div>

        <h1 className={styles.title}>Out of Place</h1>
        
        <p className={styles.description}>
          The furniture you are looking for has been moved or doesn't exist. 
          Let's get you back to comfort.
        </p>

        <Link href="/" className={styles.homeButton}>
          Return Home
        </Link>
      </div>
    </div>
  );
}
