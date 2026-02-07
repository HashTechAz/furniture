'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createColor } from '@/lib/colors';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from '../colors.module.css';

import { FaSave, FaPalette } from 'react-icons/fa';

export default function NewColorPage() {
  const router = useRouter();
  const { openModal } = useAdminModal();
  const [formData, setFormData] = useState({ name: '', hexCode: '#000000' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.hexCode) {
      openModal({ type: 'error', title: 'Error', message: 'All fields are required!' });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken') || '';
      await createColor(formData, token);

      openModal({
        type: 'success',
        title: 'Color Added! 🎨',
        message: 'New color has been added successfully.',
        confirmText: 'Go to Colors',
        onConfirm: () => router.push('/admin/colors')
      });
      
    } catch (error: any) {
      console.error(error);
      openModal({ type: 'error', title: 'Failed', message: error.message || 'Could not create color' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>New Color</h1>
        <div className={styles.headerActions}>
            <Link href="/admin/colors" className={styles.cancelBtn}>Cancel</Link>
            <button form="colorForm" type="submit" className={styles.saveBtn} disabled={loading}>
              <FaSave /> {loading ? 'Saving...' : 'Save Color'}
            </button>
        </div>
      </div>

      <div className={styles.simpleCard}>
        <div className={styles.cardTitle}><FaPalette /> Color Details</div>
        
        <form id="colorForm" onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Color Name</label>
            <input 
              type="text" className={styles.input} 
              placeholder="e.g. Midnight Blue" required 
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
                placeholder="#000000"
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