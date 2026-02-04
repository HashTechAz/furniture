'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProductById, updateProduct, CreateProductPayload } from '@/lib/products';
import { revalidateProducts } from '@/lib/revalidate';

// Dropdown datalarını gətirmək üçün importlar
import { getCategories, BackendCategory } from '@/lib/categories';
import { getColors, BackendColor } from '@/lib/colors';
import { getDesigners, BackendDesigner } from '@/lib/designers';
import { getCollections, BackendCollection } from '@/lib/collections';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // --- SEÇİM DATALARI (Dropdownlar üçün) ---
  const [categories, setCategories] = useState<BackendCategory[]>([]);
  const [colors, setColors] = useState<BackendColor[]>([]);
  const [designers, setDesigners] = useState<BackendDesigner[]>([]);
  const [collections, setCollections] = useState<BackendCollection[]>([]);

  // Parametr ID-ni həll etmək (Next.js versiyasına görə)
  const [productId, setProductId] = useState<string>('');
  
  // Form State
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

  // 1. ID-ni alırıq
  useEffect(() => {
    Promise.resolve(params).then(p => setProductId(p.id));
  }, [params]);

  // 2. Bütün dataları (Dropdownlar + Məhsulun özü) yükləyirik
  useEffect(() => {
    if (!productId) return;

    const fetchData = async () => {
      try {
        // A. Dropdownları yüklə (Paralel)
        const [catsData, colorsData, designersData, collectionsData] = await Promise.all([
          getCategories().catch(e => []),
          getColors().catch(e => []),
          getDesigners().catch(e => []),
          getCollections().catch(e => [])
        ]);

        setCategories(catsData);
        setColors(colorsData);
        setDesigners(designersData);
        setCollections(collectionsData);

        // B. Məhsulun özünü yüklə
        const productData = await getProductById(productId);
        
        if (!productData) {
            alert("Məhsul tapılmadı!");
            router.push('/admin/products');
            return;
        }

        // C. Formanı doldur (AVTOMATİK SEÇİM BURADA OLUR)
        setFormData({
            name: productData.title,
            sku: productData.sku,
            description: productData.description,
            shortDescription: productData.shortDescription,
            price: parseFloat(productData.price.replace(/[^0-9.]/g, '')), 
            isFeatured: false,
            height: productData.height,
            width: productData.width,
            depth: productData.depth,
            weight: productData.weight,
            categoryId: productData.categoryId,
            designerId: productData.designerId,
            collectionId: productData.collectionId,
            colorIds: productData.selectedColorIds || [],
            materialIds: [],
            roomIds: [],
            tagIds: [],
            specifications: []
        });

      } catch (error) {
        console.error('Yüklənmə xətası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, router]);


  // Input Handling
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number' || name === 'categoryId' || name === 'designerId' || name === 'collectionId') {
      const numValue = value === '' ? 0 : parseFloat(value);
      setFormData(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, isFeatured: e.target.checked }));
  };

  const handleColorToggle = (colorId: number) => {
    setFormData(prev => {
      const exists = prev.colorIds.includes(colorId);
      if (exists) {
        return { ...prev, colorIds: prev.colorIds.filter(id => id !== colorId) };
      } else {
        return { ...prev, colorIds: [...prev.colorIds, colorId] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert("Token yoxdur!");
        return;
      }

      await updateProduct(productId, formData, token);
      
      setMessage('✅ Məhsul uğurla yeniləndi!');
      await revalidateProducts();

      setTimeout(() => {
        router.push('/admin/products');
        router.refresh();
      }, 1000);

    } catch (error: any) {
      setMessage(`❌ Xəta: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{padding:'20px'}}>Məlumatlar yüklənir...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: 'black' }}>
      <Link href="/admin/products" style={{display:'inline-block', marginBottom:'20px'}}>← Geri</Link>
      <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>Məhsulu Redaktə Et</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
        
        {/* Ad və SKU */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <label>Ad: <input type="text" name="name" value={formData.name} onChange={handleChange} required style={inputStyle} /></label>
          <label>SKU: <input type="text" name="sku" value={formData.sku} onChange={handleChange} required style={inputStyle} /></label>
        </div>

        <label>Qısa Təsvir: <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} style={inputStyle} /></label>
        <label>Tam Təsvir: <textarea name="description" value={formData.description} onChange={handleChange} style={inputStyle} rows={4} /></label>

        {/* Qiymət */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <label>Qiymət: <input type="number" name="price" value={formData.price} onChange={handleChange} required style={inputStyle} /></label>
          <label style={{display:'flex', alignItems:'center', gap: '10px'}}>
             Featured: <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleCheckbox} style={{width:'20px', height:'20px'}} />
          </label>
        </div>

        {/* Ölçülər */}
        <h3>Ölçülər</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
          <label>Hündürlük: <input type="number" name="height" value={formData.height} onChange={handleChange} style={inputStyle} /></label>
          <label>En: <input type="number" name="width" value={formData.width} onChange={handleChange} style={inputStyle} /></label>
          <label>Dərinlik: <input type="number" name="depth" value={formData.depth} onChange={handleChange} style={inputStyle} /></label>
          <label>Çəki: <input type="number" name="weight" value={formData.weight} onChange={handleChange} style={inputStyle} /></label>
        </div>

        {/* SEÇİMLƏR - AVTOMATİK DOLACAQ */}
        <h3>Əlaqələr</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          
          <label>
             Category: <span style={{color:'red'}}>*</span>
             <select name="categoryId" value={formData.categoryId} onChange={handleChange} required style={inputStyle}>
                <option value={0}>Seçin...</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
             </select>
          </label>

          <label>
             Collection: <span style={{color:'red'}}>*</span>
             <select name="collectionId" value={formData.collectionId} onChange={handleChange} required style={inputStyle}>
                <option value={0}>Seçin...</option>
                {collections.map(col => (
                  <option key={col.id} value={col.id}>{col.name}</option>
                ))}
             </select>
          </label>

          <label>
             Designer: <span style={{color:'red'}}>*</span>
             <select name="designerId" value={formData.designerId} onChange={handleChange} required style={inputStyle}>
                <option value={0}>Seçin...</option>
                {designers.map(des => (
                  <option key={des.id} value={des.id}>{des.name}</option>
                ))}
             </select>
          </label>
        </div>

        {/* Rənglər */}
        <h3>Rənglər</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
            {colors.length > 0 ? colors.map(color => (
                <label key={color.id} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', padding: '5px', background: '#f9f9f9', borderRadius: '4px', border: '1px solid #eee' }}>
                    <input 
                        type="checkbox" 
                        checked={formData.colorIds.includes(color.id)}
                        onChange={() => handleColorToggle(color.id)}
                    />
                    <span style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: color.hexCode, border: '1px solid #ccc', display: 'inline-block' }}></span>
                    {color.name}
                </label>
            )) : <p>Rənglər yüklənir...</p>}
        </div>

        <button 
          type="submit" 
          disabled={submitting}
          style={{ 
            padding: '15px', 
            backgroundColor: submitting ? '#666' : 'black', 
            color: 'white', 
            cursor: submitting ? 'not-allowed' : 'pointer', 
            marginTop: '20px', 
            border: 'none', 
            borderRadius: '4px',
            fontSize: '16px'
          }}
        >
          {submitting ? 'Yadda Saxlanılır...' : 'Yadda Saxla'}
        </button>

        {message && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{message}</p>}
      </form>
    </div>
  );
}

const inputStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  width: '100%',
  borderRadius: '4px'
};