'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getRooms, deleteRoom, Room } from '@/lib/rooms';
import { getCached, setCached } from '@/lib/admin-prefetch-cache';
import AdminTableSkeleton from '../components/AdminTableSkeleton';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from './page.module.css';
import { FaPlus, FaEdit, FaTrash, FaDoorOpen } from 'react-icons/fa';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://furniture.hashtech.az';

function roomImageSrc(room: Room): string {
  const url = room.imageUrl ?? '';
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
}

export default function RoomsPage() {
  const cached = getCached<Room[]>('rooms');
  const [rooms, setRooms] = useState<Room[]>(Array.isArray(cached) ? cached : []);
  const [loading, setLoading] = useState(!cached);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { openModal } = useAdminModal();

  const fetchData = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || '' : '';
      const data = await getRooms(token);
      const list = Array.isArray(data) ? data : [];
      setRooms(list);
      setCached('rooms', list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(!cached);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onFocus = () => fetchData(false);
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  const handleDelete = (id: number) => {
    openModal({
      type: 'warning',
      title: 'Otağı silmək?',
      message: 'Bu otağı silmək istədiyinizə əminsiniz? Bu əməliyyat geri alına bilməz.',
      confirmText: 'Bəli, sil',
      cancelText: 'Ləğv et',
      onConfirm: async () => {
        const token = localStorage.getItem('accessToken') || '';
        await deleteRoom(id, token);
        setRooms((prev) => prev.filter((r) => r.id !== id));
        setSelectedIds((prev) => prev.filter(selectedId => selectedId !== id));
      },
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(rooms.map(r => r.id));
    else setSelectedIds([]);
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    openModal({
      type: 'warning',
      title: 'Toplu Silinmə',
      message: `Seçilmiş ${selectedIds.length} otağı silmək istədiyinizə əminsiniz? Bu geriyə alına bilməz.`,
      confirmText: 'Bəli, Sil',
      cancelText: 'Ləğv et',
      onConfirm: async () => {
        const token = localStorage.getItem('accessToken') || '';
        setLoading(true);
        try {
          const results = await Promise.allSettled(
            selectedIds.map(id => deleteRoom(id, token))
          );
          const successIds = results
            .map((r, idx) => r.status === 'fulfilled' ? selectedIds[idx] : null)
            .filter(Boolean) as number[];
          setRooms(prev => prev.filter(item => !successIds.includes(item.id)));
          setSelectedIds([]);
        } catch (error) {
          console.error("Toplu silinmə xətası", error);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Rooms</h1>
          <Link href="/admin/rooms/new" className={styles.addButton}>
            <FaPlus /> New Room
          </Link>
        </div>
        <div className={styles.tableCard}>
          <AdminTableSkeleton rows={8} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Rooms</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          {selectedIds.length > 0 && (
            <button 
              onClick={handleBulkDelete} 
              className={styles.addButton} 
              style={{ backgroundColor: '#ef4444', color: 'white' }}
            >
              <FaTrash /> Seçilmişləri Sil ({selectedIds.length})
            </button>
          )}
          <Link href="/admin/rooms/new" className={styles.addButton}>
            <FaPlus /> New Room
          </Link>
        </div>
      </div>

      <div className={styles.tableCard}>
        {rooms.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center', color: '#666' }}>
            <FaDoorOpen size={40} style={{ marginBottom: 10, opacity: 0.3 }} />
            <p>Heç bir otaq tapılmadı.</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: 40 }}>
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll} 
                    checked={rooms.length > 0 && selectedIds.length === rooms.length}
                  />
                </th>
                <th>Room</th>
                <th>Description</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(room.id)}
                      onChange={() => handleSelectOne(room.id)}
                    />
                  </td>
                  <td>
                    <div className={styles.cellContent}>
                      <div className={styles.imageWrapper}>
                        {room.imageUrl ? (
                          <Image src={roomImageSrc(room)} alt={room.name} width={48} height={48} className={styles.image} loading="lazy" />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: 20 }}>⌂</div>
                        )}
                      </div>
                      <div className={styles.nameInfo}>
                        <span className={styles.name}>{room.name}</span>
                        <span className={styles.idBadge}>ID: #{room.id}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: '#666', maxWidth: 300 }}>
                    {room.description
                      ? room.description.length > 60
                        ? room.description.substring(0, 60) + '...'
                        : room.description
                      : '—'}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link
                        href={`/admin/rooms/${room.id}`}
                        className={`${styles.actionBtn} ${styles.editBtn}`}
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(room.id)}
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
