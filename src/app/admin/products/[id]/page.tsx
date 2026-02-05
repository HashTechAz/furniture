'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import styles from '../product-form.module.css';

import { 
  getProductById, updateProduct, uploadProductImages, deleteProductImage, 
  setProductCoverImage, FrontendProduct 
} from '@/lib/products';
import { getCategories } from '@/lib/categories';
import { getDesigners } from '@/lib/designers';
import { getCollections } from '@/lib/collections';
import { getColors } from '@/lib/colors';

import { FaSave, FaTimes, FaCloudUploadAlt, FaCube, FaTag, FaPalette, FaRulerCombined, FaTrash, FaArrowLeft, FaStar, FaRegStar } from 'react-icons/fa';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [categories, setCategories] = useState<any[]>([]);
  const [designers, setDesigners] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: '', sku: '', description: '', shortDescription: '', price: 0,
    isFeatured: false, width: 0, height: 0, depth: 0, weight: 0,
    categoryId: 0, designerId: 0, collectionId: 0, selectedColorIds: [] as number[]
  });

  // Mövcud Şəkillər: { id, url, isCover }
  // DİQQƏT: FrontendProduct-dan əsl ID-ləri almaq üçün backend strukturuna uyğunlaşdırmalıyıq.
  // Hələlik FrontendProduct tipində `galleryImages` string array-dir. 
  // Biz güman edirik ki, BackendProduct tipindən data gəlir və biz onu 'existingImages' kimi saxlayırıq.
  const [existingImages, setExistingImages] = useState<{ id: number; imageUrl: string; isCover: boolean }[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cats, des, cols, colsList] = await Promise.all([
          getCategories(),
          getDesigners(),
          getCollections(),
          getColors()
        ]);
        setCategories(Array.isArray(cats) ? cats : []);
        setDesigners(Array.isArray(des) ? des : []);
        setCollections(Array.isArray(cols) ? cols : []);
        setColors(Array.isArray(colsList) ? colsList : []);

        if (productId) {
          const token = localStorage.getItem('accessToken') || '';
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7042";
          const res = await fetch(`${baseUrl}/api/Products/${productId}`, { cache: 'no-store' });
          if(res.ok) {
              const product = await res.json();
                const categoryId = product.categoryId ?? product.category?.id ?? 0;
                const designerId = product.designerId ?? product.designer?.id ?? 0;
                const collectionId = product.collectionId ?? product.collection?.id ?? 0;
                setFormData({
                name: product.name,
                sku: product.sku || '',
                description: product.description || '',
                shortDescription: product.shortDescription || '',
                price: product.price,
                isFeatured: false, // Backend-də varsa əlavə et
                width: product.width || 0,
                height: product.height || 0,
                depth: product.depth || 0,
                weight: product.weight || 0,
                categoryId,
                designerId,
                collectionId,
                selectedColorIds: product.colors ? product.colors.map((c: any) => c.id) : []
              });

              setExistingImages(product.images || []);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setInitialLoading(false);
      }
    }
    fetchData();
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number') setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    else setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => setFormData(prev => ({ ...prev, isFeatured: !prev.isFeatured }));

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const colorId = parseInt(e.target.value);
    if (colorId && !formData.selectedColorIds.includes(colorId)) {
      setFormData(prev => ({ ...prev, selectedColorIds: [...prev.selectedColorIds, colorId] }));
    }
  };

  const removeColor = (id: number) => {
    setFormData(prev => ({ ...prev, selectedColorIds: prev.selectedColorIds.filter(c => c !== id) }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewFiles(prev => [...prev, ...filesArray]);
      const previews = filesArray.map(file => URL.createObjectURL(file));
      setNewPreviews(prev => [...prev, ...previews]);
    }
  };

  const removeNewFile = (index: number) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
    setNewPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = async (imageId: number) => {
    if(!window.confirm("Delete this image?")) return;
    try {
        const token = localStorage.getItem('accessToken') || '';
        await deleteProductImage(productId, imageId, token);
        setExistingImages(prev => prev.filter(img => img.id !== imageId));
    } catch (e) {
        alert("Failed to delete image");
    }
  };

  // *** SET COVER FUNCTION ***
  const handleSetCover = async (imageId: number) => {
    try {
        const token = localStorage.getItem('accessToken') || '';
        await setProductCoverImage(productId, imageId, token);
        
        // UI Yenilə
        setExistingImages(prev => prev.map(img => ({
            ...img,
            isCover: img.id === imageId // Yalnız seçilən true olsun
        })));
        alert("Cover image updated! 🌟");
    } catch (e) {
        console.error(e);
        alert("Failed to set cover image.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken') || '';
      const { selectedColorIds, ...rest } = formData;
      const payload = { ...rest, colorIds: selectedColorIds, materialIds: [], roomIds: [], tagIds: [], specifications: [] };
      await updateProduct(productId, payload, token);

      if (newFiles.length > 0) {
        const fileList = new DataTransfer();
        newFiles.forEach(file => fileList.items.add(file));
        await uploadProductImages(productId, fileList.files, token);
      }

      alert("Product updated! ✅");
      // Səhifəni yenilə ki, yeni şəkillər də existing siyahısına düşsün
      window.location.reload(); 
      
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <div style={{padding: 40, textAlign: 'center'}}>Loading...</div>;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7042";

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.header}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <h1 className={styles.title}>Edit Product</h1>
        </div>
        <div className={styles.headerActions}>
          <Link href="/admin/products" className={styles.cancelBtn}>Cancel</Link>
          <button type="submit" className={styles.saveBtn} disabled={loading}><FaSave /> {loading ? 'Saving...' : 'Save Changes'}</button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.leftColumn}>
          <div className={styles.card}>
            <div className={styles.cardTitle}><FaCube /> Basic Info</div>
            <div className={styles.formGroup}><label className={styles.label}>Name</label><input type="text" name="name" className={styles.input} value={formData.name} onChange={handleChange} required /></div>
            <div className={styles.formGroup}><label className={styles.label}>Description</label><textarea name="description" className={styles.textarea} value={formData.description} onChange={handleChange} /></div>
            <div className={styles.formGroup}><label className={styles.label}>Short Desc</label><input type="text" name="shortDescription" className={styles.input} value={formData.shortDescription} onChange={handleChange} /></div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}><FaCloudUploadAlt /> Media</div>
            
            {/* Mövcud Şəkillər */}
            {existingImages.length > 0 && (
                <div style={{marginBottom: 20}}>
                    <label className={styles.label}>Existing Images (Click Star to Set Cover)</label>
                    <div className={styles.imageGrid}>
                        {existingImages.map((img) => (
                        <div key={img.id} className={styles.previewItem} style={{
                            borderColor: img.isCover ? '#fbbf24' : '#eaeaea',
                            borderWidth: img.isCover ? '2px' : '1px'
                        }}>
                            <img src={`${baseUrl}${img.imageUrl}`} alt="Existing" className={styles.previewImage} />
                            
                            {/* Delete */}
                            <button type="button" onClick={() => removeExistingImage(img.id)} className={styles.removeImageBtn}>
                                <FaTrash />
                            </button>

                            {/* SET COVER BTN */}
                            <button 
                                type="button" 
                                onClick={() => handleSetCover(img.id)} 
                                style={{
                                    position: 'absolute', bottom: 5, right: 5,
                                    background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
                                    width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', color: img.isCover ? '#fbbf24' : '#ccc',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                                title="Set as Cover"
                            >
                                {img.isCover ? <FaStar /> : <FaRegStar />}
                            </button>

                            {img.isCover && <span style={{position: 'absolute', top: 5, left: 5, background: '#fbbf24', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 700}}>Cover</span>}
                        </div>
                        ))}
                    </div>
                </div>
            )}

            <label className={styles.uploadArea}>
              <input type="file" multiple accept="image/*" hidden onChange={handleFileChange} />
              <div className={styles.uploadIcon}><FaCloudUploadAlt /></div>
              <div className={styles.uploadText}>Upload New Images</div>
            </label>

            {newPreviews.length > 0 && (
                 <div style={{marginTop: 20}}>
                    <label className={styles.label}>New Uploads (Save to add)</label>
                    <div className={styles.imageGrid}>
                        {newPreviews.map((url, index) => (
                        <div key={index} className={styles.previewItem} style={{border: '1px dashed #2563eb'}}>
                            <img src={url} alt="New" className={styles.previewImage} />
                            <button type="button" onClick={() => removeNewFile(index)} className={styles.removeImageBtn}><FaTimes /></button>
                        </div>
                        ))}
                    </div>
                 </div>
            )}
          </div>

          <div className={styles.card}>
             <div className={styles.cardTitle}><FaRulerCombined /> Dimensions</div>
             <div className={styles.dimensionsGrid}>
                <div className={styles.formGroup}><label className={styles.label}>W</label><input type="number" name="width" className={styles.input} value={formData.width} onChange={handleChange} /></div>
                <div className={styles.formGroup}><label className={styles.label}>H</label><input type="number" name="height" className={styles.input} value={formData.height} onChange={handleChange} /></div>
                <div className={styles.formGroup}><label className={styles.label}>D</label><input type="number" name="depth" className={styles.input} value={formData.depth} onChange={handleChange} /></div>
             </div>
             <div className={styles.formGroup}><label className={styles.label}>Weight</label><input type="number" name="weight" className={styles.input} value={formData.weight} onChange={handleChange} /></div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Status & Price</div>
            <div className={styles.formGroup}>
               <div className={styles.toggleWrapper} onClick={handleToggle}>
                 <input type="checkbox" checked={formData.isFeatured} readOnly className={styles.checkbox}/>
                 <span>Featured</span>
               </div>
            </div>
            <div className={styles.formGroup}><label className={styles.label}>Price</label><input type="number" name="price" className={styles.input} value={formData.price} onChange={handleChange} /></div>
            <div className={styles.formGroup}><label className={styles.label}>SKU</label><input type="text" name="sku" className={styles.input} value={formData.sku} onChange={handleChange} /></div>
          </div>

          <div className={styles.card}>
             <div className={styles.cardTitle}><FaTag /> Organization</div>
             <div className={styles.formGroup}>
                <label className={styles.label}>Category</label>
                <select name="categoryId" className={styles.select} value={formData.categoryId} onChange={handleChange}>
                  <option value={0}>Select...</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
             </div>
             <div className={styles.formGroup}>
                <label className={styles.label}>Designer</label>
                <select name="designerId" className={styles.select} value={formData.designerId} onChange={handleChange}>
                  <option value={0}>Select...</option>
                  {designers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
             </div>
             <div className={styles.formGroup}>
                <label className={styles.label}>Collection</label>
                <select name="collectionId" className={styles.select} value={formData.collectionId} onChange={handleChange}>
                  <option value={0}>Select...</option>
                  {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
             </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardTitle}><FaPalette /> Colors</div>
            <div className={styles.formGroup}>
              <select className={styles.select} onChange={handleColorChange} value=""><option value="">Add Color...</option>{colors.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
            </div>
            <div className={styles.tagsContainer}>
              {formData.selectedColorIds.map(id => {
                const color = colors.find(c => c.id === id);
                return color ? (<div key={id} className={styles.tag}><span style={{width: 10, height: 10, background: color.hexCode, borderRadius: '50%', border: '1px solid #ddd'}}></span>{color.name}<span className={styles.removeTag} onClick={() => removeColor(id)}>×</span></div>) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}