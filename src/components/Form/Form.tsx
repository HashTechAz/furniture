"use client";

import React, { useState } from "react";
import styles from "./Form.module.css";
import Link from "next/link";

interface FormProps {
  name: string;
  email: string;
}

const Form = ({ name, email }: FormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    customerType: "",
    termsAccepted: false
  });
  
  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    customerType: false,
    termsAccepted: false
  });
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const customerTypes = [
    "Private Customer",
    "Professional",
    "Architect"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors(prev => ({ ...prev, [name]: true }));
    }
  };

  const handleDropdownSelect = (type: string) => {
    setFormData(prev => ({ ...prev, customerType: type }));
    setDropdownOpen(false);
    if (errors.customerType) {
      setErrors(prev => ({ ...prev, customerType: false }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFormData(prev => ({ ...prev, termsAccepted: checked }));
    if (errors.termsAccepted) {
      setErrors(prev => ({ ...prev, termsAccepted: false }));
    }
  };

  const handleCheckboxBlur = () => {
    if (!formData.termsAccepted) {
      setErrors(prev => ({ ...prev, termsAccepted: true }));
    }
  };

  return (
    <>
      <section className={styles.formSection}>
        <div className={styles.formMain}>
          <div className={styles.formTitle}>
            <h1>Stay tuned to get more inspiration and news from us.</h1>
          </div>
          <div className={styles.formContentBox}>
            <div className={styles.formLeftContent}>
              <p>
                We are sending newsletters about inspiration, campaign offers
                and invitations for events. You can unsubscribe directly from
                the newsletters or by contacting us at <Link className={styles.formLink} href={"/"}>montana@montana.dk</Link>. Read
                more about our <Link className={styles.formLink} href={"/"}>privacy policy</Link>.
              </p>
            </div>

            <div className={styles.formRightContent}>
              <form className={styles.form}>
                <div className={styles.inputGroup}>
                  <input 
                    type="text" 
                    name="fullName"
                    placeholder="Full Name" 
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={errors.fullName ? styles.inputError : ""}
                    required 
                  />
                  {errors.fullName && <span className={styles.errorMessage}>This field is required</span>}
                </div>
                
                <div className={styles.inputGroup}>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={errors.email ? styles.inputError : ""}
                    required 
                  />
                  {errors.email && <span className={styles.errorMessage}>This field is required</span>}
                </div>
                
                <div className={styles.inputGroup}>
                  <div className={styles.dropdownContainer}>
                    <input 
                      type="text" 
                      name="customerType"
                      placeholder="Customer Type" 
                      value={formData.customerType}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`${styles.dropdownInput} ${errors.customerType ? styles.inputError : ""}`}
                      readOnly
                      required 
                    />
                    <span className={styles.dropdownArrow} onClick={() => setDropdownOpen(!dropdownOpen)}>▼</span>
                    
                    {dropdownOpen && (
                      <div className={styles.dropdownMenu}>
                        {customerTypes.map((type, index) => (
                          <div 
                            key={index}
                            className={styles.dropdownItem}
                            onClick={() => handleDropdownSelect(type)}
                          >
                            {type}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.customerType && <span className={styles.errorMessage}>This field is required</span>}
                </div>
                
                <div className={styles.checkboxGroup}>
                  <div className={styles.checkboxContainer}>
                    <input 
                      type="checkbox" 
                      id="terms"
                      checked={formData.termsAccepted}
                      onChange={handleCheckboxChange}
                      onBlur={handleCheckboxBlur}
                      className={errors.termsAccepted ? styles.checkboxError : ""}
                      required 
                    />
                    <label htmlFor="terms" className={styles.checkboxLabel}>
                      I have read and accepted the <span className={styles.linkText}>newsletter terms</span> and <span className={styles.linkText}>privacy policy</span>
                    </label>
                  </div>
                  {errors.termsAccepted && <span className={styles.errorMessage}>You must accept the terms</span>}
                </div>
                
                <div className={styles.buttonContainer}>
                  <button type="submit" className={styles.submitButton}>
                    Send Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Form;
