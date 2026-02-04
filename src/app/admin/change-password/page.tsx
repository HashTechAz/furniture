'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

// Sadə SVG İkonları (Göz Açıq/Bağlı)
const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Gözlərin açıq/bağlı vəziyyəti
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (newPassword !== confirmPassword) {
      setError('Yeni şifrələr bir-biri ilə eyni deyil!');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Yeni şifrə ən azı 6 simvol olmalıdır.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // confirmPassword sahəsini əlavə etməyə ehtiyac yoxdur, backend yoxlayır
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Şifrə uğurla dəyişdirildi!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(data.error || 'Şifrə dəyişdirilə bilmədi.');
      }
    } catch {
      setError('Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Şifrəni Dəyiş</h1>
          <p>Admin hesabı üçün şifrəni yeniləyin</p>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className={styles.successMessage}>
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          {/* CARİ ŞİFRƏ */}
          <div className={styles.formGroup}>
            <label htmlFor="currentPassword">Cari Şifrə</label>
            <div className={styles.inputWrapper}>
              <input
                type={showCurrent ? "text" : "password"}
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                placeholder="Hazırkı şifrəni daxil edin"
              />
              <button 
                type="button" 
                className={styles.eyeButton} 
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* YENİ ŞİFRƏ */}
          <div className={styles.formGroup}>
            <label htmlFor="newPassword">Yeni Şifrə</label>
            <div className={styles.inputWrapper}>
              <input
                type={showNew ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Yeni şifrə təyin edin"
                minLength={6}
              />
              <button 
                type="button" 
                className={styles.eyeButton} 
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* ŞİFRƏ TƏKRARI */}
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Yeni Şifrənin Təkrarı</label>
            <div className={styles.inputWrapper}>
              <input
                type={showConfirm ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Yeni şifrəni təkrar yazın"
                minLength={6}
              />
              <button 
                type="button" 
                className={styles.eyeButton} 
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Dəyişdirilir...' : 'Yadda Saxla'}
            </button>
            
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => router.back()}
            >
              Ləğv et
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}