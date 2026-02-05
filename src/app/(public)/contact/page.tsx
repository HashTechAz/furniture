'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', 
    email: '',
    phoneNumber: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // 1. Süni Gözləmə (Preloader görünsün deyə)
    // Ən azı 1.5 saniyə gözləyirik ki, istifadəçi prosesi hiss etsin
    const delay = new Promise(resolve => setTimeout(resolve, 1500));

    // 2. API Sorğusu
    const payload = {
      fullName: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber || "", 
      subject: formData.subject,
      message: formData.message
    };

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042';
    
    // API sorğusunu başladırıq
    const fetchPromise = fetch(`${baseUrl}/api/Contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    try {
      // Həm API cavabını, həm də 1.5 saniyəni gözləyirik (hansı gec qurtarsa)
      const [response] = await Promise.all([fetchPromise, delay]);

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phoneNumber: '', subject: '', message: '' }); 
        
        // 5 saniyə sonra uğur mesajını gizlədə bilərik (istəyə bağlı)
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        const errorText = await response.text();
        console.error("API Xətası:", errorText);
        setStatus('error');
      }
    } catch (error) {
      console.error("Şəbəkə xətası:", error);
      setStatus('error');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with our team for product inquiries or support.</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.contactGrid}>
          
          {/* Sol Tərəf: İnfo */}
          <div className={styles.contactInfo}>
            <h2>Get in Touch</h2>
            <p>
              We are here to help you find the perfect furniture solutions. 
              Fill out the form and we will be in touch shortly.
            </p>
            
            <div className={styles.contactMethod}>
              <h3>Email</h3>
              <p>info@montanafurniture.com</p>
            </div>
            <div className={styles.contactMethod}>
              <h3>Phone</h3>
              <p>+994 (55) 123-4567</p>
            </div>
            <div className={styles.contactMethod}>
              <h3>Showroom</h3>
              <p>Baku, Narimanov, Ahmad Rajabli 15</p>
            </div>
          </div>

          {/* Sağ Tərəf: Form */}
          <div className={styles.contactForm}>
            
            {status === 'success' && (
              <div className={styles.successMessage}>
                ✅ Mesajınız uğurla göndərildi! Sizinlə tezliklə əlaqə saxlayacağıq.
              </div>
            )}
            
            {status === 'error' && (
              <div className={styles.errorMessage}>
                ❌ Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input 
                  className={styles.input}
                  type="text" id="name" name="name" required 
                  placeholder="John Doe"
                  value={formData.name} onChange={handleChange} 
                  disabled={status === 'loading'}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address *</label>
                <input 
                  className={styles.input}
                  type="email" id="email" name="email" required 
                  placeholder="john@example.com"
                  value={formData.email} onChange={handleChange} 
                  disabled={status === 'loading'}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input 
                  className={styles.input}
                  type="text" id="phoneNumber" name="phoneNumber" 
                  placeholder="+994 50 000 00 00"
                  value={formData.phoneNumber} onChange={handleChange} 
                  disabled={status === 'loading'}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject *</label>
                <input 
                  className={styles.input}
                  type="text" id="subject" name="subject" required 
                  placeholder="Product Inquiry"
                  value={formData.subject} onChange={handleChange} 
                  disabled={status === 'loading'}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message *</label>
                <textarea 
                  className={styles.textarea}
                  id="message" name="message" rows={5} required 
                  placeholder="How can we help you?"
                  value={formData.message} onChange={handleChange} 
                  disabled={status === 'loading'}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <span className={styles.spinner}></span> Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}