'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRooms, deleteRoom, Room } from '@/lib/rooms';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from './page.module.css';
import { FaPlus, FaEdit, FaTrash, FaDoorOpen } from 'react-icons/fa';

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useAdminModal();

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || '' : '';
      const data = await getRooms(token);
      setRooms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
      },
    });
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ padding: 50, textAlign: 'center', color: '#666' }}>Yüklənir...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Rooms</h1>
        <Link href="/admin/rooms/new" className={styles.addButton}>
          <FaPlus /> New Room
        </Link>
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
                <th>Room</th>
                <th>Description</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>
                    <div className={styles.cellContent}>
                      <div className={styles.imageWrapper}>
                        {room.imageUrl ? (
                          <img src={room.imageUrl.startsWith('http') ? room.imageUrl : `${process.env.NEXT_PUBLIC_API_URL || ''}${room.imageUrl}`} alt={room.name} />
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
