'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FaCheck, FaTimes, FaExclamationTriangle, FaInfo } from 'react-icons/fa';
import styles from '@/components/admin-modal/admin-modal.module.css'; 
type ModalType = 'success' | 'error' | 'warning' | 'info';

export interface ModalOptions {
  type: ModalType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => void; 
  autoClose?: boolean; 
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
    setTimeout(() => setOptions(null), 300); 
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

  const getIcon = (type: ModalType) => {
    switch (type) {
      case 'success': return <FaCheck />;
      case 'error': return <FaTimes />;
      case 'warning': return <FaExclamationTriangle />;
      default: return <FaInfo />;
    }
  };

  const getConfirmStyle = (type: ModalType) => {
    switch (type) {
      case 'error': case 'warning': return { background: '#ef4444' }; 
      case 'success': return { background: '#16a34a' }; 
      default: return { background: '#111' }; 
    }
  };

  return (
    <AdminModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {isOpen && options && (
        <div className={styles.overlay} onClick={!loading ? closeModal : undefined}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            
            <div className={`${styles.iconWrapper} ${styles[options.type]}`}>
              {getIcon(options.type)}
            </div>

            <h3 className={styles.title}>{options.title}</h3>
            <p className={styles.message}>{options.message}</p>

            <div className={styles.footer}>
              {(options.onConfirm || options.type === 'warning') && (
                <button 
                  className={`${styles.btn} ${styles.cancelBtn}`} 
                  onClick={() => { options.onCancel?.(); closeModal(); }} 
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

export function useAdminModal() {
  const context = useContext(AdminModalContext);
  if (!context) {
    throw new Error('useAdminModal must be used within an AdminModalProvider');
  }
  return context;
}