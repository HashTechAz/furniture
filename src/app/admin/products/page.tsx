"use client";
import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct, FrontendProduct } from '@/lib/products';
import { revalidateProducts } from '@/lib/revalidate';
import Link from 'next/link';
import styles from './admin-products.module.css'; // CSS-i import edirik

export default function AdminProductsList() {
  const [products, setProducts] = useState<FrontendProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

const loadProducts = async (retryCount = 0) => {
  try {
    setLoading(true);
    setError(null);
    
    // DƏYİŞİKLİK: skipCache: true göndəririk
    const data = await getProducts(undefined, { skipCache: true }); 
    
    setProducts(data);
  } catch (err: any) {
    console.error('Products load error:', err);
    // Xəta idarəetməsi artıq işləyəcək, çünki getProducts [] qaytarmır, throw edir.
    if (err.message?.includes('RATE_LIMIT') || err.message?.includes('429')) {
       // ...
    } else {
      setError(`Məlumat yüklənmədi: ${err.message}`);
    }
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bu məhsulu silməyə əminsiniz?")) return;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert("Token yoxdur!");
        return;
      }
      await deleteProduct(id, token);
      await revalidateProducts();
      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert("✅ Məhsul silindi!");
      loadProducts();
    } catch (error: any) {
      alert("Xəta: " + error.message);
    }
  };

  if (loading) return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
    </div>
  );

  return (
    <div className={styles.container}>
      
      {/* BAŞLIQ */}
      <div className={styles.header}>
        <h2 className={styles.title}>Məhsullar</h2>
        <Link href="/admin/products/new" className={styles.addButton}>
          <span className={styles.plusIcon}>+</span> Yeni Məhsul
        </Link>
      </div>

      {/* Hata mesajı */}
      {error && (
        <div style={{ 
          padding: '15px', 
          marginBottom: '20px', 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffc107',
          borderRadius: '8px',
          color: '#856404'
        }}>
          <strong>⚠️ {error}</strong>
          <button 
            onClick={() => loadProducts()} 
            style={{ 
              marginLeft: '15px', 
              padding: '5px 15px', 
              backgroundColor: '#ffc107', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Yenidən yoxla
          </button>
        </div>
      )}

      {/* CƏDVƏL */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Şəkil</th>
              <th>Məhsul Adı</th>
              <th>Qiymət</th>
              <th>Kateqoriya</th>
              <th style={{textAlign: 'center'}}>Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && !loading ? (
               <tr>
                 <td colSpan={5} style={{textAlign: 'center', padding: '30px', color: '#888'}}>
                    {error ? 'Xəta baş verdi. Yenidən yoxlayın.' : 'Heç bir məhsul tapılmadı.'}
                 </td>
               </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  {/* Şəkil */}
                  <td>
                    <div className={styles.productImageWrapper}>
                      <img 
                        className={styles.productImage}
                        src={product.mainImage}
                        alt={product.title}
                      />
                    </div>
                  </td>
                  
                  {/* Ad və ID */}
                  <td>
                    <div style={{fontWeight: 'bold'}}>{product.title}</div>
                    <div style={{fontSize: '12px', color: '#999'}}>ID: {product.id}</div>
                  </td>

                  {/* Qiymət */}
                  <td>
                    <span className={styles.priceBadge}>
                      {product.price}
                    </span>
                  </td>

                  {/* Kateqoriya */}
                  <td>
                    {product.position}
                  </td>

                  {/* Düymələr */}
                  <td className={styles.actions}>
                    <Link href={`/admin/products/${product.id}`} className={`${styles.iconButton} ${styles.editIcon}`} title="Redaktə et">
                      {/* Qələm İkonu (SVG) */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>

                    <button onClick={() => handleDelete(product.id)} className={`${styles.iconButton} ${styles.deleteIcon}`} title="Sil">
                      {/* Zibil qutusu İkonu (SVG) */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}