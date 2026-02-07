'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminModal } from '@/context/admin-modal-context';
import styles from './page.module.css';

// İkonlar
import { FaEye, FaEyeSlash, FaLock, FaKey } from 'react-icons/fa';

export default function ChangePasswordPage() {
  const router = useRouter();
  const { openModal } = useAdminModal();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (newPassword !== confirmPassword) {
      openModal({ type: 'error', title: 'Error', message: 'Passwords do not match!' });
      return;
    }

    if (newPassword.length < 6) {
        openModal({ type: 'error', title: 'Weak Password', message: 'New password must be at least 6 characters long.' });
        return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        openModal({
            type: 'success',
            title: 'Password Changed! 🔒',
            message: 'Your password has been updated successfully.',
            confirmText: 'Back to Dashboard',
            onConfirm: () => router.push('/admin')
        });
        // Inputları təmizlə
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        openModal({ type: 'error', title: 'Failed', message: data.error || 'Could not change password.' });
      }
    } catch {
      openModal({ type: 'error', title: 'Error', message: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <h1 className={styles.title}>Change Password</h1>
        <p className={styles.subtitle}>Secure your admin account with a new password</p>
      </div>

      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          
          {/* CARİ ŞİFRƏ */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Current Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={showCurrent ? "text" : "password"}
                className={styles.input}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                placeholder="Enter current password"
              />
              <button 
                type="button" 
                className={styles.eyeButton} 
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* YENİ ŞİFRƏ */}
          <div className={styles.formGroup}>
            <label className={styles.label}>New Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={showNew ? "text" : "password"}
                className={styles.input}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
                minLength={6}
              />
              <button 
                type="button" 
                className={styles.eyeButton} 
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* TƏKRAR ŞİFRƏ */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm New Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={showConfirm ? "text" : "password"}
                className={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Repeat new password"
                minLength={6}
              />
              <button 
                type="button" 
                className={styles.eyeButton} 
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}