'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createCollection } from '@/lib/collections';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from '../collections.module.css';

import { FaSave, FaLayerGroup, FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

export default function NewCollectionPage() {
  const router = useRouter();
  const { openModal } = useAdminModal();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      openModal({ type: 'error', title: 'Error', message: 'Collection Name is required!' });
      return;
    }
    if (!file) {
        openModal({ type: 'error', title: 'Missing Image', message: 'Please upload a cover image.' });
        return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken') || '';
      await createCollection(name, description, file, token);

      openModal({
        type: 'success',
        title: 'Collection Created! 🎉',
        message: 'New collection has been added successfully.',
        confirmText: 'Go to Collections',
        onConfirm: () => router.push('/admin/collections')
      });
      
    } catch (error: any) {
      console.error(error);
      openModal({ type: 'error', title: 'Failed', message: error.message || 'Could not create collection' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>New Collection</h1>
        <div className={styles.headerActions}>
          <Link href="/admin/collections" className={styles.cancelBtn}>Cancel</Link>
          <button type="submit" className={styles.saveBtn} disabled={loading}>
            <FaSave /> {loading ? 'Saving...' : 'Save Collection'}
          </button>
        </div>
      </div>

      <div className={styles.formGrid}>
        
        {/* SOL: Məlumatlar */}
        <div className={styles.card}>
          <div className={styles.cardTitle}><FaLayerGroup /> Basic Information</div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Collection Name</label>
            <input 
              type="text" className={styles.input} 
              value={name} onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. Summer 2024" required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea 
              className={styles.textarea} 
              value={description} onChange={(e) => setDescription(e.target.value)} 
              placeholder="Describe this collection..." 
            />
          </div>
        </div>

        {/* SAĞ: Şəkil */}
        <div className={styles.card}>
          <div className={styles.cardTitle}><FaCloudUploadAlt /> Cover Image</div>
          
          {!previewUrl ? (
            <label className={styles.uploadArea}>
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
              <div style={{fontSize: 28, color: '#ccc', marginBottom: 8}}><FaCloudUploadAlt /></div>
              <span style={{fontSize: 13, color: '#666', fontWeight: 500}}>Upload Cover Image</span>
            </label>
          ) : (
            <div className={styles.previewWrapper}>
              <img src={previewUrl} alt="Preview" className={styles.previewImage} />
              <button type="button" onClick={removeFile} className={styles.removeImageBtn}>
                <FaTimes />
              </button>
            </div>
          )}
        </div>

      </div>
    </form>
  );
}