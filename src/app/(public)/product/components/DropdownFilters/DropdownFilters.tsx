'use client'; 

import React, { useState } from 'react';
import styles from './DropdownFilters.module.css';

// Renk seçenekleri için yeni bir tip tanımı
interface ColorOption {
  name: string;
  hex: string;
}

// Dropdown'un alabileceği props'ları güncelliyoruz
interface DropdownProps {
  label?: string;
  // options artık ya string dizisi ya da ColorOption dizisi olabilir
  options: (string | ColorOption)[]; 
  initialSelected?: string;
}

// Tek bir Dropdown bileşeni
const Dropdown = ({ label, options, initialSelected }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialSelected || (typeof options[0] === 'string' ? options[0] : options[0].name));

  const handleOptionClick = (option: string | ColorOption) => {
    // Tıklanan seçeneğin adını alıyoruz
    const optionName = typeof option === 'string' ? option : option.name;
    setSelectedOption(optionName);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button 
        className={styles.dropdownButton} 
        onClick={() => setIsOpen(!isOpen)}
      >
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
          {options.map((option, index) => {
            // Seçeneğin tipini kontrol ediyoruz
            const isColor = typeof option !== 'string';
            const optionName = isColor ? option.name : option;
            
            return (
              <li key={index}>
                <a href="#" className={isColor ? styles.colorOption : ''} onClick={(e) => { e.preventDefault(); handleOptionClick(option); }}>
                  {isColor && (
                    // Renk kutucuğunu (swatch) ekliyoruz
                    <span 
                      className={styles.colorSwatch} 
                      style={{ backgroundColor: (option as ColorOption).hex }}
                    ></span>
                  )}
                  {optionName}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

// Ana bileşen
const DropdownFilters = () => {
  const dispatchOptions = ["In stock", "1-2 weeks", "3-4 weeks"];
  const depthOptions = ["30 cm", "38 cm", "47 cm"];
  const seriesOptions = ["Montana System", "Montana Free", "Panton Wire"];
  const sortOptions = ["Montana recommends", "Price: Low to High", "Price: High to Low"];

  // DEĞİŞİKLİK: Renkleri isim ve hex kodu olarak tanımlıyoruz
  const colourOptions: ColorOption[] = [
    { name: "New White", hex: "#F1F0EA" },
    { name: "Fjord", hex: "#A9B3B9" },
    { name: "Ruby", hex: "#9B2C33" },
    { name: "Acacia", hex: "#A58D7F" },
    { name: "Oat", hex: "#E4D9C8" },
    { name: "Truffle", hex: "#D9CDC2" },
  ];

  return (
    <div className={styles.filtersWrapper}>
      <div className={styles.leftFilters}>
        <Dropdown label="Dispatch time" options={dispatchOptions} />
        <Dropdown label="Depth" options={depthOptions} />
        <Dropdown label="Colour" options={colourOptions} />
        <Dropdown label="Product series" options={seriesOptions} />
      </div>
      <div className={styles.rightFilters}>
        <span className={styles.sortByLabel}>Sort by:</span>
        <Dropdown options={sortOptions} initialSelected={sortOptions[0]} />
      </div>
    </div>
  );
};

export default DropdownFilters;