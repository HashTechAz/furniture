"use client";

import React, { useState } from 'react';
import { createProduct, CreateProductPayload } from '@/lib/products';
// import styles from './create-product.module.css'; // Stil faylın varsa aç

export default function CreateProductPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Formun başlanğıc dəyərləri
  const [formData, setFormData] = useState<CreateProductPayload>({
    name: '',
    sku: '',
    description: '',
    shortDescription: '',
    price: 0,
    isFeatured: false,
    height: 0,
    width: 0,
    depth: 0,
    weight: 0,
    categoryId: 0,   // DİQQƏT: Bu 0 ola bilməz!
    designerId: 0,   // DİQQƏT: Bu 0 ola bilməz!
    collectionId: 0, // DİQQƏT: Bu 0 ola bilməz!
    colorIds: [],    
    materialIds: [],
    roomIds: [],
    tagIds: [],
    specifications: [] 
  });

  // --- DÜZƏLDİLMİŞ INPUT HANDLING (NaN XƏTASI ÜÇÜN) ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      // Əgər boşdursa 0 yazırıq, əks halda rəqəmə çeviririk
      const numValue = value === '' ? 0 : parseFloat(value);
      setFormData(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, isFeatured: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // --- ID YOXLAMASI (500 XƏTASI ÜÇÜN) ---
    // Backend 0 ID-sini qəbul etmir, mütləq real ID lazımdır
    if (formData.categoryId === 0 || formData.designerId === 0 || formData.collectionId === 0) {
       alert("Zəhmət olmasa Category, Designer və Collection ID-lərini düzgün daxil edin (0 ola bilməz)!");
       setLoading(false);
       return;
    }

    try {
      const token = localStorage.getItem('accessToken'); 

      if (!token) {
        alert("Siz admin kimi daxil olmamısınız (Token yoxdur)!");
        setLoading(false);
        return;
      }

      console.log("Göndərilən Data:", formData); // Konsolda baxmaq üçün

      await createProduct(formData, token);
      
      setMessage('✅ Məhsul uğurla yaradıldı!');
      
    } catch (error: any) {
      console.error(error);
      setMessage(`❌ Xəta baş verdi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: 'black' }}>
      <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>Yeni Məhsul Yarat</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <label>
            Ad (Name):
            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{border: '1px solid #ccc', padding: '8px', width: '100%'}} />
          </label>
          <label>
            SKU:
            <input type="text" name="sku" value={formData.sku} onChange={handleChange} required style={{border: '1px solid #ccc', padding: '8px', width: '100%'}} />
          </label>
        </div>

        <label>
          Qısa Təsvir:
          <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} style={{border: '1px solid #ccc', padding: '8px', width: '100%'}} />
        </label>

        <label>
          Tam Təsvir:
          <textarea name="description" value={formData.description} onChange={handleChange} style={{border: '1px solid #ccc', padding: '8px', width: '100%'}} rows={4} />
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <label>
            Qiymət:
            {/* value={formData.price || ''} yazırıq ki, 0 olanda boş görünsün (optional) */}
            <input type="number" name="price" value={formData.price} onChange={handleChange} required style={{border: '1px solid #ccc', padding: '8px', width: '100%'}} />
          </label>
          <label style={{display:'flex', alignItems:'center', gap: '10px'}}>
            Featured:
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleCheckbox} />
          </label>
        </div>

        <h3>Ölçülər</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
          <label>Hündürlük: <input type="number" name="height" value={formData.height} onChange={handleChange} style={{border: '1px solid #ccc', padding: '8px', width: '100%'}} /></label>
          <label>En: <input type="number" name="width" value={formData.width} onChange={handleChange} style={{border: '1px solid #ccc', padding: '8px', width: '100%'}} /></label>
          <label>Dərinlik: <input type="number" name="depth" value={formData.depth} onChange={handleChange} style={{border: '1px solid #ccc', padding: '8px', width: '100%'}} /></label>
          <label>Çəki: <input type="number" name="weight" value={formData.weight} onChange={handleChange} style={{border: '1px solid #ccc', padding: '8px', width: '100%'}} /></label>
        </div>

        <div style={{backgroundColor: '#f8d7da', padding: '10px', borderRadius: '5px', marginTop: '10px'}}>
            <strong>Vacib Qeyd:</strong> Aşağıdakı ID-lərə 0 yazmayın! Swagger-dən baxıb mövcud ID (məs: 1, 2) yazın.
        </div>

        <h3>Əlaqələr (ID)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          <label>
             Category ID: <span style={{color:'red'}}>*</span>
             <input type="number" name="categoryId" value={formData.categoryId} onChange={handleChange} required style={{border: '1px solid #ccc', padding: '8px', width: '100%'}} />
          </label>
          <label>
             Designer ID: <span style={{color:'red'}}>*</span>
             <input type="number" name="designerId" value={formData.designerId} onChange={handleChange} required style={{border: '1px solid #ccc', padding: '8px', width: '100%'}} />
          </label>
          <label>
             Collection ID: <span style={{color:'red'}}>*</span>
             <input type="number" name="collectionId" value={formData.collectionId} onChange={handleChange} required style={{border: '1px solid #ccc', padding: '8px', width: '100%'}} />
          </label>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '15px', backgroundColor: 'black', color: 'white', cursor: 'pointer', marginTop: '20px', border: 'none', borderRadius: '4px' }}
        >
          {loading ? 'Göndərilir...' : 'Məhsulu Yarat'}
        </button>

        {message && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{message}</p>}
      </form>
    </div>
  );
}