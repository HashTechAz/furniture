'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createDesigner } from '@/lib/designers';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from '../designers.module.css';

import { FaSave, FaUserTie, FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

export default function NewDesignerPage() {
  const router = useRouter();
  const { openModal } = useAdminModal();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
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
      openModal({ type: 'error', title: 'Error', message: 'Designer Name is required!' });
      return;
    }
    if (!file) {
        openModal({ type: 'error', title: 'Missing Photo', message: 'Please upload a photo for the designer.' });
        return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken') || '';
      await createDesigner(name, biography, file, token);

      openModal({
        type: 'success',
        title: 'Designer Added! 🎉',
        message: 'New designer has been added successfully.',
        confirmText: 'Go to Designers',
        onConfirm: () => router.push('/admin/designers')
      });
      
    } catch (error: any) {
      console.error(error);
      openModal({ type: 'error', title: 'Failed', message: error.message || 'Could not create designer' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>New Designer</h1>
        <div className={styles.headerActions}>
          <Link href="/admin/designers" className={styles.cancelBtn}>Cancel</Link>
          <button type="submit" className={styles.saveBtn} disabled={loading}>
            <FaSave /> {loading ? 'Saving...' : 'Save Designer'}
          </button>
        </div>
      </div>

      <div className={styles.formGrid}>
        
        {/* SOL: Məlumatlar */}
        <div className={styles.card}>
          <div className={styles.cardTitle}><FaUserTie /> Profile Info</div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name</label>
            <input 
              type="text" className={styles.input} 
              value={name} onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. John Doe" required 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Biography</label>
            <textarea 
              className={styles.textarea} 
              value={biography} onChange={(e) => setBiography(e.target.value)} 
              placeholder="Short bio about the designer..." 
            />
          </div>
        </div>

        {/* SAĞ: Şəkil */}
        <div className={styles.card}>
          <div className={styles.cardTitle}><FaCloudUploadAlt /> Profile Photo</div>
          
          {!previewUrl ? (
            <label className={styles.uploadArea}>
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
              <div style={{fontSize: 28, color: '#ccc', marginBottom: 8}}><FaCloudUploadAlt /></div>
              <span style={{fontSize: 13, color: '#666', fontWeight: 500}}>Upload Photo</span>
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