'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import styles from '../../../product-form.module.css';
import { getProductById, createProductVariant } from '@/lib/products';
import { getColors } from '@/lib/colors';
import { getRooms } from '@/lib/rooms';
import { useAdminModal } from '@/context/admin-modal-context';
import { FaSave, FaArrowLeft, FaPalette, FaDoorOpen } from 'react-icons/fa';
import type { CreateProductVariantPayload } from '@/lib/products';

export default function NewVariantPage() {
  const router = useRouter();
  const params = useParams();
  const baseProductId = params?.id as string;
  const { openModal } = useAdminModal();

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [baseProduct, setBaseProduct] = useState<Awaited<ReturnType<typeof getProductById>>>(null);
  const [colors, setColors] = useState<{ id: number; name: string; hexCode?: string }[]>([]);
  const [rooms, setRooms] = useState<{ id: number; name: string }[]>([]);
  const [selectedRoomIds, setSelectedRoomIds] = useState<number[]>([]);

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [colorId, setColorId] = useState<number>(0);

  useEffect(() => {
    async function load() {
      if (!baseProductId) return;
      try {
        const [product, colorsList, roomsList] = await Promise.all([
          getProductById(baseProductId),
          getColors(),
          getRooms(),
        ]);
        setBaseProduct(product);
        setColors(Array.isArray(colorsList) ? colorsList : []);
        setRooms(Array.isArray(roomsList) ? roomsList : []);
        if (product) {
          setName(`${product.title} – `);
          setSku(product.sku ? `${product.sku}-` : '');
        }
      } catch (e) {
        console.error(e);
        openModal({ type: 'error', title: 'Xəta', message: 'Məhsul və ya rənglər gətirilə bilmədi.' });
      } finally {
        setInitialLoading(false);
      }
    }
    load();
  }, [baseProductId, openModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!baseProduct || !colorId) {
      openModal({ type: 'error', title: 'Çatışmazlıq', message: 'Rəng mütləq seçilməlidir.' });
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken') || '';
      const payload: CreateProductVariantPayload = {
        name: name.trim() || baseProduct.title,
        sku: sku.trim() || `variant-${baseProductId}-${colorId}`,
        description: baseProduct.description || '',
        shortDescription: baseProduct.shortDescription || '',
        price: parseFloat(String(baseProduct.price)) || 0,
        isFeatured: false,
        height: baseProduct.height || 0,
        width: baseProduct.width || 0,
        depth: baseProduct.depth || 0,
        weight: baseProduct.weight || 0,
        categoryId: baseProduct.categoryId,
        designerId: baseProduct.designerId,
        collectionId: baseProduct.collectionId,
        colorIds: [colorId],
        materialIds: [],
        roomIds: selectedRoomIds,
        tagIds: [],
        specifications: [],
      };
      const newProduct = await createProductVariant(baseProductId, payload, token);
      const newId = (newProduct as { id: number }).id;
      openModal({
        type: 'success',
        title: 'Variant yaradıldı',
        message: 'Yeni rəng variantı uğurla əlavə olundu. İndi şəkillər əlavə edə bilərsiniz.',
        confirmText: 'Yeni məhsula keç',
        onConfirm: () => router.push(`/admin/products/${newId}`),
      });
    } catch (error: unknown) {
      openModal({
        type: 'error',
        title: 'Xəta',
        message: error instanceof Error ? error.message : 'Variant yaradıla bilmədi.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Yüklənir...</div>;
  }
  if (!baseProduct) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <p>Məhsul tapılmadı.</p>
        <Link href="/admin/products">Məhsullara qayıt</Link>
      </div>
    );
  }

  const currentColorName = colors.find((c) => c.id === baseProduct.selectedColorIds?.[0])?.name;

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href={`/admin/products/${baseProductId}`} style={{ color: '#666', fontSize: 20 }}>
            <FaArrowLeft />
          </Link>
          <h1 className={styles.title}>Rəng variantı əlavə et</h1>
        </div>
        <div className={styles.headerActions}>
          <Link href={`/admin/products/${baseProductId}`} className={styles.cancelBtn}>
            Ləğv et
          </Link>
          <button type="submit" className={styles.saveBtn} disabled={loading}>
            <FaSave /> {loading ? 'Yaradılır...' : 'Variant yarat'}
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.leftColumn}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <FaPalette /> Yeni variant (bir rəng)
            </div>
            <p style={{ marginBottom: 16, color: '#666', fontSize: 13 }}>
              Cari məhsul: <strong>{baseProduct.title}</strong>
              {currentColorName && ` (${currentColorName})`}. Aşağıda yeni rəng seçin – hər variant ayrı məhsul kimi yaranacaq və eyni qrupda göstəriləcək.
            </p>
            <div className={styles.formGroup}>
              <label className={styles.label}>Variant adı</label>
              <input
                type="text"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Məs: Stul – Göy"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>SKU</label>
              <input
                type="text"
                className={styles.input}
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="Məs: STUL-GOY"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Rəng (mütləq bir rəng)</label>
              <select
                className={styles.select}
                value={colorId}
                onChange={(e) => setColorId(parseInt(e.target.value, 10) || 0)}
                required
              >
                <option value={0}>Rəng seçin...</option>
                {colors
                  .filter((c) => !baseProduct.selectedColorIds?.includes(c.id))
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                {colors.filter((c) => !baseProduct.selectedColorIds?.includes(c.id)).length === 0 && (
                  <option value={0}>Başqa rəng yoxdur (əvvəlcə rəng əlavə edin)</option>
                )}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Otaqlar (isteğe bağlı)</label>
              <select
                className={styles.select}
                value=""
                onChange={(e) => {
                  const id = parseInt(e.target.value, 10);
                  if (id && !selectedRoomIds.includes(id)) setSelectedRoomIds((prev) => [...prev, id]);
                }}
              >
                <option value="">Otaq seçin...</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
              <div className={styles.tagsContainer} style={{ marginTop: 8 }}>
                {selectedRoomIds.map((id) => {
                  const room = rooms.find((r) => r.id === id);
                  return room ? (
                    <div key={id} className={styles.tag}>
                      {room.name}
                      <span className={styles.removeTag} onClick={() => setSelectedRoomIds((prev) => prev.filter((r) => r !== id))}>×</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Kopyalanan məlumat</div>
            <p style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>
              Aşağıdakı sahələr əsas məhsuldan götürülüb. Variant yaradıldıqdan sonra redaktə səhifəsindən dəyişə bilərsiniz.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 13, color: '#374151' }}>
              <li><strong>Kategoriya:</strong> {baseProduct.categoryName}</li>
              <li><strong>Qiymət:</strong> {baseProduct.price}</li>
              <li><strong>Ölçü:</strong> W{baseProduct.width} × H{baseProduct.height} × D{baseProduct.depth}</li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
}
