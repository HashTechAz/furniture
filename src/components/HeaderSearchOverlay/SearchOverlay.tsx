"use client";

import { useRef, useEffect } from "react";
import styles from "./SearchOverlay.module.css";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  // Focus the input only on client when overlay opens to avoid SSR/CSR mismatch
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const overlayClasses = `${styles.overlayContainer} ${isOpen ? styles.open : ""}`;

  return (
    <div className={overlayClasses} ref={overlayRef}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchBox}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
          />
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
          
        </div>
        <p>Popular search terms</p>
      </div>
    </div>
  );
};

export default SearchOverlay;