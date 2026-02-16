'use client';

import React, { useEffect, useState } from 'react';
import { getTags } from '@/lib/tags';
import styles from './CategoryFilters.module.css';

const CategoryFilters = () => {
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    getTags()
      .then((data) => setTags((Array.isArray(data) ? data : []).map((t) => ({ id: t.id, name: t.tagName }))))
      .catch(() => setTags([]));
  }, []);

  const items = [{ id: 0, name: 'All products' }, ...tags];

  return (
    <div className={styles.filterContainer}>
      <ul className={styles.categoryList}>
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={activeId === item.id || (item.id === 0 && activeId === null) ? styles.active : ''}
              onClick={() => setActiveId(item.id === 0 ? null : item.id)}
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