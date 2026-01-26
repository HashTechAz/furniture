"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, setTokens } from '@/lib/auth';
import styles from './page.module.css'; // CSS Module qoşuldu

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log("🚀 Giriş cəhdi...");
      const data = await loginUser(username, password);
      
      if (data && data.accessToken) {
        // 1. Tokenləri localStorage'a yaz
        setTokens(data.accessToken, data.refreshToken || '');
        
        // 2. Token'ı cookie'ye de yaz (middleware cookie'den okuyor)
        document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict`;
        if (data.refreshToken) {
          document.cookie = `refreshToken=${data.refreshToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
        }
        
        // 3. User bilgisini localStorage'a kaydet (admin layout kullanıyor)
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        console.log("💾 Token yazıldı, yönləndirilir...");
        window.location.href = '/admin'; 
      } else {
        setError("Token gəlmədi! Server cavabını yoxlayın.");
      }
    } catch (err: any) {
      console.error("❌ Login Xətası:", err);
      setError('İstifadəçi adı və ya şifrə yanlışdır.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.imageSection}>
        <div className={styles.imageOverlay}></div>
        <div className={styles.brandText}>
          <h1 className={styles.brandTitle}>Admin Panel</h1>
          <p className={styles.brandSubtitle}>
            Mebelləri idarə etmək, yeni kolleksiyalar yaratmaq və sifarişləri izləmək üçün daxil olun.
          </p>
        </div>
      </div>

      {/* SAĞ TƏRƏF: Giriş Formu */}
      <div className={styles.formSection}>
        <div className={styles.formWrapper}>
          <h2 className={styles.title}>Xoş gəldiniz</h2>
          <p className={styles.subtitle}>Hesabınıza daxil olmaq üçün məlumatlarınızı girin.</p>

          {error && (
            <div className={styles.errorBox}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email / Username</label>
              <input
                type="text"
                placeholder="admin@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Şifrə</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={styles.button}
            >
              {loading ? 'Yoxlanılır...' : 'Daxil ol'}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}