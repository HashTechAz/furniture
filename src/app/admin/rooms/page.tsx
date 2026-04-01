'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getRooms, deleteRoom, Room } from '@/lib/rooms';
import { getCached, setCached } from '@/lib/admin-prefetch-cache';
import AdminTableSkeleton from '../components/AdminTableSkeleton';
import { AdminCheckbox } from '../components/AdminCheckbox';
import { useAdminModal } from '@/context/admin-modal-context';
import shared from '../components/admin-shared.module.css';
import styles from './page.module.css';
import { FaPlus, FaEdit, FaTrash, FaDoorOpen } from 'react-icons/fa';
import { getApiBaseUrl } from '@/lib/api-base';

const API_BASE = getApiBaseUrl();

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
      <div className={shared.container}>
        <div className={shared.header}>
          <h1 className={shared.title}>Rooms</h1>
          <Link href="/admin/rooms/new" className={shared.addButton}>
            <FaPlus /> New Room
          </Link>
        </div>
        <div className={shared.tableCard}>
          <AdminTableSkeleton rows={8} />
        </div>
      </div>
    );
  }

  return (
    <div className={shared.container}>
      <div className={shared.header}>
        <h1 className={shared.title}>Rooms</h1>
        <div className={shared.headerActions}>
          {selectedIds.length > 0 && (
            <button onClick={handleBulkDelete} className={`${shared.addButton} ${shared.bulkDeleteBtn}`}>
              <FaTrash /> Seçilmişləri Sil ({selectedIds.length})
            </button>
          )}
          <Link href="/admin/rooms/new" className={shared.addButton}>
            <FaPlus /> New Room
          </Link>
        </div>
      </div>

      <div className={shared.tableCard}>
        {rooms.length === 0 ? (
          <div className={shared.emptyState}>
            <FaDoorOpen size={48} className={shared.emptyStateIcon} />
            <p>Heç bir otaq tapılmadı.</p>
          </div>
        ) : (
          <table className={shared.table}>
            <thead>
              <tr>
                <th>
                  <AdminCheckbox
                    checked={rooms.length > 0 && selectedIds.length === rooms.length}
                    onChange={handleSelectAll}
                    indeterminate={selectedIds.length > 0 && selectedIds.length < rooms.length}
                    aria-label="Hamısını seç"
                  />
                </th>
                <th>Room</th>
                <th>Description</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id} className={selectedIds.includes(room.id) ? shared.selected : ''}>
                  <td>
                    <AdminCheckbox
                      checked={selectedIds.includes(room.id)}
                      onChange={() => handleSelectOne(room.id)}
                      aria-label={`Otaq ${room.name} seç`}
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
                    <div className={shared.actions}>
                      <Link
                        href={`/admin/rooms/${room.id}`}
                        className={`${shared.actionBtn} ${shared.editBtn}`}
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(room.id)}
                        className={`${shared.actionBtn} ${shared.deleteBtn}`}
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
