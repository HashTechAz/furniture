"use client";

import React, { useState, useEffect } from 'react';
import { getProductById, updateProduct, uploadProductImages, CreateProductPayload, BackendImage, deleteProductImage, setProductCoverImage } from '@/lib/products';
import { apiRequest } from '@/lib/api-client';
import { revalidateProducts } from '@/lib/revalidate';
import styles from '../product-form.module.css'; // CSS faylını qoşuruq

interface SimpleItem {
  id: number;
  name: string;
}

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  // Data State-ləri
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<BackendImage[]>([]); // Şəkilləri ayrıca saxlayırıq ki, anında yeniləyək

  // Dropdownlar
  const [categories, setCategories] = useState<SimpleItem[]>([]);
  const [designers, setDesigners] = useState<SimpleItem[]>([]);
  const [collections, setCollections] = useState<SimpleItem[]>([]);

  // Form State
  const [formData, setFormData] = useState<CreateProductPayload>({
    name: '', sku: '', description: '', shortDescription: '', price: 0,
    isFeatured: false, height: 0, width: 0, depth: 0, weight: 0,
    categoryId: 0, designerId: 0, collectionId: 0,
    colorIds: [], materialIds: [], roomIds: [], tagIds: [], specifications: []
  });

  // Şəkil Yükləmə State
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);

  // 1. Params-ı həll et
  useEffect(() => {
    const unwrapParams = async () => {
      const p = await params;
      setResolvedParams(p);
    };
    unwrapParams();
  }, [params]);

  // 2. Datanı Gətir
  const fetchData = async () => {
    if (!resolvedParams?.id) return;
    try {
      setLoading(true);
      const [productBackend, catsData, desData, colData] = await Promise.all([
        apiRequest<any>(`/api/Products/${resolvedParams.id}`), // BackendProduct strukturunu birbaşa alırıq
        apiRequest<SimpleItem[]>('/api/Categories').catch(() => []),
        apiRequest<SimpleItem[]>('/api/Designers').catch(() => []),
        apiRequest<SimpleItem[]>('/api/Collections').catch(() => [])
      ]);

      setCategories(catsData);
      setDesigners(desData);
      setCollections(colData);

      if (productBackend) {
        // Şəkilləri state-ə atırıq (Göstərmək üçün)
        setImages(productBackend.images || []);

        // Formu doldururuq
        setFormData({
          name: productBackend.name,
          sku: productBackend.sku || '',
          description: productBackend.description || '',
          shortDescription: productBackend.shortDescription || '',
          price: productBackend.price,
          isFeatured: false,
          height: productBackend.height,
          width: productBackend.width,
          depth: productBackend.depth,
          weight: productBackend.weight,
          categoryId: productBackend.categoryId || 0,
          designerId: productBackend.designerId || 0,
          collectionId: productBackend.collectionId || 0,
          colorIds: [], materialIds: [], roomIds: [], tagIds: [], specifications: []
        });
      }
    } catch (error) {
      console.error("Data error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [resolvedParams]);

  // --- HANDLERS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number' || e.target.tagName === 'SELECT') {
      setFormData(prev => ({ ...prev, [name]: value === '' ? 0 : parseFloat(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Məhsulu Update Etmək
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvedParams?.id) return;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return alert("Token yoxdur!");

      await updateProduct(resolvedParams.id, formData, token);
      await revalidateProducts();
      alert('✅ Məlumatlar yeniləndi!');
    } catch (error: any) {
      alert('Xəta: ' + error.message);
    }
  };

  // --- COVER ETMƏK ---
  const handleSetCover = async (imageId: number) => {
    if (!resolvedParams?.id) return;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return alert("Token yoxdur!");

      // API-yə sorğu göndəririk
      await setProductCoverImage(resolvedParams.id, imageId, token);

      alert("✅ Əsas şəkil dəyişdirildi!");

      // State-i yeniləyirik ki, yaşıl "Cover" yazısı dərhal yerini dəyişsin
      setImages(prev => prev.map(img => ({
        ...img,
        isCover: img.id === imageId // Kliklənən şəkil true olur, qalanları false
      })));

    } catch (error: any) {
      console.error(error);
      alert("Xəta: " + error.message);
    }
  };

  // --- ŞƏKİL SİLMƏK ---
  const handleDeleteImage = async (imageId: number) => {
    if (!resolvedParams?.id) return;

    const confirmDelete = window.confirm("Bu şəkli silməyə əminsiniz?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return alert("Token yoxdur!");

      // API çağırışı
      await deleteProductImage(resolvedParams.id, imageId, token);

      alert("✅ Şəkil silindi!");

      // State-dən silirik ki, səhifəni yeniləməyə ehtiyac qalmasın (Anında yox olsun)
      setImages(prev => prev.filter(img => img.id !== imageId));

    } catch (error: any) {
      console.error(error);
      alert("❌ Silinmədi: " + error.message);
    }
  };

  // --- ŞƏKİL YÜKLƏMƏ MƏNTİQİ ---
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setSelectedFiles(e.target.files);
  };

  const handleUploadImages = async () => {
    if (!selectedFiles || !resolvedParams?.id) return;

    try {
      setUploading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) return alert("Token yoxdur!");

      await uploadProductImages(resolvedParams.id, selectedFiles, token);

      alert("✅ Şəkillər yükləndi!");
      setSelectedFiles(null); // Inputu təmizlə

      // Səhifəni yeniləmədən şəkilləri təzələmək üçün datanı yenidən çəkirik
      fetchData();

    } catch (error: any) {
      alert("Xəta: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className={styles.container}>Yüklənir...</div>;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042';

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Məhsulu Redaktə Et (ID: {resolvedParams?.id})</h1>

      {/* 1. UPDATE FORMU */}
      <form onSubmit={handleUpdate} className={styles.formGrid}>

        <div className={styles.row}>
          <div>
            <label className={styles.label}>Ad <span className={styles.required}>*</span></label>
            <input className={styles.input} type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label className={styles.label}>SKU <span className={styles.required}>*</span></label>
            <input className={styles.input} type="text" name="sku" value={formData.sku} onChange={handleChange} required />
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <label className={styles.label}>Qiymət</label>
            <input className={styles.input} type="number" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div>
            <label className={styles.label}>Qısa Təsvir</label>
            <input className={styles.input} type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} />
          </div>
        </div>

        <div>
          <label className={styles.label}>Ətraflı Təsvir</label>
          <textarea className={styles.textarea} name="description" value={formData.description} onChange={handleChange} rows={4} />
        </div>

        <div className={styles.rowThree}>
          <label>
            <span className={styles.label}>Category <span className={styles.required}>*</span></span>
            <select className={styles.select} name="categoryId" value={formData.categoryId} onChange={handleChange}>
              <option value={0}>Seçin...</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label>
            <span className={styles.label}>Designer <span className={styles.required}>*</span></span>
            <select className={styles.select} name="designerId" value={formData.designerId} onChange={handleChange}>
              <option value={0}>Seçin...</option>
              {designers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </label>
          <label>
            <span className={styles.label}>Collection <span className={styles.required}>*</span></span>
            <select className={styles.select} name="collectionId" value={formData.collectionId} onChange={handleChange}>
              <option value={0}>Seçin...</option>
              {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
        </div>

        {/* Ölçülər */}
        <div className={styles.row}>
          <div><label className={styles.label}>En</label><input className={styles.input} type="number" name="width" value={formData.width} onChange={handleChange} /></div>
          <div><label className={styles.label}>Hündürlük</label><input className={styles.input} type="number" name="height" value={formData.height} onChange={handleChange} /></div>
          <div><label className={styles.label}>Dərinlik</label><input className={styles.input} type="number" name="depth" value={formData.depth} onChange={handleChange} /></div>
          <div><label className={styles.label}>Çəki</label><input className={styles.input} type="number" name="weight" value={formData.weight} onChange={handleChange} /></div>
        </div>

        <button type="submit" className={styles.submitButton}>Yadda Saxla (Update)</button>
      </form>

      {/* 2. ŞƏKİL BÖLMƏSİ (GALLERY & UPLOAD) */}
      <div className={styles.imageSection}>
        <h3 className={styles.label} style={{ fontSize: '18px' }}>Məhsulun Şəkilləri</h3>

        {/* A) Yeni Şəkil Yükləmə */}
        <div className={styles.fileInputWrapper}>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className={styles.fileInput}
          />
          <button
            onClick={handleUploadImages}
            disabled={!selectedFiles || uploading}
            className={styles.uploadButton}
          >
            {uploading ? 'Yüklənir...' : 'Yüklə (+)'}
          </button>
        </div>

        {/* B) Mövcud Şəkillər */}
        <div className={styles.gallery}>
          {images.length === 0 ? (
            <p style={{ color: '#999' }}>Şəkil yoxdur.</p>
          ) : (
            images.map((img) => (
              <div key={img.id} className={styles.imageCard}>
                {img.isCover && <span className={styles.coverBadge}>Cover</span>}
                <img
                  src={`${baseUrl}${img.imageUrl}`}
                  alt="Product"
                  className={styles.productImg}
                />
                <div className={styles.imageActions}>
                  {/* COVER DÜYMƏSİ */}
                  <button
                    type="button"
                    className={styles.actionBtn}
                    onClick={() => handleSetCover(img.id)} // <--- BU SƏTİRİ ƏLAVƏ ET
                    // Əgər artıq coverdirsə, düyməni gizlət və ya rəngini dəyiş (Optional)
                    style={{ opacity: img.isCover ? 0.5 : 1 }}
                    disabled={img.isCover}
                  >
                    {img.isCover ? 'Coverdir' : 'Cover Et'}
                  </button>

                  {/* Delete Düyməsi (Bayaq yazmışdıq) */}
                  <button
                    type="button"
                    className={styles.actionBtn}
                    style={{ color: '#f87171' }}
                    onClick={() => handleDeleteImage(img.id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}