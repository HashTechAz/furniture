'use client';

import { useEffect } from 'react';
import styles from './page.module.css'; // Opsional olaraq stil veririk

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Kataloq səhifəsində xəta baş verdi:', error);
  }, [error]);

  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>Kataloq Yüklənmədi</h2>
      <p style={{ color: '#666', marginBottom: '24px', maxWidth: '500px' }}>
        Məhsulları gətirərkən xəta baş verdi (Server xətası ola bilər və ya internetiniz zəifdir). Zəhmət olmasa yenidən cəhd edin.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '12px 24px',
          backgroundColor: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Yenidən yoxla
      </button>
    </div>
  );
}
