'use client'; 

import React, { useState } from 'react';
import styles from './DropdownFilters.module.css';

// Her bir dropdown için props tanımı
interface DropdownProps {
  label?: string; // Normal dropdown'lar için
  options: string[];
  initialSelected?: string; // Seçili değeri göstermek için
}

// Tek bir Dropdown bileşeni
const Dropdown = ({ label, options, initialSelected }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // Seçilen seçeneği saklamak için yeni bir state
  const [selectedOption, setSelectedOption] = useState(initialSelected || options[0]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option); // Seçeneği güncelle
    setIsOpen(false); // Menüyü kapat
  };

  return (
    <div className={styles.dropdown}>
      <button 
        className={styles.dropdownButton} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {/*
          Eğer 'label' prop'u varsa onu, yoksa 'selectedOption'ı göster.
          Bu, hem normal ("Dispatch time") hem de seçici ("Sort by") dropdown'lar için çalışmasını sağlar.
        */}
        <span>{label ? label : selectedOption}</span>
        <svg 
          width="12" height="12" viewBox="0 0 24 24" 
          fill="none" xmlns="http://www.w3.org/2000/svg"
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
        >
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <div className={`${styles.dropdownMenu} ${isOpen ? styles.menuOpen : ''}`}>
        <ul>
          {options.map((option, index) => (
            <li key={index}>
              {/* Tıklandığında handleOptionClick fonksiyonunu çağır */}
              <a href="#" onClick={(e) => { e.preventDefault(); handleOptionClick(option); }}>
                {option}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Ana bileşen
const DropdownFilters = () => {
  // Her dropdown için seçenek listeleri
  const dispatchOptions = ["In stock", "1-2 weeks", "3-4 weeks"];
  const depthOptions = ["30 cm", "38 cm", "47 cm"];
  const colourOptions = ["New White", "Fjord", "Ruby", "Acacia"];
  const seriesOptions = ["Montana System", "Montana Free", "Panton Wire"];
  const sortOptions = ["Montana recommends", "Price: Low to High", "Price: High to Low"];

  return (
    <div className={styles.filtersWrapper}>
      <div className={styles.leftFilters}>
        <Dropdown label="Dispatch time" options={dispatchOptions} />
        <Dropdown label="Depth" options={depthOptions} />
        <Dropdown label="Colour" options={colourOptions} />
        <Dropdown label="Product series" options={seriesOptions} />
      </div>
      {/* --- DEĞİŞİKLİK BURADA --- */}
      <div className={styles.rightFilters}>
        {/* Sabit etiket */}
        <span className={styles.sortByLabel}>Sort by:</span>
        {/* Seçici Dropdown */}
        <Dropdown options={sortOptions} initialSelected={sortOptions[0]} />
      </div>
    </div>
  );
};

export default DropdownFilters;