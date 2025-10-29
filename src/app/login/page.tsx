'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');


    try {
      // Mock user data for testing
      const mockUser = {
        id: '1',
        email: email || 'test@admin.com',
        firstName: 'Admin',
        lastName: 'User'
      };

      // Simulate successful login
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Set mock cookies (for development only)
      document.cookie = `accessToken=mock-access-token; path=/; max-age=86400; secure; samesite=strict`;
      document.cookie = `refreshToken=mock-refresh-token; path=/; max-age=604800; secure; samesite=strict`;
      
      router.push('/admin');
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1>Admin Login</h1>
          <p>test login password</p>
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
              placeholder="test email"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="test password"
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
