'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts, deleteProduct, FrontendProduct } from '@/lib/products';
import { getCached, setCached } from '@/lib/admin-prefetch-cache';
import { prefetchAdminRoute } from '@/lib/admin-prefetch';
import styles from './page.module.css';
import shared from '../components/admin-shared.module.css';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaBoxOpen, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useAdminModal } from '@/context/admin-modal-context';
import AdminTableSkeleton from '../components/AdminTableSkeleton';
import { AdminCheckbox } from '../components/AdminCheckbox';

export default function AdminProducts() {
  const router = useRouter();
  const { openModal } = useAdminModal();
  const cached = getCached<FrontendProduct[]>('products');
  const canUseCache = (page: number, search: string) => page === 1 && !search;
  const [products, setProducts] = useState<FrontendProduct[]>(canUseCache(1, '') && Array.isArray(cached) ? cached : []);
  const [loading, setLoading] = useState(!(canUseCache(1, '') && cached));
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const fetchProductsData = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    try {
      const data = await getProducts(
        { pageNumber: page, pageSize: 10, searchTerm: searchTerm || undefined }
      );
      setProducts(data);
      if (canUseCache(page, searchTerm)) setCached('products', data);
    } catch (error) {
      console.error('Məhsullar gəlmədi:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isSearch = searchTerm.length > 0;
    if (isSearch) {
      const t = setTimeout(() => fetchProductsData(true), 300);
      return () => clearTimeout(t);
    }
    const useCache = canUseCache(page, searchTerm) && getCached<FrontendProduct[]>('products');
    fetchProductsData(!useCache);
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
        setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
      }
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(products.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    openModal({
      type: 'warning',
      title: 'Toplu Silinmə',
      message: `Seçilmiş ${selectedIds.length} məhsulu silmək istədiyinizə əminsiniz? Bu geriyə alına bilməz.`,
      confirmText: 'Bəli, Sil',
      cancelText: 'Ləğv et',
      onConfirm: async () => {
        const token = localStorage.getItem('accessToken') || '';
        setLoading(true);
        try {
          const results = await Promise.allSettled(
            selectedIds.map(id => deleteProduct(id, token))
          );
          
          const successIds = results
            .map((r, idx) => r.status === 'fulfilled' ? selectedIds[idx] : null)
            .filter(Boolean) as number[];
            
          setProducts(prev => prev.filter(item => !successIds.includes(item.id)));
          setSelectedIds([]);
        } catch (error) {
          console.error("Toplu silinmə xətası", error);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div className={shared.container}>
      <div className={shared.header}>
        <h1 className={shared.title}>Products</h1>
        <div className={shared.headerActions}>
          {selectedIds.length > 0 && (
            <button onClick={handleBulkDelete} className={`${shared.addButton} ${shared.bulkDeleteBtn}`}>
              <FaTrash /> Seçilmişləri Sil ({selectedIds.length})
            </button>
          )}
          <Link href="/admin/products/new" className={shared.addButton}>
            <FaPlus /> Add Product
          </Link>
        </div>
      </div>

      <div className={shared.filtersBar}>
        <div className={shared.searchWrapper}>
          <FaSearch className={shared.searchIcon} />
          <input
            type="text"
            placeholder="Search by product name..."
            className={shared.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={shared.tableCard}>
        {loading ? (
          <AdminTableSkeleton rows={8} />
        ) : products.length === 0 ? (
          <div className={shared.emptyState}>
            <FaBoxOpen size={48} className={shared.emptyStateIcon} />
            <p>Heç bir məhsul tapılmadı.</p>
          </div>
        ) : (
          <>
            <table className={shared.table}>
              <thead>
                <tr>
                  <th>
                    <AdminCheckbox
                      checked={products.length > 0 && selectedIds.length === products.length}
                      onChange={handleSelectAll}
                      indeterminate={selectedIds.length > 0 && selectedIds.length < products.length}
                      aria-label="Hamısını seç"
                    />
                  </th>
                  <th>Product</th><th>Price</th><th>Category</th><th>Color</th><th>Materials</th><th>Designer</th><th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className={selectedIds.includes(product.id) ? shared.selected : ''}>
                    <td>
                      <AdminCheckbox
                        checked={selectedIds.includes(product.id)}
                        onChange={() => handleSelectOne(product.id)}
                        aria-label={`Məhsul ${product.title} seç`}
                      />
                    </td>
                    <td>
                    <div className={styles.productCell}>
                      {product.mainImage ? (
                        <div className={styles.productImageWrapper}>
                          <Image src={product.mainImage} alt={product.title} width={48} height={48} className={styles.productImage} loading="lazy" />
                        </div>
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
                    </td><td style={{ color: '#555', maxWidth: 140 }}>
                      {product.specifications?.material ?? '—'}
                    </td><td style={{ color: '#555' }}>
                      {product.designer}
                    </td>                    <td>
                      <div className={shared.actions}>
                        <Link
                          href={`/admin/products/${product.id}`}
                          className={`${shared.actionBtn} ${shared.editBtn}`}
                          title="Edit"
                          onMouseEnter={() => router.prefetch(`/admin/products/${product.id}`)}
                        >
                          <FaEdit />
                        </Link>
                        <button onClick={() => handleDelete(product.id)} className={`${shared.actionBtn} ${shared.deleteBtn}`} title="Delete">
                          <FaTrash />
                        </button>
                      </div>
                    </td></tr>
                ))}
              </tbody>
            </table>

            <div className={shared.pagination}>
              <button
                className={shared.pageBtn}
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                <FaChevronLeft style={{ fontSize: 10 }} /> Previous
              </button>
              <span style={{ fontSize: 14, color: '#6b7280', fontWeight: 600 }}>Page {page}</span>
              <button
                className={shared.pageBtn}
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