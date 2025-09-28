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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    dispatch: "",
    depth: "",
    colour: "",
    series: ""
  });
  const [openSections, setOpenSections] = useState({
    dispatch: false,
    depth: false,
    colour: false,
    series: false
  });

  // Her dropdown için seçenek listeleri
  const dispatchOptions = ["In stock", "1-2 weeks", "3-4 weeks"];
  const depthOptions = ["30 cm", "38 cm", "47 cm"];
  const colourOptions = ["New White", "Fjord", "Ruby", "Acacia"];
  const seriesOptions = ["Montana System", "Montana Free", "Panton Wire"];
  const sortOptions = ["Montana recommends", "Price: Low to High", "Price: High to Low"];

  const handleFilterSelect = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category] === value ? "" : value
    }));
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleApply = () => {
    // Apply logic here
    console.log("Applied filters:", selectedFilters);
    setIsMobileFilterOpen(false);
  };

  const handleCancel = () => {
    setIsMobileFilterOpen(false);
  };

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
        {/* Mobile Filter Button */}
        <button 
          className={styles.mobileFilterButton}
          onClick={() => setIsMobileFilterOpen(true)}
        >
          <div className={styles.filterIcon}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          Filter
        </button>

        {/* Mobile Filter Modal */}
        <div className={`${styles.mobileDropdownMenu} ${isMobileFilterOpen ? styles.open : ''}`}>
        <div className={styles.mobileDropdownContent}>
          <div className={styles.mobileDropdownHeader}>
            <h3>Filters</h3>
            <button className={styles.closeButton} onClick={handleCancel}>×</button>
          </div>

          <div className={styles.mobileFilterSection}>
            <h4 
              className={openSections.dispatch ? styles.open : ''}
              onClick={() => toggleSection('dispatch')}
            >
              Dispatch time
              <span className={styles.arrow}>▼</span>
            </h4>
            <div className={`${styles.mobileFilterOptions} ${openSections.dispatch ? styles.open : ''}`}>
              {dispatchOptions.map((option, index) => (
                <div
                  key={index}
                  className={`${styles.mobileFilterOption} ${selectedFilters.dispatch === option ? styles.selected : ''}`}
                  onClick={() => handleFilterSelect('dispatch', option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.mobileFilterSection}>
            <h4 
              className={openSections.depth ? styles.open : ''}
              onClick={() => toggleSection('depth')}
            >
              Depth
              <span className={styles.arrow}>▼</span>
            </h4>
            <div className={`${styles.mobileFilterOptions} ${openSections.depth ? styles.open : ''}`}>
              {depthOptions.map((option, index) => (
                <div
                  key={index}
                  className={`${styles.mobileFilterOption} ${selectedFilters.depth === option ? styles.selected : ''}`}
                  onClick={() => handleFilterSelect('depth', option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.mobileFilterSection}>
            <h4 
              className={openSections.colour ? styles.open : ''}
              onClick={() => toggleSection('colour')}
            >
              Colour
              <span className={styles.arrow}>▼</span>
            </h4>
            <div className={`${styles.mobileFilterOptions} ${openSections.colour ? styles.open : ''}`}>
              {colourOptions.map((option, index) => (
                <div
                  key={index}
                  className={`${styles.mobileFilterOption} ${selectedFilters.colour === option ? styles.selected : ''}`}
                  onClick={() => handleFilterSelect('colour', option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.mobileFilterSection}>
            <h4 
              className={openSections.series ? styles.open : ''}
              onClick={() => toggleSection('series')}
            >
              Product series
              <span className={styles.arrow}>▼</span>
            </h4>
            <div className={`${styles.mobileFilterOptions} ${openSections.series ? styles.open : ''}`}>
              {seriesOptions.map((option, index) => (
                <div
                  key={index}
                  className={`${styles.mobileFilterOption} ${selectedFilters.series === option ? styles.selected : ''}`}
                  onClick={() => handleFilterSelect('series', option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.mobileFilterButtons}>
            <button className={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
            <button className={styles.applyButton} onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
        </div>

        {/* Items count */}
        <span className={styles.itemsCount}>12 items</span>
        
        {/* Seçici Dropdown */}
        <Dropdown options={sortOptions} initialSelected={sortOptions[0]} />
      </div>
    </div>
  );
};

export default DropdownFilters;