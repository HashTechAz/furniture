'use client'; // State kullanacağımız için bu direktif gerekli

import React, { useState } from 'react';
import styles from './DropdownFilters.module.css';

// Her bir dropdown için props tanımı
interface DropdownProps {
  label: string;
  options: string[];
}

// Tek bir Dropdown bileşeni
const Dropdown = ({ label, options }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.dropdown}>
      <button 
        className={styles.dropdownButton} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>
        <svg 
          width="12" height="12" viewBox="0 0 24 24" 
          fill="none" xmlns="http://www.w3.org/2000/svg"
          // Dropdown açıkken ikonu döndürmek için class ekliyoruz
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
        >
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {/* isOpen true ise menüyü göster */}
      <div className={`${styles.dropdownMenu} ${isOpen ? styles.menuOpen : ''}`}>
        <ul>
          {options.map((option, index) => (
            <li key={index}>
              <a href="#">{option}</a>
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
  const dispatchOptions = ["4-8 business days", "5 weeks", "7-9 weeks"];
  const depthOptions = ["Depth 30 cm", "Depth 38 cm", "Depth 47 cm", "Depth 57 cm"];
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
      <div className={styles.rightFilters}>
        <Dropdown label="Sort by:" options={sortOptions} />
        {/*
          "Montana recommends" yazısını kaldırdım çünkü artık
          "Sort by" dropdown'unun içinde bir seçenek.
          İstersen farklı bir şekilde tekrar ekleyebiliriz.
        */}
      </div>
    </div>
  );
};

export default DropdownFilters;