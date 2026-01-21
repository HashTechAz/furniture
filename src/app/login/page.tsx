'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { loginUser, setTokens, setStoredUser, getRefreshToken, refreshAccessToken, clearTokens } from '@/lib/auth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for refresh token on mount
    const checkAuth = async () => {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
            try {
                const response = await refreshAccessToken(refreshToken);
                setTokens(response.accessToken, response.refreshToken);
                router.push('/admin');
            } catch (err) {
                console.error("Auto-login failed", err);
                clearTokens();
                setIsCheckingAuth(false);
            }
        } else {
            setIsCheckingAuth(false);
        }
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await loginUser(email, password);
      
      setTokens(response.accessToken, response.refreshToken);
      setStoredUser(response.user);
      
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
      return <div className={styles.loginContainer}>Loading...</div>;
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1>Admin Login</h1>
          <p>Please sign in to continue</p>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <Link href="/" className={styles.backLink}>
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
