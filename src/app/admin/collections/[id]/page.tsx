'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getCollectionById, updateCollection } from '@/lib/collections';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from '../collections.module.css';

import { FaSave, FaLayerGroup, FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

export default function EditCollectionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { openModal } = useAdminModal();

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Data Gətir
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('accessToken') || undefined;
          const data = await getCollectionById(id, token);
          setName(data.name);
          setDescription(data.description || '');
          if(data.coverImageUrl) setCurrentImageUrl(data.coverImageUrl); 
        } catch (error) {
          console.error(error);
          openModal({ type: 'error', title: 'Error', message: 'Collection not found.' });
          router.push('/admin/collections');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchData();
    }
  }, [id, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const removeNewFile = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken') || '';
      // updateCollection funksiyası file optional qəbul edir
      await updateCollection(id, name, description, file, token);
      
      openModal({
        type: 'success',
        title: 'Updated Successfully!',
        message: 'Collection changes have been saved.',
        confirmText: 'Back to List',
        onConfirm: () => router.push('/admin/collections')
      });

    } catch (error: any) {
      openModal({ type: 'error', title: 'Error', message: error.message || 'Failed to update' });
    } finally {
      setLoading(false);
    }
  };

  const getFullImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042'}${url}`;
  };

  if (initialLoading) return <div style={{padding: 40, textAlign: 'center'}}>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Edit Collection</h1>
        <div className={styles.headerActions}>
          <Link href="/admin/collections" className={styles.cancelBtn}>Cancel</Link>
          <button type="submit" className={styles.saveBtn} disabled={loading}>
            <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}><FaLayerGroup /> Basic Information</div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Name</label>
            <input type="text" className={styles.input} value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea className={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}><FaCloudUploadAlt /> Cover Image</div>
          
          {previewUrl ? (
            <div className={styles.previewWrapper}>
              <img src={previewUrl} alt="New" className={styles.previewImage} />
              <button type="button" onClick={removeNewFile} className={styles.removeImageBtn}><FaTimes /></button>
            </div>
          ) : (
            <>
              {currentImageUrl && (
                <div className={styles.previewWrapper} style={{marginBottom: 15, borderStyle: 'solid'}}>
                  <img src={getFullImageUrl(currentImageUrl)} alt="Current" className={styles.previewImage} />
                  <span style={{position: 'absolute', bottom: 5, left: 5, background: '#111', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 4}}>Current</span>
                </div>
              )}
              
              <label className={styles.uploadArea}>
                <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                <div style={{fontSize: 28, color: '#ccc', marginBottom: 8}}><FaCloudUploadAlt /></div>
                <span style={{fontSize: 13, color: '#666', fontWeight: 500}}>
                   {currentImageUrl ? 'Change Image' : 'Upload Image'}
                </span>
              </label>
            </>
          )}
        </div>
      </div>
    </form>
  );
}