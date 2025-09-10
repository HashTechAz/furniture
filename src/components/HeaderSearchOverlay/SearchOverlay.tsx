"use client";

import { useRef, useEffect } from "react";
import styles from "./SearchOverlay.module.css";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  

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

  const overlayClasses = `${styles.overlayContainer} ${isOpen ? styles.open : ""}`;

  return (
    <div className={overlayClasses} ref={overlayRef}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
            autoFocus
          />
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;