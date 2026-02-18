'use client';

import React, { useEffect, useState } from 'react';
import { getCategories } from '@/lib/categories';
import type { Category } from '@/lib/categories';
import styles from './CategoryFilters.module.css';

interface CategoryFiltersProps {
  selectedCategoryId: number | null;
  onCategoryChange: (categoryId: number | null) => void;
}

const CategoryFilters = ({ selectedCategoryId, onCategoryChange }: CategoryFiltersProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  const items = [{ id: 0, name: 'Bütün məhsullar' }, ...categories];
  const activeId = selectedCategoryId ?? 0;

  if (loading) {
    return (
      <div className={styles.filterContainer}>
        <ul className={styles.categoryList}>
          <li><span className={styles.placeholder}>...</span></li>
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.filterContainer}>
      <ul className={styles.categoryList}>
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={activeId === item.id ? styles.active : ''}
              onClick={() => onCategoryChange(item.id === 0 ? null : item.id)}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilters;
