'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../product-form.module.css';

import { createProduct, uploadProductImages } from '@/lib/products';
import { getCategories } from '@/lib/categories';
import { getDesigners } from '@/lib/designers';
import { getCollections } from '@/lib/collections';
import { getColors } from '@/lib/colors';
import { getMaterials } from '@/lib/materials';

// YENİ: Modal Hook
import { useAdminModal } from '@/context/admin-modal-context';

import { FaSave, FaTimes, FaCloudUploadAlt, FaCube, FaTag, FaPalette, FaRulerCombined, FaStar, FaRegStar } from 'react-icons/fa';

export default function CreateProductPage() {
  const router = useRouter();
  const { openModal } = useAdminModal(); // <--- Modal Hook

  const [loading, setLoading] = useState(false);
  const [fetchingOptions, setFetchingOptions] = useState(true);

  // Data State-ləri
  const [categories, setCategories] = useState<any[]>([]);
  const [designers, setDesigners] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: '', sku: '', description: '', shortDescription: '', price: 0,
    isFeatured: false, width: 0, height: 0, depth: 0, weight: 0,
    categoryId: 0, designerId: 0, collectionId: 0,
    selectedColorIds: [] as number[],
    selectedMaterialIds: [] as number[]
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [coverIndex, setCoverIndex] = useState<number>(0);

  // Seçimləri gətir
  useEffect(() => {
    async function fetchData() {
      try {
        const [cats, des, cols, colsList, mats] = await Promise.all([
          getCategories(), getDesigners(), getCollections(), getColors(), getMaterials()
        ]);
        setCategories(Array.isArray(cats) ? cats : []);
        setDesigners(Array.isArray(des) ? des : []);
        setCollections(Array.isArray(cols) ? cols : []);
        setColors(Array.isArray(colsList) ? colsList : []);
        setMaterials(Array.isArray(mats) ? mats : []);
      } catch (error) {
        console.error(error);
      } finally {
        setFetchingOptions(false);
      }
    }
    fetchData();
  }, []);

  // Input dəyişmə
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number') setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    else setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleToggle = () => setFormData(prev => ({ ...prev, isFeatured: !prev.isFeatured }));

  // Rəng və Fayl funksiyaları (Eyni qalır)
  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const colorId = parseInt(e.target.value);
    if (colorId && !formData.selectedColorIds.includes(colorId)) {
      setFormData(prev => ({ ...prev, selectedColorIds: [...prev.selectedColorIds, colorId] }));
    }
  };
  const removeColor = (id: number) => setFormData(prev => ({ ...prev, selectedColorIds: prev.selectedColorIds.filter(c => c !== id) }));
  const handleMaterialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    if (id && !formData.selectedMaterialIds.includes(id)) {
      setFormData(prev => ({ ...prev, selectedMaterialIds: [...prev.selectedMaterialIds, id] }));
    }
  };
  const removeMaterial = (id: number) => setFormData(prev => ({ ...prev, selectedMaterialIds: prev.selectedMaterialIds.filter(m => m !== id) }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviews]);
    }
  };
  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    if (index === coverIndex) setCoverIndex(0);
    if (index < coverIndex) setCoverIndex(prev => prev - 1);
  };
  const handleSetCover = (index: number) => setCoverIndex(index);

  // *** SAVE PROCESS (MODAL İLƏ) ***
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      openModal({ type: 'error', title: 'Missing Info', message: 'Name and Price are required!' });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken') || '';

      const payload = { ...formData, colorIds: formData.selectedColorIds, materialIds: formData.selectedMaterialIds, roomIds: [], tagIds: [], specifications: [] };
      const createdProduct: any = await createProduct(payload, token);

      if (selectedFiles.length > 0 && createdProduct?.id) {
        const fileList = new DataTransfer();
        if (selectedFiles[coverIndex]) fileList.items.add(selectedFiles[coverIndex]);
        selectedFiles.forEach((file, index) => {
          if (index !== coverIndex) fileList.items.add(file);
        });
        await uploadProductImages(createdProduct.id, fileList.files, token);
      }

      // UĞURLU MODAL
      openModal({
        type: 'success',
        title: 'Product Created! 🎉',
        message: 'The new product has been successfully added to your catalog.',
        confirmText: 'Go to Products',
        onConfirm: () => router.push('/admin/products') // Basanda yönləndirir
      });

    } catch (error: any) {
      console.error(error);
      openModal({ type: 'error', title: 'Error', message: error.message || "Failed to create product" });
    } finally {
      setLoading(false);
    }
  };

  if (fetchingOptions) return <div style={{ padding: 40 }}>Loading options...</div>;

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Create New Product</h1>
        <div className={styles.headerActions}>
          <Link href="/admin/products" className={styles.cancelBtn}>Cancel</Link>
          <button type="submit" className={styles.saveBtn} disabled={loading}>
            <FaSave /> {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </div>

      {/* Grid Layout (Sol/Sağ) - EYNİ QALIR */}
      <div className={styles.grid}>
        <div className={styles.leftColumn}>
          <div className={styles.card}>
            <div className={styles.cardTitle}><FaCube /> Basic Information</div>
            <div className={styles.formGroup}><label className={styles.label}>Product Name</label><input type="text" name="name" className={styles.input} value={formData.name} onChange={handleChange} required /></div>
            <div className={styles.formGroup}><label className={styles.label}>Description</label><textarea name="description" className={styles.textarea} value={formData.description} onChange={handleChange} /></div>
            <div className={styles.formGroup}><label className={styles.label}>Short Description</label><input type="text" name="shortDescription" className={styles.input} value={formData.shortDescription} onChange={handleChange} /></div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}><FaCloudUploadAlt /> Media</div>
            <label className={styles.uploadArea}>
              <input type="file" multiple accept="image/*" hidden onChange={handleFileChange} />
              <div className={styles.uploadIcon}><FaCloudUploadAlt /></div>
              <div className={styles.uploadText}>Click to upload images</div>
              <div className={styles.uploadSubtext}>Select the star to set as cover</div>
            </label>
            {previewUrls.length > 0 && (
              <div className={styles.imageGrid}>
                {previewUrls.map((url, index) => (
                  <div key={index} className={styles.previewItem} style={{ borderColor: index === coverIndex ? '#fbbf24' : '#eaeaea', borderWidth: index === coverIndex ? '2px' : '1px' }}>
                    <img src={url} alt="Preview" className={styles.previewImage} />
                    <button type="button" onClick={() => removeFile(index)} className={styles.removeImageBtn}><FaTimes /></button>
                    <button type="button" onClick={() => handleSetCover(index)} style={{ position: 'absolute', bottom: 5, right: 5, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: index === coverIndex ? '#fbbf24' : '#ccc', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{index === coverIndex ? <FaStar /> : <FaRegStar />}</button>
                    {index === coverIndex && <span style={{ position: 'absolute', top: 5, left: 5, background: '#fbbf24', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>Cover</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}><FaRulerCombined /> Dimensions & Weight</div>
            <div className={styles.dimensionsGrid}>
              <div className={styles.formGroup}><label className={styles.label}>Width</label><input type="number" name="width" className={styles.input} value={formData.width} onChange={handleChange} /></div>
              <div className={styles.formGroup}><label className={styles.label}>Height</label><input type="number" name="height" className={styles.input} value={formData.height} onChange={handleChange} /></div>
              <div className={styles.formGroup}><label className={styles.label}>Depth</label><input type="number" name="depth" className={styles.input} value={formData.depth} onChange={handleChange} /></div>
            </div>
            <div className={styles.formGroup}><label className={styles.label}>Weight</label><input type="number" name="weight" className={styles.input} value={formData.weight} onChange={handleChange} /></div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Status & Price</div>
            <div className={styles.formGroup}><div className={styles.toggleWrapper} onClick={handleToggle}><input type="checkbox" checked={formData.isFeatured} readOnly className={styles.checkbox} /><span>Featured Product</span></div></div>
            <div className={styles.formGroup}><label className={styles.label}>Price</label><input type="number" name="price" className={styles.input} value={formData.price} onChange={handleChange} required /></div>
            <div className={styles.formGroup}><label className={styles.label}>SKU</label><input type="text" name="sku" className={styles.input} value={formData.sku} onChange={handleChange} /></div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}><FaTag /> Organization</div>
            <div className={styles.formGroup}><label className={styles.label}>Category</label><select name="categoryId" className={styles.select} value={formData.categoryId} onChange={handleChange}><option value={0}>Select Category</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            <div className={styles.formGroup}><label className={styles.label}>Designer</label><select name="designerId" className={styles.select} value={formData.designerId} onChange={handleChange}><option value={0}>Select Designer</option>{designers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</select></div>
            <div className={styles.formGroup}><label className={styles.label}>Collection</label><select name="collectionId" className={styles.select} value={formData.collectionId} onChange={handleChange}><option value={0}>Select Collection</option>{collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}><FaPalette /> Colors</div>
            <div className={styles.formGroup}><label className={styles.label}>Add Color</label><select className={styles.select} onChange={handleColorChange} value=""><option value="">Choose color...</option>{colors.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            <div className={styles.tagsContainer}>
              {formData.selectedColorIds.map(id => {
                const color = colors.find(c => c.id === id);
                return color ? (<div key={id} className={styles.tag}><span style={{ width: 10, height: 10, background: color.hexCode, borderRadius: '50%', border: '1px solid #ddd' }}></span>{color.name}<span className={styles.removeTag} onClick={() => removeColor(id)}>×</span></div>) : null;
              })}
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}><FaCube /> Materials</div>
            <div className={styles.formGroup}><label className={styles.label}>Add Material</label><select className={styles.select} onChange={handleMaterialChange} value=""><option value="">Choose material...</option>{materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</select></div>
            <div className={styles.tagsContainer}>
              {formData.selectedMaterialIds.map(id => {
                const material = materials.find(m => m.id === id);
                return material ? (<div key={id} className={styles.tag}>{material.name}<span className={styles.removeTag} onClick={() => removeMaterial(id)}>×</span></div>) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}