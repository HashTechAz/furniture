'use client'; 
import React, { useState, useEffect } from 'react';
import styles from './DropdownFilters.module.css';
import { getColors, type BackendColor } from '@/lib/colors';
import type { Material } from '@/lib/materials';

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

const MaterialDropdown = ({
  materials,
  selectedMaterialId,
  onSelect,
}: {
  materials: Material[];
  selectedMaterialId: number | null;
  onSelect: (id: number | null) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedMaterial = materials.find((m) => m.id === selectedMaterialId);
  const displayLabel = selectedMaterial ? `Material - ${selectedMaterial.name}` : 'Material';
  return (
    <div className={styles.dropdown}>
      <button type="button" className={styles.dropdownButton} onClick={() => setIsOpen(!isOpen)}>
        <span>{displayLabel}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className={`${styles.dropdownMenu} ${isOpen ? styles.menuOpen : ''}`}>
        <ul>
          <li>
            <button
              type="button"
              style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px', font: 'inherit' }}
              className={selectedMaterialId === null ? styles.sortOption : ''}
              data-selected={selectedMaterialId === null ? 'true' : undefined}
              onClick={() => { onSelect(null); setIsOpen(false); }}
            >
              Hamısı
            </button>
          </li>
          {materials.length > 0 ? (
            materials.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px', font: 'inherit' }}
                  className={selectedMaterialId === m.id ? styles.sortOption : ''}
                  data-selected={selectedMaterialId === m.id ? 'true' : undefined}
                  onClick={() => { onSelect(m.id); setIsOpen(false); }}
                >
                  {m.name}
                </button>
              </li>
            ))
          ) : (
            <li style={{ padding: '10px', color: '#999' }}>Yüklənir...</li>
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

type SortOption = { label: string; value: string };
const SortDropdown = ({
  options,
  value,
  onChange,
}: {
  options: readonly SortOption[];
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const current = options.find((o) => o.value === value) || options[0];
  return (
    <div className={styles.dropdown}>
      <button
        type="button"
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{current?.label ?? 'Sırala'}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
        >
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className={`${styles.dropdownMenu} ${isOpen ? styles.menuOpen : ''}`}>
        <ul>
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                data-selected={opt.value === value ? 'true' : undefined}
                className={styles.sortOption}
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px', font: 'inherit' }}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface DropdownFiltersProps {
  onColorSelect?: (colorName: string) => void;
  selectedColor?: string;
  colors?: BackendColor[];
  materials?: Material[];
  selectedMaterialId?: number | null;
  onMaterialSelect?: (id: number | null) => void;
  sortBy?: string;
  onSortChange?: (sortBy: string) => void;
}

const DropdownFilters = ({
  onColorSelect,
  selectedColor = '',
  colors = [],
  materials = [],
  selectedMaterialId = null,
  onMaterialSelect,
  sortBy = 'newest',
  onSortChange,
}: DropdownFiltersProps) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [colourOptions, setColourOptions] = useState<BackendColor[]>(colors);

  const [selectedFilters, setSelectedFilters] = useState({
    material: selectedMaterialId,
    depth: "",
    colour: selectedColor,
    series: ""
  });
  const [openSections, setOpenSections] = useState({
    material: false,
    depth: false,
    colour: false,
    series: false
  });

  // Xarici rənglər dəyişəndə yenilə
  useEffect(() => {
    setColourOptions(colors);
  }, [colors]);

  // Xarici selectedColor dəyişəndə yenilə
  useEffect(() => {
    setSelectedFilters(prev => ({
      ...prev,
      colour: selectedColor
    }));
  }, [selectedColor]);

  const depthOptions = ["30 cm", "38 cm", "47 cm"];
  const seriesOptions = ["Montana System", "Montana Free", "Panton Wire"];

  useEffect(() => {
    setSelectedFilters((prev) => ({ ...prev, material: selectedMaterialId }));
  }, [selectedMaterialId]);

  // Backend sortBy: newest | price_asc | price_desc | name_asc | name_desc
  const SORT_OPTIONS = [
    { label: 'Ən yenilərə görə', value: 'newest' },
    { label: 'A-dan Z-yə', value: 'name_asc' },
    { label: 'Z-dən A-ya', value: 'name_desc' },
    { label: 'Ucuzdan Bahaya', value: 'price_asc' },
    { label: 'Bahadan Ucuza', value: 'price_desc' },
  ] as const;

  const handleFilterSelect = (category: keyof typeof selectedFilters, value: string | number | null) => {
    const newValue = selectedFilters[category] === value ? (category === 'material' ? null : "") : value;
    setSelectedFilters(prev => ({ ...prev, [category]: newValue }));
    if (category === 'colour' && onColorSelect && typeof value === 'string') {
      onColorSelect(value);
    }
    if (category === 'material' && onMaterialSelect) {
      onMaterialSelect(typeof newValue === 'number' ? newValue : null);
    }
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
        <MaterialDropdown
          materials={materials}
          selectedMaterialId={selectedMaterialId ?? null}
          onSelect={(id) => onMaterialSelect?.(id)}
        />
        <Dropdown label="Depth" options={depthOptions} />
        <ColourDropdown colors={colourOptions} selectedName={selectedFilters.colour} onSelect={(name) => handleFilterSelect('colour', name)} />
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
              className={openSections.material ? styles.open : ''}
              onClick={() => toggleSection('material')}
            >
              Material
              <span className={styles.arrow}>▼</span>
            </h4>
            <div className={`${styles.mobileFilterOptions} ${openSections.material ? styles.open : ''}`}>
              <div
                className={`${styles.mobileFilterOption} ${selectedFilters.material === null || selectedFilters.material === '' ? styles.selected : ''}`}
                onClick={() => handleFilterSelect('material', null)}
              >
                Hamısı
              </div>
              {materials.length > 0 ? (
                materials.map((m) => (
                  <div
                    key={m.id}
                    className={`${styles.mobileFilterOption} ${selectedFilters.material === m.id ? styles.selected : ''}`}
                    onClick={() => handleFilterSelect('material', m.id)}
                  >
                    {m.name}
                  </div>
                ))
              ) : (
                <div style={{ padding: '10px', color: '#999' }}>Yüklənir...</div>
              )}
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

        {/* Sıralama dropdown — backend sortBy: newest | price_asc | price_desc | name_asc | name_desc */}
        <SortDropdown
          options={SORT_OPTIONS}
          value={sortBy}
          onChange={(value) => onSortChange?.(value)}
        />
      </div>
    </div>
  );
};

export default DropdownFilters;