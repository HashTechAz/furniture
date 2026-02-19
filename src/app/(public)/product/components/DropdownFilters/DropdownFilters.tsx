'use client'; 
import React, { useState, useEffect } from 'react';
import styles from './DropdownFilters.module.css';
import { getColors, type BackendColor } from '@/lib/colors';
import type { Material } from '@/lib/materials';
import type { BackendCollection } from '@/lib/collections';

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

export type DepthRange = { min: number; max?: number } | null;

const DEPTH_RANGE_OPTIONS: { label: string; value: DepthRange }[] = [
  { label: 'Hamısı', value: null },
  { label: '30-50 sm', value: { min: 30, max: 50 } },
  { label: '50-80 sm', value: { min: 50, max: 80 } },
  { label: '80-120 sm', value: { min: 80, max: 120 } },
  { label: '120+ sm', value: { min: 120 } },
];

const DepthDropdown = ({
  selectedDepthRange,
  onSelect,
}: {
  selectedDepthRange: DepthRange;
  onSelect: (range: DepthRange) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const current = DEPTH_RANGE_OPTIONS.find(
    (opt) =>
      opt.value === null
        ? selectedDepthRange === null
        : selectedDepthRange !== null && opt.value?.min === selectedDepthRange.min && opt.value?.max === selectedDepthRange.max
  ) ?? DEPTH_RANGE_OPTIONS[0];
  const displayLabel = selectedDepthRange === null ? 'Derinlik' : (current?.label ?? 'Derinlik');
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
          {DEPTH_RANGE_OPTIONS.map((opt) => (
            <li key={opt.label}>
              <button
                type="button"
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px', fontSize: 14, fontWeight: 500 }}
                className={opt.value === null ? (selectedDepthRange === null ? styles.sortOption : '') : (selectedDepthRange?.min === opt.value?.min && selectedDepthRange?.max === opt.value?.max ? styles.sortOption : '')}
                data-selected={
                  (opt.value === null && selectedDepthRange === null) ||
                  (opt.value !== null && selectedDepthRange !== null && opt.value?.min === selectedDepthRange.min && opt.value?.max === selectedDepthRange.max)
                    ? 'true'
                    : undefined
                }
                onClick={() => { onSelect(opt.value); setIsOpen(false); }}
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
              style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px', fontSize: 14, fontWeight: 500 }}
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
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px', fontSize: 14, fontWeight: 500 }}
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

const CollectionDropdown = ({
  collections,
  selectedCollectionId,
  onSelect,
}: {
  collections: BackendCollection[];
  selectedCollectionId: number | null;
  onSelect: (id: number | null) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCollection = collections.find((c) => c.id === selectedCollectionId);
  const displayLabel = selectedCollection ? `Kolleksiya - ${selectedCollection.name}` : 'Kolleksiya';
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
              style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px', fontSize: 14, fontWeight: 500 }}
              className={selectedCollectionId === null ? styles.sortOption : ''}
              data-selected={selectedCollectionId === null ? 'true' : undefined}
              onClick={() => { onSelect(null); setIsOpen(false); }}
            >
              Hamısı
            </button>
          </li>
          {collections.length > 0 ? (
            collections.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px', fontSize: 14, fontWeight: 500 }}
                  className={selectedCollectionId === c.id ? styles.sortOption : ''}
                  data-selected={selectedCollectionId === c.id ? 'true' : undefined}
                  onClick={() => { onSelect(c.id); setIsOpen(false); }}
                >
                  {c.name}
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
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px', fontSize: 14, fontWeight: 500 }}
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
  selectedDepthRange?: DepthRange;
  onDepthRangeSelect?: (range: DepthRange) => void;
  collections?: BackendCollection[];
  selectedCollectionId?: number | null;
  onCollectionSelect?: (id: number | null) => void;
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
  selectedDepthRange = null,
  onDepthRangeSelect,
  collections = [],
  selectedCollectionId = null,
  onCollectionSelect,
  sortBy = 'newest',
  onSortChange,
}: DropdownFiltersProps) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [colourOptions, setColourOptions] = useState<BackendColor[]>(colors);

  const [selectedFilters, setSelectedFilters] = useState<{
    material: number | null;
    depth: DepthRange;
    colour: string;
    collection: number | null;
  }>({
    material: selectedMaterialId,
    depth: selectedDepthRange,
    colour: selectedColor,
    collection: selectedCollectionId
  });
  const [openSections, setOpenSections] = useState({
    material: false,
    depth: false,
    colour: false,
    collection: false
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

  useEffect(() => {
    setSelectedFilters((prev) => ({ ...prev, collection: selectedCollectionId }));
  }, [selectedCollectionId]);

  useEffect(() => {
    setSelectedFilters((prev) => ({ ...prev, depth: selectedDepthRange }));
  }, [selectedDepthRange]);

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

  const isSameDepth = (a: DepthRange, b: DepthRange) => {
    if (a === null && b === null) return true;
    if (a === null || b === null) return false;
    return a.min === b.min && a.max === b.max;
  };

  const handleFilterSelect = (category: keyof typeof selectedFilters, value: string | number | DepthRange) => {
    const isDepth = category === 'depth';
    const isMaterial = category === 'material';
    const isCollection = category === 'collection';
    const current = selectedFilters[category];
    const same = isDepth ? isSameDepth(current as DepthRange, value as DepthRange) : current === value;
    const newValue = same ? (isMaterial || isCollection ? null : isDepth ? null : '') : value;
    setSelectedFilters(prev => ({ ...prev, [category]: newValue }));
    if (category === 'colour' && onColorSelect && typeof value === 'string') {
      onColorSelect(value);
    }
    if (category === 'material' && onMaterialSelect) {
      onMaterialSelect(typeof newValue === 'number' ? newValue : null);
    }
    if (category === 'depth' && onDepthRangeSelect) {
      onDepthRangeSelect(newValue as DepthRange);
    }
    if (category === 'collection' && onCollectionSelect) {
      onCollectionSelect(typeof newValue === 'number' ? newValue : null);
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
        <DepthDropdown
          selectedDepthRange={selectedDepthRange ?? null}
          onSelect={(range) => onDepthRangeSelect?.(range)}
        />
        <ColourDropdown colors={colourOptions} selectedName={selectedFilters.colour} onSelect={(name) => handleFilterSelect('colour', name)} />
        <CollectionDropdown
          collections={collections}
          selectedCollectionId={selectedCollectionId ?? null}
          onSelect={(id) => onCollectionSelect?.(id)}
        />
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
                className={`${styles.mobileFilterOption} ${selectedFilters.material === null ? styles.selected : ''}`}
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
              Depth (sm)
              <span className={styles.arrow}>▼</span>
            </h4>
            <div className={`${styles.mobileFilterOptions} ${openSections.depth ? styles.open : ''}`}>
              {DEPTH_RANGE_OPTIONS.map((opt) => (
                <div
                  key={opt.label}
                  className={`${styles.mobileFilterOption} ${
                    (opt.value === null && selectedFilters.depth === null) ||
                    (opt.value !== null && selectedFilters.depth !== null && opt.value?.min === selectedFilters.depth?.min && opt.value?.max === selectedFilters.depth?.max)
                      ? styles.selected
                      : ''
                  }`}
                  onClick={() => handleFilterSelect('depth', opt.value)}
                >
                  {opt.label}
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
              className={openSections.collection ? styles.open : ''}
              onClick={() => toggleSection('collection')}
            >
              Kolleksiya
              <span className={styles.arrow}>▼</span>
            </h4>
            <div className={`${styles.mobileFilterOptions} ${openSections.collection ? styles.open : ''}`}>
              <div
                className={`${styles.mobileFilterOption} ${selectedFilters.collection === null ? styles.selected : ''}`}
                onClick={() => handleFilterSelect('collection', null)}
              >
                Hamısı
              </div>
              {collections.length > 0 ? (
                collections.map((c) => (
                  <div
                    key={c.id}
                    className={`${styles.mobileFilterOption} ${selectedFilters.collection === c.id ? styles.selected : ''}`}
                    onClick={() => handleFilterSelect('collection', c.id)}
                  >
                    {c.name}
                  </div>
                ))
              ) : (
                <div style={{ padding: '10px', color: '#999' }}>Yüklənir...</div>
              )}
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