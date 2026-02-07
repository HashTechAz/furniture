'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getColorById, updateColor } from '@/lib/colors';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from '../colors.module.css';

import { FaSave, FaPalette } from 'react-icons/fa';

export default function EditColorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { openModal } = useAdminModal();

  const [formData, setFormData] = useState({ name: '', hexCode: '' });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Data Gətir
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          const data = await getColorById(id, token || undefined);
          setFormData({ name: data.name, hexCode: data.hexCode });
        } catch (error) {
          console.error('Color not found', error);
          openModal({ type: 'error', title: 'Error', message: 'Color not found.' });
          router.push('/admin/colors');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchData();
    }
  }, [id, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken') || '';
      await updateColor(id, formData, token);

      openModal({
        type: 'success',
        title: 'Updated Successfully!',
        message: 'Color details have been saved.',
        confirmText: 'Back to List',
        onConfirm: () => router.push('/admin/colors')
      });

    } catch (error: any) {
      openModal({ type: 'error', title: 'Error', message: error.message || 'Failed to update' });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <div style={{padding: 40, textAlign: 'center'}}>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Edit Color</h1>
        <div className={styles.headerActions}>
            <Link href="/admin/colors" className={styles.cancelBtn}>Cancel</Link>
            <button form="editColorForm" type="submit" className={styles.saveBtn} disabled={loading}>
              <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
      </div>

      <div className={styles.simpleCard}>
        <div className={styles.cardTitle}><FaPalette /> Color Details</div>
        
        <form id="editColorForm" onSubmit={handleUpdate}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Color Name</label>
            <input 
              type="text" className={styles.input} 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Hex Code</label>
            <div className={styles.colorPickerWrapper}>
              <input 
                type="color" className={styles.colorInput}
                value={formData.hexCode}
                onChange={(e) => setFormData({...formData, hexCode: e.target.value})}
              />
              <input 
                type="text" className={styles.input} 
                value={formData.hexCode}
                onChange={(e) => setFormData({...formData, hexCode: e.target.value})}
                pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                required
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}