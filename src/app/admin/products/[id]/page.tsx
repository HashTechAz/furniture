"use client";

import React, { useState, useEffect, useRef } from 'react';
import { updateProduct, uploadProductImages, CreateProductPayload, BackendImage, deleteProductImage, setProductCoverImage } from '@/lib/products';
import { getColors, BackendColor } from '@/lib/colors'; // <--- YENİ IMPORT
import { apiRequest } from '@/lib/api-client';
import { revalidateProducts } from '@/lib/revalidate';
import styles from '../product-form.module.css';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  // Data State-ləri
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<BackendImage[]>([]);
  
  // QIFIL (Double fetch qarşısını almaq üçün)
  const isFetching = useRef(false); 
  const hasFetched = useRef(false);

  // Dropdownlar və Checkboxlar
  const [categories, setCategories] = useState<SimpleItem[]>([]);
  const [designers, setDesigners] = useState<SimpleItem[]>([]);
  const [collections, setCollections] = useState<SimpleItem[]>([]);
  const [colors, setColors] = useState<BackendColor[]>([]); // <--- YENİ STATE

  // Form State
  const [formData, setFormData] = useState<CreateProductPayload>({
    name: '', sku: '', description: '', shortDescription: '', price: 0,
    isFeatured: false, height: 0, width: 0, depth: 0, weight: 0,
    categoryId: 0, designerId: 0, collectionId: 0,
    colorIds: [], // <--- Bu sahəni idarə edəcəyik
    materialIds: [], roomIds: [], tagIds: [], specifications: []
  });

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
  const fetchData = async (id: string) => {
    if (isFetching.current || hasFetched.current) return;

    isFetching.current = true;
    setLoading(true);

    try {
      console.log(`📦 Məhsul gətirilir: ${id}`);
      
      // 1. Məhsulun özü
      const productBackend = await apiRequest<any>(`/api/Products/${id}`);
      console.log("🔥 Backend-dən gələn məhsul:", productBackend);

      if (productBackend) {
        setImages(productBackend.images || []);

        const catId = productBackend.categoryId ?? productBackend.CategoryId ?? productBackend.category?.id ?? 0;
        const desId = productBackend.designerId ?? productBackend.DesignerId ?? productBackend.designer?.id ?? 0;
        const colId = productBackend.collectionId ?? productBackend.CollectionId ?? productBackend.collection?.id ?? 0;

        setFormData({
          name: productBackend.name || '',
          sku: productBackend.sku || '',
          description: productBackend.description || '',
          shortDescription: productBackend.shortDescription || '',
          price: productBackend.price || 0,
          isFeatured: productBackend.isFeatured || false,
          height: productBackend.height || 0,
          width: productBackend.width || 0,
          depth: productBackend.depth || 0,
          weight: productBackend.weight || 0,
          categoryId: catId,
          designerId: desId,
          collectionId: colId,
          colorIds: productBackend.colorIds || [], // Rəngləri yükləyirik
          materialIds: productBackend.materialIds || [], 
          roomIds: productBackend.roomIds || [], 
          tagIds: productBackend.tagIds || [], 
          specifications: productBackend.specifications || []
        });
      }

      // 2. Dropdownlar və Rənglər (Ardıcıl yükləyirik - Rate Limit olmasın)
      await new Promise(r => setTimeout(r, 100));

      const catsData = await apiRequest<SimpleItem[]>('/api/Categories').catch(() => []);
      setCategories(catsData);

      const desData = await apiRequest<SimpleItem[]>('/api/Designers').catch(() => []);
      setDesigners(desData);

      const colData = await apiRequest<SimpleItem[]>('/api/Collections').catch(() => []);
      setCollections(colData);

      // YENİ: Rəngləri gətiririk
      const colorsData = await getColors().catch(() => []);
      setColors(colorsData);

      hasFetched.current = true;

    } catch (error) {
      console.error("Critical Data error:", error);
      hasFetched.current = false; 
    } finally {
      isFetching.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resolvedParams?.id) {
      if (hasFetched.current) {
         // Artıq yüklənibsə heç nə etmə
      }
      fetchData(resolvedParams.id);
    }
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

  // YENİ: Rəng seçimi (Checkbox logic)
  const handleColorChange = (colorId: number) => {
    setFormData(prev => {
      const currentColors = prev.colorIds || [];
      if (currentColors.includes(colorId)) {
        // Varsa çıxar (Uncheck)
        return { ...prev, colorIds: currentColors.filter(id => id !== colorId) };
      } else {
        // Yoxdursa əlavə et (Check)
        return { ...prev, colorIds: [...currentColors, colorId] };
      }
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvedParams?.id) return;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return alert("Token yoxdur!");

      console.log("Update Data:", formData);
      await updateProduct(resolvedParams.id, formData, token);
      await revalidateProducts();
      
      alert('✅ Məlumatlar yeniləndi!');
      
      router.push('/admin/products');
      router.refresh(); 
      
    } catch (error: any) {
      alert('Xəta: ' + error.message);
    }
  };

  const handleSetCover = async (imageId: number) => {
    if (!resolvedParams?.id) return;
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return alert("Token yoxdur!");
      await setProductCoverImage(resolvedParams.id, imageId, token);
      alert("✅ Əsas şəkil dəyişdirildi!");
      setImages(prev => prev.map(img => ({ ...img, isCover: img.id === imageId })));
    } catch (error: any) {
      alert("Xəta: " + error.message);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!resolvedParams?.id) return;
    if (!window.confirm("Bu şəkli silməyə əminsiniz?")) return;
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return alert("Token yoxdur!");
      await deleteProductImage(resolvedParams.id, imageId, token);
      alert("✅ Şəkil silindi!");
      setImages(prev => prev.filter(img => img.id !== imageId));
    } catch (error: any) {
      alert("❌ Silinmədi: " + error.message);
    }
  };

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
      setSelectedFiles(null);
      
      const productBackend = await apiRequest<any>(`/api/Products/${resolvedParams.id}`);
      if (productBackend) setImages(productBackend.images || []);

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

      <form onSubmit={handleUpdate} className={styles.formGrid}>
        {/* Ümumi Məlumatlar */}
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

        {/* Dropdown Seçimləri */}
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

        {/* YENİ: Rəng Seçimi */}
        <div style={{ margin: '20px 0', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
          <label className={styles.label} style={{ marginBottom: '10px', display: 'block' }}>Mövcud Rənglər (Seçin)</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
            {colors.map(color => (
              <label key={color.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                <input 
                  type="checkbox" 
                  checked={formData.colorIds?.includes(color.id) || false}
                  onChange={() => handleColorChange(color.id)}
                />
                <span style={{ 
                  width: '20px', 
                  height: '20px', 
                  backgroundColor: color.hexCode, 
                  borderRadius: '50%', 
                  border: '1px solid #ccc',
                  display: 'inline-block'
                }}></span>
                {color.name}
              </label>
            ))}
          </div>
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

      {/* Şəkil Bölməsi */}
      <div className={styles.imageSection}>
        <h3 className={styles.label} style={{ fontSize: '18px' }}>Məhsulun Şəkilləri</h3>
        <div className={styles.fileInputWrapper}>
          <input type="file" multiple accept="image/*" onChange={handleFileSelect} className={styles.fileInput} />
          <button onClick={handleUploadImages} disabled={!selectedFiles || uploading} className={styles.uploadButton}>
            {uploading ? 'Yüklənir...' : 'Yüklə (+)'}
          </button>
        </div>

        <div className={styles.gallery}>
          {images.length === 0 ? (
            <p style={{ color: '#999' }}>Şəkil yoxdur.</p>
          ) : (
            images.map((img) => (
              <div key={img.id} className={styles.imageCard}>
                {img.isCover && <span className={styles.coverBadge}>Cover</span>}
                <img src={`${baseUrl}${img.imageUrl}`} alt="Product" className={styles.productImg} />
                <div className={styles.imageActions}>
                  <button type="button" className={styles.actionBtn} onClick={() => handleSetCover(img.id)} style={{ opacity: img.isCover ? 0.5 : 1 }} disabled={img.isCover}>
                    {img.isCover ? 'Coverdir' : 'Cover Et'}
                  </button>
                  <button type="button" className={styles.actionBtn} style={{ color: '#f87171' }} onClick={() => handleDeleteImage(img.id)}>
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