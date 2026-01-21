'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './error.module.css';
import FurnitureIcon from '@/components/Loader/FurnitureIcon';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      {/* Dekorativ Arxa Plan */}
      <div className={styles.decorationLine}></div>
      <div className={styles.glowEffect}></div>

      <div className={styles.errorCard}>
        <div className={styles.iconContainer}>
            <div className={styles.errorGlow}></div>
            <FurnitureIcon className={styles.icon} />
        </div>

        <h2 className={styles.title}>Structural Issue Detected</h2>
        
        <p className={styles.description}>
          We encountered an unexpected problem while assembling this page. 
          Our craftsmen have been notified. Please try rebuilding the view.
        </p>

        <div className={styles.buttonGroup}>
          <button
            className={styles.retryButton}
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Rebuild Page
          </button>
          
          <Link href="/" className={styles.homeButton}>
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
