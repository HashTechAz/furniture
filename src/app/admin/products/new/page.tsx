// src/app/admin/products/new/page.tsx
"use client";

import React, { useState } from 'react';
import { createProduct, CreateProductPayload } from '@/lib/products';
import styles from './create-product.module.css'; // Stil faylı yaratmaq lazımdır, aşağıda verəcəm

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
    categoryId: 0,   // Backend-dən ID gözləyir
    designerId: 0,   // Backend-dən ID gözləyir
    collectionId: 0, // Backend-dən ID gözləyir
    colorIds: [],    // Array olmalıdır (Məsələn: [1, 2])
    materialIds: [],
    roomIds: [],
    tagIds: [],
    specifications: [] // Məsələn: [{key: "Material", value: "Wood"}]
  });

  // Input dəyişikliklərini idarə edən funksiya
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    // Rəqəm tələb olunan sahələr üçün çevirmə
    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Checkbox üçün (isFeatured)
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, isFeatured: e.target.checked }));
  };

  // Submit funksiyası
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // 1. Tokeni tapırıq (Login olanda localStorage-ə yazılmalıdır)
      // Adətən adı 'accessToken' və ya 'token' olur. Layihənizdə necədirsə onu yoxlayın.
      const token = localStorage.getItem('accessToken');

      if (!token) {
        alert("Siz admin kimi daxil olmamısınız (Token yoxdur)!");
        setLoading(false);
        return;
      }

      // 2. API-yə göndəririk
      await createProduct(formData, token);

      setMessage('✅ Məhsul uğurla yaradıldı!');

      // Formu sıfırlamaq istəsən:
      // setFormData({ ...boş dəyərlər... })

    } catch (error: any) {
      console.error(error);
      setMessage(`❌ Xəta baş verdi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Yeni Məhsul Yarat</h1>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>

        {/* Əsas Məlumatlar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <label>
            Ad (Name):
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="border p-2 w-full" />
          </label>
          <label>
            SKU:
            <input type="text" name="sku" value={formData.sku} onChange={handleChange} required className="border p-2 w-full" />
          </label>
        </div>

        <label>
          Qısa Təsvir:
          <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="border p-2 w-full" />
        </label>

        <label>
          Tam Təsvir:
          <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 w-full" rows={4} />
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <label>
            Qiymət:
            <input type="number" name="price" value={formData.price} onChange={handleChange} required className="border p-2 w-full" />
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            Featured (Seçilmiş):
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleCheckbox} />
          </label>
        </div>

        {/* Ölçülər */}
        <h3>Ölçülər</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
          <label>Hündürlük: <input type="number" name="height" value={formData.height} onChange={handleChange} className="border p-2 w-full" /></label>
          <label>En: <input type="number" name="width" value={formData.width} onChange={handleChange} className="border p-2 w-full" /></label>
          <label>Dərinlik: <input type="number" name="depth" value={formData.depth} onChange={handleChange} className="border p-2 w-full" /></label>
          <label>Çəki: <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="border p-2 w-full" /></label>
        </div>

        {/* ID-lər (Müvəqqəti əllə yazırıq, gələcəkdə Selectbox ola bilər) */}
        <h3>Əlaqələr (ID)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          <label>Category ID: <input type="number" name="categoryId" value={formData.categoryId} onChange={handleChange} className="border p-2 w-full" /></label>
          <label>Designer ID: <input type="number" name="designerId" value={formData.designerId} onChange={handleChange} className="border p-2 w-full" /></label>
          <label>Collection ID: <input type="number" name="collectionId" value={formData.collectionId} onChange={handleChange} className="border p-2 w-full" /></label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: '15px', backgroundColor: 'black', color: 'white', cursor: 'pointer', marginTop: '20px' }}
        >
          {loading ? 'Göndərilir...' : 'Məhsulu Yarat'}
        </button>

        {message && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{message}</p>}
      </form>
    </div>
  );
}