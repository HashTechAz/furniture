'use client'; // 1. Client component olduğu üçün bu mütləqdir

import React, { useState } from 'react';
import styles from './page.module.css';

export default function Contact() {
  // 2. Form məlumatlarını saxlamaq üçün State
  const [formData, setFormData] = useState({
    name: '', // API-də fullName gedir, göndərəndə düzəldəcəyik
    email: '',
    subject: '',
    message: ''
  });

  // 3. Status (Yüklənir, Uğurlu, Xəta)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Input dəyişəndə state-i yeniləyir
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form göndəriləndə işləyən funksiya
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // 1. Göndərdiyimiz datanı konsolda görək (Düzgün dolubmu?)
    const payload = {
      fullName: formData.name,
      email: formData.email,
      phoneNumber: "", // Boşdursa boş string gedir
      subject: formData.subject,
      message: formData.message,
      password: "DummyPassword123!"
    };
    
    console.log("Göndərilən Data:", payload);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042';
      
      const response = await fetch(`${baseUrl}/api/Contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Formu təmizlə
      } else {
        // XƏTANIN SƏBƏBİNİ OXUYAQ
        const errorData = await response.text(); // JSON olmaya bilər deyə text kimi oxuyuruq
        console.error("❌ API Xətası (Detallı):", errorData);
        
        // Ekrana alert verək ki, dərhal görəsən
        alert(`Xəta baş verdi: ${errorData}`);
        
        setStatus('error');
      }
    } catch (error) {
      console.error("Şəbəkə xətası:", error);
      setStatus('error');
    }
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1>Contact Us</h1>
          <p>
            Get in touch with our team for product inquiries, support, or partnership opportunities.
          </p>
        </div>
      </div>

      <div className={styles.contactContent}>
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2>Get in Touch</h2>
              <p>
                We're here to help you find the perfect furniture solutions for your space. 
                Contact us for product information, design consultation, or support.
              </p>
              
              <div className={styles.contactMethods}>
                <div className={styles.contactMethod}>
                  <h3>Email</h3>
                  <p>info@montanafurniture.com</p>
                </div>
                <div className={styles.contactMethod}>
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div className={styles.contactMethod}>
                  <h3>Address</h3>
                  <p>123 Design Street<br />Furniture City, FC 12345</p>
                </div>
              </div>
            </div>

            <div className={styles.contactForm}>
              <h2>Send us a Message</h2>
              
              {/* Status Mesajları */}
              {status === 'success' && (
                <div style={{ padding: '15px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '5px', marginBottom: '20px' }}>
                  ✅ Message sent successfully! We will contact you soon.
                </div>
              )}
              {status === 'error' && (
                <div style={{ padding: '15px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '5px', marginBottom: '20px' }}>
                  ❌ Something went wrong. Please try again later.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    required 
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={status === 'loading'}
                  style={{ opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}