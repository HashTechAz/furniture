// src/app/admin/products/[id]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { getProductById, updateProduct, CreateProductPayload } from '@/lib/products';
import { apiRequest } from '@/lib/api-client'; // Bu vacibdir, kateqoriyaları çəkmək üçün

// Dropdown üçün sadə tip
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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Dropdown dataları (Kateqoriyalar, Designerlər, Kolleksiyalar)
  const [categories, setCategories] = useState<SimpleItem[]>([]);
  const [designers, setDesigners] = useState<SimpleItem[]>([]);
  const [collections, setCollections] = useState<SimpleItem[]>([]);
  
  // Form datası
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
    categoryId: 0,
    designerId: 0,
    collectionId: 0,
    colorIds: [],
    materialIds: [],
    roomIds: [],
    tagIds: [],
    specifications: []
  });

  // 1. Params-ı həll et (Next.js 15 üçün)
  useEffect(() => {
    const unwrapParams = async () => {
      const p = await params;
      setResolvedParams(p);
    };
    unwrapParams();
  }, [params]);

  // 2. BÜTÜN DATALARI GƏTİR VƏ UYĞUNLAŞDIR
  useEffect(() => {
    if (!resolvedParams?.id) return;

    const fetchData = async () => {
      try {
        // Paralel olaraq həm məhsulu, həm də bütün siyahıları çəkirik
        const [product, catsData, desData, colData] = await Promise.all([
          getProductById(resolvedParams.id),
          apiRequest<SimpleItem[]>('/api/Categories').catch(() => []),
          apiRequest<SimpleItem[]>('/api/Designers').catch(() => []),
          apiRequest<SimpleItem[]>('/api/Collections').catch(() => [])
        ]);

        setCategories(catsData);
        setDesigners(desData);
        setCollections(colData);

        if (product) {
          // --- ID TAPMA MƏNTİQİ (SMART FIX) ---
          // Əgər ID 0 gəlibsə, AD-a (Name) görə siyahıdan tapırıq
          
          let realCategoryId = product.categoryId;
          // Əgər ID yoxdursa və ya 0-dırsa, amma adı ("Sofas") varsa, siyahıdan onun ID-sini tap
          if (!realCategoryId || realCategoryId === 0) {
             const found = catsData.find(c => c.name === product.position); 
             if (found) realCategoryId = found.id;
          }

          let realDesignerId = product.designerId;
          if (!realDesignerId || realDesignerId === 0) {
             const found = desData.find(d => d.name === product.designer);
             if (found) realDesignerId = found.id;
          }
          
          let realCollectionId = product.collectionId;
          // Kolleksiya üçün ad saxlamamışıqsa və 0 gəlibsə, siyahıdan birincini seç (Xəta verməsin deyə)
          if ((!realCollectionId || realCollectionId === 0) && colData.length > 0) {
             realCollectionId = colData[0].id; 
          }

          setFormData({
            name: product.title,
            sku: product.sku,  
            shortDescription: product.shortDescription, 
            description: product.description,
            price: parseFloat(product.price.replace(' AZN', '')),
            isFeatured: false, 
            
            // --- ARTIQ 0 YOX, REAL RƏQƏMLƏRİ QOYURUQ ---
            height: product.height, 
            width: product.width,
            depth: product.depth,
            weight: product.weight,
            // ------------------------------------------
            
            categoryId: realCategoryId || 0,     
            designerId: realDesignerId || 0,      
            collectionId: realCollectionId || 0,  
            
            colorIds: [],
            materialIds: [],
            roomIds: [],
            tagIds: [],
            specifications: []
          });
        }
      } catch (error) {
        console.error("Məlumat gəlmədi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams]);

  // Input dəyişikliyi
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Select və Number tipləri üçün rəqəmə çeviririk
    if (type === 'number' || e.target.tagName === 'SELECT') {
      const numValue = value === '' ? 0 : parseFloat(value);
      setFormData(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvedParams?.id) return;
    setSubmitting(true);
    setMessage('');

    // Son yoxlama: ID-lər 0 olmamalıdır
    if (formData.categoryId === 0 || formData.designerId === 0 || formData.collectionId === 0) {
        alert("Xəbərdarlıq: Category, Designer və ya Collection seçilməyib (0). Update xəta verəcək!");
        setSubmitting(false);
        return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert("Token yoxdur! Zəhmət olmasa yenidən giriş edin.");
        return;
      }

      await updateProduct(resolvedParams.id, formData, token);
      setMessage('✅ Məhsul uğurla yeniləndi!');
      
    } catch (error: any) {
      console.error(error);
      setMessage(`❌ Xəta: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Yüklənir...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: 'black' }}>
      <h1>Məhsulu Redaktə Et (ID: {resolvedParams?.id})</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <label>Ad: <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" /></label>
          <label>Qiymət: <input type="number" name="price" value={formData.price} onChange={handleChange} className="border p-2 w-full" /></label>
        </div>

        <label>Təsvir: <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 w-full" rows={4} /></label>

        {/* --- VACİB HİSSƏ: DROPDOWN SEÇİMLƏRİ --- */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          
          <label>
             Category: <span style={{color:'red'}}>*</span>
             <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="border p-2 w-full">
                <option value={0}>Seçin...</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
             </select>
          </label>

          <label>
             Designer: <span style={{color:'red'}}>*</span>
             <select name="designerId" value={formData.designerId} onChange={handleChange} className="border p-2 w-full">
                <option value={0}>Seçin...</option>
                {designers.map(des => <option key={des.id} value={des.id}>{des.name}</option>)}
             </select>
          </label>

          <label>
             Collection: <span style={{color:'red'}}>*</span>
             <select name="collectionId" value={formData.collectionId} onChange={handleChange} className="border p-2 w-full">
                <option value={0}>Seçin...</option>
                {collections.map(col => <option key={col.id} value={col.id}>{col.name}</option>)}
             </select>
          </label>

        </div>

        <button 
          type="submit" 
          disabled={submitting}
          style={{ padding: '15px', backgroundColor: 'blue', color: 'white', cursor: 'pointer', marginTop: '20px' }}
        >
          {submitting ? 'Yenilənir...' : 'Yadda Saxla (Update)'}
        </button>

        {message && <p style={{ fontWeight: 'bold' }}>{message}</p>}
      </form>
    </div>
  );
}