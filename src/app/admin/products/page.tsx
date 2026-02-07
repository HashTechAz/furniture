'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts, deleteProduct, FrontendProduct } from '@/lib/products';
import styles from './page.module.css';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaBoxOpen, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useAdminModal } from '@/context/admin-modal-context';

export default function AdminProducts() {
  const { openModal } = useAdminModal();
  const [products, setProducts] = useState<FrontendProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProductsData = async () => {
    setLoading(true);
    try {
      // getProducts artıq düzgün list qaytarır
      const data = await getProducts(
        { pageNumber: page, pageSize: 10, searchTerm: searchTerm || undefined }
      );
      setProducts(data);
    } catch (error) {
      console.error('Məhsullar gəlmədi:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProductsData();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [page, searchTerm]);

  const handleDelete = (id: number) => {
    openModal({
      type: 'warning',
      title: 'Delete Product?',
      message: 'Are you sure you want to delete this product? This action cannot be undone.',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        const token = localStorage.getItem('accessToken') || '';
        await deleteProduct(id, token);
        setProducts(prev => prev.filter(p => p.id !== id));
      }
    });
  };

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h1 className={styles.title}>Products</h1>
        <Link href="/admin/products/new" className={styles.addButton}>
          <FaPlus /> Add Product
        </Link>
      </div>

      <div className={styles.filtersBar}>
        <div className={styles.searchWrapper}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by product name..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableCard}>
        {loading ? (
          <div style={{ padding: '50px', textAlign: 'center', color: '#666' }}>Yüklənir...</div>
        ) : products.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#666' }}>
            <FaBoxOpen size={40} style={{ marginBottom: 10, opacity: 0.3 }} />
            <p>Heç bir məhsul tapılmadı.</p>
          </div>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr><th>Product</th><th>Price</th><th>Category</th><th>Color</th><th>Designer</th><th style={{ textAlign: 'right' }}>Actions</th></tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}><td>
                    <div className={styles.productCell}>
                      {product.mainImage ? (
                        <img src={product.mainImage} alt={product.title} className={styles.productImage} />
                      ) : (
                        <div className={styles.productImage}></div>
                      )}
                      <div>
                        <span className={styles.productName}>{product.title}</span>
                        <span className={styles.productId}>ID: #{product.id}</span>
                      </div>
                    </div>
                  </td><td><span className={styles.price}>${product.price}</span></td><td style={{ color: '#555', fontWeight: 500 }}>
                      {product.categoryName}
                    </td><td>
                      <span style={{
                        padding: '4px 8px',
                        background: '#f3f4f6',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#333'
                      }}>
                        {product.color}
                      </span>
                    </td><td style={{ color: '#555' }}>
                      {product.designer}
                    </td><td>
                      <div className={styles.actions}>
                        <Link href={`/admin/products/${product.id}`} className={`${styles.actionBtn} ${styles.editBtn}`} title="Edit">
                          <FaEdit />
                        </Link>
                        <button onClick={() => handleDelete(product.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete">
                          <FaTrash />
                        </button>
                      </div>
                    </td></tr>
                ))}
              </tbody>
            </table>

            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                <FaChevronLeft style={{ fontSize: 10 }} /> Previous
              </button>
              <span style={{ fontSize: 13, color: '#666', fontWeight: 600 }}>Page {page}</span>
              <button
                className={styles.pageBtn}
                disabled={products.length < 10}
                onClick={() => setPage(p => p + 1)}
              >
                Next <FaChevronRight style={{ fontSize: 10 }} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}