"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, uploadProductImages, CreateProductPayload } from '@/lib/products';
import { revalidateProducts } from '@/lib/revalidate';

// --- YENİ IMPORTLAR (Seçimləri gətirmək üçün) ---
import { getCategories, BackendCategory } from '@/lib/categories';
import { getColors, BackendColor } from '@/lib/colors';
import { getDesigners, BackendDesigner } from '../../../../lib/designers';   
import { getCollections, BackendCollection } from '../../../../lib/collections';

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  
  // --- SEÇİM DATALARI ---
  const [categories, setCategories] = useState<BackendCategory[]>([]);
  const [colors, setColors] = useState<BackendColor[]>([]);
  const [designers, setDesigners] = useState<BackendDesigner[]>([]);
  const [collections, setCollections] = useState<BackendCollection[]>([]);

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
    categoryId: 0,   
    designerId: 0,   
    collectionId: 0, 
    colorIds: [],    
    materialIds: [],
    roomIds: [],
    tagIds: [],
    specifications: [] 
  });

  // --- YENİ: Dataları API-dən yükləmək ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hamsını paralel yükləyirik
        const [catsData, colorsData, designersData, collectionsData] = await Promise.all([
          // DÜZƏLİŞ: (err: any) əlavə etdik
          getCategories().catch((err: any) => { console.error(err); return []; }),
          getColors().catch((err: any) => { console.error(err); return []; }),
          getDesigners().catch((err: any) => { console.error(err); return []; }),
          getCollections().catch((err: any) => { console.error(err); return []; })
        ]);

        setCategories(catsData);
        setColors(colorsData);
        setDesigners(designersData);
        setCollections(collectionsData);
      } catch (error) {
        console.error('Data yüklənərkən xəta:', error);
      }
    };
    fetchData();
  }, []);

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

  // --- YENİ: Rəng Seçimi (Checkbox Logic) ---
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (formData.categoryId === 0) {
       alert("Zəhmət olmasa Kateqoriya seçin!");
       setLoading(false);
       return;
    }

    try {
      const token = localStorage.getItem('accessToken'); 
      if (!token) {
        alert("Siz admin kimi daxil olmamısınız!");
        setLoading(false);
        return;
      }

      // 1. Məhsulu yarat
      const response: any = await createProduct(formData, token);
      const productId = response?.id || response?.data?.id;
      
      if (!productId) throw new Error('Məhsul yaradıldı amma ID gəlmədi.');
      
      setMessage('✅ Məhsul uğurla yaradıldı!');
      await revalidateProducts(); // Cache təmizlə

      // 2. Şəkilləri yüklə
      if (selectedFiles && selectedFiles.length > 0) {
        try {
          setUploading(true);
          await uploadProductImages(productId, selectedFiles, token);
          setMessage('✅ Məhsul və şəkillər uğurla yükləndi!');
        } catch (uploadError: any) {
          console.error(uploadError);
          setMessage(`✅ Məhsul yaradıldı, amma şəkil xətası: ${uploadError.message}`);
        } finally {
          setUploading(false);
        }
      }
      
      setTimeout(() => {
        router.push('/admin/products');
        router.refresh();
      }, 1500);
      
    } catch (error: any) {
      console.error(error);
      setMessage(`❌ Xəta: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: 'black' }}>
      <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>Yeni Məhsul Yarat</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
        
        {/* ƏSAS MƏLUMATLAR */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <label>
            Ad (Name):
            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={inputStyle} />
          </label>
          <label>
            SKU:
            <input type="text" name="sku" value={formData.sku} onChange={handleChange} required style={inputStyle} />
          </label>
        </div>

        <label>
          Qısa Təsvir:
          <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} style={inputStyle} />
        </label>

        <label>
          Tam Təsvir:
          <textarea name="description" value={formData.description} onChange={handleChange} style={inputStyle} rows={4} />
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <label>
            Qiymət (AZN):
            <input type="number" name="price" value={formData.price} onChange={handleChange} required style={inputStyle} />
          </label>
          <label style={{display:'flex', alignItems:'center', gap: '10px'}}>
            Önə çıxan (Featured):
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleCheckbox} style={{width:'20px', height:'20px'}} />
          </label>
        </div>

        <h3>Ölçülər</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
          <label>Hündürlük: <input type="number" name="height" value={formData.height} onChange={handleChange} style={inputStyle} /></label>
          <label>En: <input type="number" name="width" value={formData.width} onChange={handleChange} style={inputStyle} /></label>
          <label>Dərinlik: <input type="number" name="depth" value={formData.depth} onChange={handleChange} style={inputStyle} /></label>
          <label>Çəki: <input type="number" name="weight" value={formData.weight} onChange={handleChange} style={inputStyle} /></label>
        </div>

        {/* --- YENİLƏNMİŞ HİSSƏ: DROPDOWNLARI SEÇMƏK --- */}
        <h3>Əlaqələr (Seçimlər)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          
          {/* Kateqoriya */}
          <label>
             Category: <span style={{color:'red'}}>*</span>
             <select name="categoryId" value={formData.categoryId} onChange={handleChange} required style={inputStyle}>
                <option value={0}>Seçin...</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
             </select>
          </label>

          {/* Kolleksiya */}
          <label>
             Collection: <span style={{color:'red'}}>*</span>
             <select name="collectionId" value={formData.collectionId} onChange={handleChange} required style={inputStyle}>
                <option value={0}>Seçin...</option>
                {collections.map(col => (
                  <option key={col.id} value={col.id}>{col.name}</option>
                ))}
             </select>
          </label>

          {/* Dizayner */}
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

        {/* --- YENİ: RƏNG SEÇİMİ --- */}
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
            )) : <p>Rənglər yüklənir və ya tapılmadı...</p>}
        </div>

        {/* Resim Yükleme */}
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ marginTop: 0, marginBottom: '10px' }}>Şəkillər</h3>
          <input 
              type="file" 
              multiple 
              accept="image/*"
              onChange={handleFileSelect}
              style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
            />
           {selectedFiles && <div style={{marginTop:'5px'}}>Seçildi: {selectedFiles.length} fayl</div>}
        </div>

        <button 
          type="submit" 
          disabled={loading || uploading}
          style={{ 
            padding: '15px', 
            backgroundColor: loading || uploading ? '#666' : 'black', 
            color: 'white', 
            cursor: loading || uploading ? 'not-allowed' : 'pointer', 
            marginTop: '20px', 
            border: 'none', 
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          {loading ? 'Məhsul yaradılır...' : uploading ? 'Şəkillər yüklənir...' : 'Məhsulu Yarat'}
        </button>

        {message && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{message}</p>}
      </form>
    </div>
  );
}

// Sadə stil obyekti
const inputStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  width: '100%',
  borderRadius: '4px'
};