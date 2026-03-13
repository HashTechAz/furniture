'use client';

import React from 'react';
import styles from './AdminCheckbox.module.css';

interface AdminCheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  indeterminate?: boolean;
  'aria-label'?: string;
}

export function AdminCheckbox({ checked, onChange, indeterminate, 'aria-label': ariaLabel }: AdminCheckboxProps) {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate;
  }, [indeterminate]);

  return (
    <label className={styles.wrapper}>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.input}
        aria-label={ariaLabel}
      />
      <span className={styles.box} aria-hidden>
        {checked && !indeterminate && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {indeterminate && (
          <span className={styles.minus} />
        )}
      </span>
    </label>
  );
}
