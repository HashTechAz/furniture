import React from 'react';
import styles from './DropdownFilters.module.css';

const Dropdown = ({ label }: { label: string }) => (
  <div className={styles.dropdown}>
    <button className={styles.dropdownButton}>
      <span>{label}</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  </div>
);

const DropdownFilters = () => {
  return (
    <div className={styles.filtersWrapper}>
      <div className={styles.leftFilters}>
        <Dropdown label="Series" />
        <Dropdown label="Function" />
        <Dropdown label="Colour" />
        <Dropdown label="Designer" />
      </div>
      <div className={styles.rightFilters}>
        <Dropdown label="Sort by" />
      </div>
    </div>
  );
};

export default DropdownFilters;