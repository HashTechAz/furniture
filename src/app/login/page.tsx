'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, setTokens } from '@/lib/auth';
import styles from './page.module.css';
import { FaEye, FaEyeSlash, FaExclamationCircle, FaArrowRight } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(username, password);
      
      if (data && data.accessToken) {
        setTokens(data.accessToken, data.refreshToken || '');
        document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict`;
        if (data.refreshToken) {
          document.cookie = `refreshToken=${data.refreshToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
        }
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        window.location.href = '/admin'; 
      } else {
        setError("Giriş uğursuz oldu. Məlumatları yoxlayın.");
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      setError('İstifadəçi adı və ya şifrə yanlışdır.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      
      {/* SOL TƏRƏF: ŞƏKİL VƏ BRANDING */}
      <div className={styles.imageSection}>
        {/* Şəkil ayrıca div-dədir ki, animasiya yazıları tərpətməsin */}
        <div className={styles.animatedBg}></div> 
        <div className={styles.imageOverlay}></div>
        
        <div className={styles.brandContent}>
          <h1 className={styles.brandTitle}>Sparro.</h1>
          <p className={styles.brandSubtitle}>
            Premium mebel idarəetmə sistemi. Sifarişləri, məhsulları və kolleksiyaları tək mərkəzdən idarə edin.
          </p>
        </div>
      </div>

      {/* SAĞ TƏRƏF: FORM */}
      <div className={styles.formSection}>
        <div className={styles.formWrapper}>
          
          <div className={styles.header}>
            <h2 className={styles.title}>Xoş Gəldiniz</h2>
            <p className={styles.subtitle}>Hesabınıza daxil olmaq üçün məlumatlarınızı daxil edin</p>
          </div>

          {error && (
            <div className={styles.errorBox}>
              <FaExclamationCircle /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email / Username</label>
              <input
                type="text"
                placeholder="admin@sparro.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Şifrə</label>
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
                />
                <button 
                  type="button" 
                  className={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={styles.button}
            >
              {loading ? 'Yoxlanılır...' : 'Daxil ol'}
              {!loading && <FaArrowRight />}
            </button>
          </form>

          <p className={styles.footerText}>
            &copy; {new Date().getFullYear()} Sparro Furniture. All rights reserved.
          </p>

        </div>
      </div>

    </div>
  );
}