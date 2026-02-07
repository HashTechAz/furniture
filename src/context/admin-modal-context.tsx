'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FaCheck, FaTimes, FaExclamationTriangle, FaInfo } from 'react-icons/fa';
import styles from '@/components/admin-modal/admin-modal.module.css'; // Yuxarıdakı CSS

// Modal Tipləri
type ModalType = 'success' | 'error' | 'warning' | 'info';

interface ModalOptions {
  type: ModalType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => Promise<void> | void; // Async dəstəyi
  autoClose?: boolean; // Avtomatik bağlansın?
}

interface AdminModalContextType {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

const AdminModalContext = createContext<AdminModalContextType | undefined>(undefined);

export function AdminModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<ModalOptions | null>(null);

  const openModal = (opts: ModalOptions) => {
    setOptions(opts);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setOptions(null), 300); // Animasiya bitənə qədər gözlə
  };

  const handleConfirm = async () => {
    if (options?.onConfirm) {
      setLoading(true);
      try {
        await options.onConfirm();
        closeModal();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      closeModal();
    }
  };

  // İkon seçimi
  const getIcon = (type: ModalType) => {
    switch (type) {
      case 'success': return <FaCheck />;
      case 'error': return <FaTimes />;
      case 'warning': return <FaExclamationTriangle />;
      default: return <FaInfo />;
    }
  };

  // Düymə rəngi
  const getConfirmStyle = (type: ModalType) => {
    switch (type) {
      case 'error': case 'warning': return { background: '#ef4444' }; // Qırmızı (Delete üçün)
      case 'success': return { background: '#16a34a' }; // Yaşıl
      default: return { background: '#111' }; // Qara (Standard)
    }
  };

  return (
    <AdminModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {/* GLOBAL MODAL UI */}
      {isOpen && options && (
        <div className={styles.overlay} onClick={!loading ? closeModal : undefined}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            
            {/* İkon */}
            <div className={`${styles.iconWrapper} ${styles[options.type]}`}>
              {getIcon(options.type)}
            </div>

            {/* Mətnlər */}
            <h3 className={styles.title}>{options.title}</h3>
            <p className={styles.message}>{options.message}</p>

            {/* Düymələr */}
            <div className={styles.footer}>
              {/* Cancel düyməsi (Yalnız Confirm funksiyası varsa və ya warning/error tipidirsə göstər) */}
              {(options.onConfirm || options.type === 'warning') && (
                <button 
                  className={`${styles.btn} ${styles.cancelBtn}`} 
                  onClick={closeModal} 
                  disabled={loading}
                >
                  {options.cancelText || 'Cancel'}
                </button>
              )}
              
              <button 
                className={`${styles.btn} ${styles.confirmBtn}`}
                style={getConfirmStyle(options.type)}
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? 'Processing...' : (options.confirmText || 'Okay')}
              </button>
            </div>

          </div>
        </div>
      )}
    </AdminModalContext.Provider>
  );
}

// Hook
export function useAdminModal() {
  const context = useContext(AdminModalContext);
  if (!context) {
    throw new Error('useAdminModal must be used within an AdminModalProvider');
  }
  return context;
}