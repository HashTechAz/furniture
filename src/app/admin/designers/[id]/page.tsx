'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getDesignerById, updateDesigner } from '@/lib/designers';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from '../designers.module.css';

import { FaSave, FaUserTie, FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

export default function EditDesignerPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { openModal } = useAdminModal();

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('accessToken') || undefined;
          const data = await getDesignerById(id, token);
          setName(data.name);
          setBiography(data.biography || '');
          if(data.imageUrl) setCurrentImageUrl(data.imageUrl); 
        } catch (error) {
          console.error(error);
          openModal({ type: 'error', title: 'Error', message: 'Designer not found.' });
          router.push('/admin/designers');
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
      await updateDesigner(id, name, biography, file, token);
      
      openModal({
        type: 'success',
        title: 'Updated Successfully!',
        message: 'Designer details have been saved.',
        confirmText: 'Back to List',
        onConfirm: () => router.push('/admin/designers')
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
    return `${process.env.NEXT_PUBLIC_API_URL || 'https://furniture.hashtech.az'}${url}`;
  };

  if (initialLoading) return <div style={{padding: 40, textAlign: 'center'}}>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Edit Designer</h1>
        <div className={styles.headerActions}>
          <Link href="/admin/designers" className={styles.cancelBtn}>Cancel</Link>
          <button type="submit" className={styles.saveBtn} disabled={loading}>
            <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}><FaUserTie /> Profile Info</div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Name</label>
            <input type="text" className={styles.input} value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Biography</label>
            <textarea className={styles.textarea} value={biography} onChange={(e) => setBiography(e.target.value)} />
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}><FaCloudUploadAlt /> Profile Photo</div>
          
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
                   {currentImageUrl ? 'Change Photo' : 'Upload Photo'}
                </span>
              </label>
            </>
          )}
        </div>
      </div>
    </form>
  );
}