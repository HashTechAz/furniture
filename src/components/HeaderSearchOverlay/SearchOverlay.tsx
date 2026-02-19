"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProducts, FrontendProduct } from "@/lib/products";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./SearchOverlay.module.css";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // --- YENİ: Axtarış State-ləri ---
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FrontendProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Outside Click (Mövcud kodun)
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "hidden"; // Scroll-u bağlayırıq
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Focus Input (Mövcud kodun)
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Bağlananda təmizləyək
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // --- YENİ: Axtarış Məntiqi (Debounce) ---
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (val.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    debounceRef.current = setTimeout(async () => {
      try {
        // Backend-dən məhsulları gətiririk (Cache-siz)
        const data = await getProducts(
          { searchTerm: val, pageSize: 12 },
          { skipCache: true }
        );
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms gözləmə
  };

  // Enter basanda məhsul səhifəsinə axtarış ilə get
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim().length > 0) {
      onClose();
      router.push(`/product?search=${encodeURIComponent(query.trim())}`);
    }
  };

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
            value={query}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M14.5 9.5L9.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M9.5 9.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* --- YENİ: Nəticələr Hissəsi --- */}
        <div className={styles.resultsContainer}>
          
          {/* 1. Yüklənir */}
          {loading && <p className={styles.statusText}>Axtarılır...</p>}

          {/* 2. Heç nə tapılmadı */}
          {!loading && query.length >= 2 && results.length === 0 && (
             <p className={styles.statusText}>Nəticə tapılmadı.</p>
          )}

          {/* 3. Nəticələr var – ProductCard ilə */}
          {!loading && results.length > 0 && (
            <div className={styles.resultsList}>
              {results.map((product) => (
                <div key={product.id} className={styles.resultCardWrap} onClick={onClose}>
                  <ProductCard
                    id={product.id}
                    imageSrc={product.imageSrc}
                    imageSrcHover={product.imageSrcHover}
                    title={product.title}
                    color={product.color}
                    measurements={product.measurements}
                    position={product.position}
                    price={product.price}
                  />
                </div>
              ))}
              <button
                type="button"
                className={styles.viewAllButton}
                onClick={() => {
                  onClose();
                  router.push(`/product?search=${encodeURIComponent(query)}`);
                }}
              >
                Bütün nəticələrə bax ({query}) &rarr;
              </button>
            </div>
          )}

          {/* 4. Default hal (Populyar axtarışlar) */}
          {!query && (
            <div className={styles.popularTerms}>
              <p>Populyar terminlər:</p>
              {/* Buranı gələcəkdə statik sözlərlə doldura bilərsən */}
              <span>Sofa, Chair, Table...</span> 
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SearchOverlay;