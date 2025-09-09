'use client';

import { useState } from 'react';
import styles from './Filter.module.css';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  title: string;
  type: 'checkbox' | 'range';
  options?: FilterOption[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

interface FilterProps {
  title: string;
  groups: FilterGroup[];
  onFilterChange: (filters: Record<string, any>) => void;
  onClearFilters: () => void;
}

export default function Filter({ title, groups, onFilterChange, onClearFilters }: FilterProps) {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleCheckboxChange = (groupTitle: string, value: string, checked: boolean) => {
    const newFilters = { ...filters };
    if (!newFilters[groupTitle]) {
      newFilters[groupTitle] = [];
    }
    
    if (checked) {
      newFilters[groupTitle] = [...newFilters[groupTitle], value];
    } else {
      newFilters[groupTitle] = newFilters[groupTitle].filter((item: string) => item !== value);
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRangeChange = (groupTitle: string, value: number) => {
    const newFilters = { ...filters, [groupTitle]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    onClearFilters();
  };

  return (
    <div className={styles.filter}>
      <h3 className={styles.filterTitle}>{title}</h3>
      
      {groups.map((group, index) => (
        <div key={index} className={styles.filterGroup}>
          <h4 className={styles.filterGroupTitle}>{group.title}</h4>
          
          {group.type === 'checkbox' && group.options && (
            <div className={styles.filterOptions}>
              {group.options.map((option) => (
                <div key={option.value} className={styles.filterOption}>
                  <input
                    type="checkbox"
                    id={`${group.title}-${option.value}`}
                    checked={filters[group.title]?.includes(option.value) || false}
                    onChange={(e) => handleCheckboxChange(group.title, option.value, e.target.checked)}
                  />
                  <label htmlFor={`${group.title}-${option.value}`}>
                    {option.label}
                    {option.count && ` (${option.count})`}
                  </label>
                </div>
              ))}
            </div>
          )}
          
          {group.type === 'range' && (
            <div className={styles.filterRange}>
              <input
                type="range"
                min={group.min}
                max={group.max}
                step={group.step}
                value={filters[group.title] || group.min || 0}
                onChange={(e) => handleRangeChange(group.title, Number(e.target.value))}
              />
              <span className={styles.filterRangeValue}>
                {filters[group.title] || group.min || 0}{group.unit}
              </span>
            </div>
          )}
        </div>
      ))}
      
      <div className={styles.filterButtons}>
        <button className={styles.filterButton} onClick={handleClearFilters}>
          Clear All
        </button>
        <button className={`${styles.filterButton} ${styles.primary}`}>
          Apply Filters
        </button>
      </div>
    </div>
  );
}
