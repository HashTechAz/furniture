'use client'; 
import React, { useState, useEffect } from 'react';
import styles from './DropdownFilters.module.css';
// YENİ: API-dən rəngləri gətirmək üçün
import { getColors, type BackendColor } from '@/lib/colors';

interface DropdownProps {
  label?: string; 
  options: string[];
  initialSelected?: string; 
}

const Dropdown = ({ label, options, initialSelected }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialSelected || (options.length > 0 ? options[0] : ''));

  // Options dəyişəndə (API yüklənəndə) seçimi yeniləyək
  useEffect(() => {
    if (options.length > 0 && !selectedOption) {
        setSelectedOption(options[0]);
    }
  }, [options, selectedOption]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option); 
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
          {options.length > 0 ? (
            options.map((option, index) => (
                <li key={index}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleOptionClick(option); }}>
                    {option}
                </a>
                </li>
            ))
          ) : (
            <li style={{padding: '10px', color: '#999'}}>Yüklənir...</li>
          )}
        </ul>
      </div>
    </div>
  );
};

const ColourDropdown = ({ colors, selectedName, onSelect }: { colors: BackendColor[]; selectedName: string; onSelect: (name: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const displayLabel = selectedName ? `Colour - ${selectedName}` : 'Colour';
  return (
    <div className={styles.dropdown}>
      <button type="button" className={styles.dropdownButton} onClick={() => setIsOpen(!isOpen)}>
        <span>{displayLabel}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className={`${styles.dropdownMenu} ${isOpen ? styles.menuOpen : ''}`}>
        <div className={styles.colorSwatches}>
          {colors.length > 0 ? (
            colors.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`${styles.colorSwatch} ${selectedName === c.name ? styles.colorSwatchSelected : ''}`}
                style={{ background: c.hexCode || '#ccc' }}
                title={c.name}
                onClick={() => { onSelect(c.name); setIsOpen(false); }}
              />
            ))
          ) : (
            <span className={styles.colorSwatchLoading}>Yüklənir...</span>
          )}
        </div>
      </div>
    </div>
  );
};

const DropdownFilters = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [colourOptions, setColourOptions] = useState<BackendColor[]>([]);

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

  // YENİ: API-dən rəngləri çəkmək
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const data = await getColors();
        setColourOptions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Filtr rəngləri yüklənmədi:", error);
      }
    };
    fetchColors();
  }, []);

  const dispatchOptions = ["In stock", "1-2 weeks", "3-4 weeks"];
  const depthOptions = ["30 cm", "38 cm", "47 cm"];
  // const colourOptions = ["New White", "Fjord", "Ruby", "Acacia"]; // KÖHNƏ STATİK KOD SİLİNDİ
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
        
        <ColourDropdown colors={colourOptions} selectedName={selectedFilters.colour} onSelect={(name) => setSelectedFilters((p) => ({ ...p, colour: p.colour === name ? '' : name }))} />
        
        <Dropdown label="Product series" options={seriesOptions} />
      </div>
      
      <div className={styles.rightFilters}>
        <button 
          className={styles.mobileFilterButton}
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          <div className={styles.filterIcon}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          Filter
        </button>

        <span className={styles.itemsCount}>14 items</span>

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

          {/* MOBİL RƏNG FİLTRİ (API-dən) */}
          <div className={styles.mobileFilterSection}>
            <h4 
              className={openSections.colour ? styles.open : ''}
              onClick={() => toggleSection('colour')}
            >
              Colour
              <span className={styles.arrow}>▼</span>
            </h4>
            <div className={`${styles.mobileFilterOptions} ${openSections.colour ? styles.open : ''}`}>
              {colourOptions.length > 0 ? (
                <div className={styles.colorSwatches}>
                  {colourOptions.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`${styles.colorSwatch} ${selectedFilters.colour === c.name ? styles.colorSwatchSelected : ''}`}
                      style={{ background: c.hexCode || '#ccc' }}
                      title={c.name}
                      onClick={() => handleFilterSelect('colour', c.name)}
                    />
                  ))}
                </div>
              ) : (
                <div style={{ padding: '10px' }}>Yüklənir...</div>
              )}
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

        {/* Seçici Dropdown */}
        <Dropdown options={sortOptions} initialSelected={sortOptions[0]} />
      </div>
    </div>
  );
};

export default DropdownFilters;