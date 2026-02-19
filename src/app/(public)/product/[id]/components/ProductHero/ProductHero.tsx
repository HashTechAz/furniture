"use client";
import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./ProductHero.module.css";
import { FrontendProduct, getProductVariants, getProductVariantsByNameFallback } from "@/lib/products";
import { getColors, BackendColor } from "@/lib/colors";

interface ProductHeroProps {
  product: FrontendProduct;
}

// --- ICONS ---
const CloseIcon = ({ size = 24, color = "#333" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 6L18 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckmarkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- FULL SCREEN GALLERY MODAL ---
const FullScreenGallery = ({
  images,
  onClose,
  title,
}: {
  images: string[];
  onClose: () => void;
  title: string;
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.9, 900);
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <div className={styles.galleryOverlay}>
      {/* Header: title ortada, sağda oxlar + close */}
      <header className={styles.galleryHeader}>
        <div style={{ width: 80 }} aria-hidden />
        <h2 className={styles.galleryTitle}>{title} Gallery</h2>
        <div className={styles.galleryNav}>
          <button
            type="button"
            className={styles.galleryNavButton}
            onClick={() => scroll("left")}
            aria-label="Əvvəlki"
          >
            ←
          </button>
          <button
            type="button"
            className={styles.galleryNavButton}
            onClick={() => scroll("right")}
            aria-label="Növbəti"
          >
            →
          </button>
          <button
            type="button"
            className={styles.galleryCloseButton}
            onClick={onClose}
            aria-label="Bağla"
          >
            <CloseIcon size={24} />
          </button>
        </div>
      </header>

      {/* Böyük şəkillər, yan-yana, üfüqi scroll */}
      <div
        ref={scrollRef}
        className={styles.gallerySliderContainer}
        style={{ overflowX: "auto", overflowY: "hidden", display: "flex", alignItems: "center" }}
      >
        <div className={styles.galleryScrollTrack}>
          {images.map((src, index) => (
            <div key={index} className={styles.galleryLargeSlide}>
              <Image
                src={src}
                alt={`${title} image ${index + 1}`}
                fill
                className={styles.galleryImage}
                sizes="90vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- COLOUR PANEL ---
const ColourPanel = ({
  currentColor,
  currentProductId,
  productGroupId,
  variants,
  currentProductForSingle,
  allColors,
  loadingColors,
  onSelectColor,
  onSelectVariant,
}: {
  currentColor: string;
  currentProductId: number;
  productGroupId: number | null | undefined;
  variants: FrontendProduct[];
  currentProductForSingle: FrontendProduct | null;
  allColors: BackendColor[];
  loadingColors: boolean;
  onSelectColor: (color: string) => void;
  onSelectVariant?: (variantId: number) => void;
}) => {
  const hasVariants = variants.length > 0;
  const showOnlyProductColors = hasVariants || currentProductForSingle != null;
  const colorNameToHex = Object.fromEntries(
    allColors.map((c) => [c.name.toLowerCase(), c.hexCode])
  );

  const listToShow = hasVariants
    ? variants
    : currentProductForSingle
    ? [currentProductForSingle]
    : [];

  return (
    <div className={styles.panelLayout}>
      <div className={styles.panelContent}>
        <div className={styles.panelHeader}>
          <h3>Colour: {currentColor}</h3>
        </div>
        <div className={styles.panelSubHeader}>
          <span>
            {hasVariants
              ? "Bu məhsulun rəng variantları"
              : listToShow.length === 1
              ? "Bu məhsulun yalnız bu rəngi var"
              : ""}
          </span>
        </div>

        {loadingColors ? (
          <p style={{ padding: "20px", color: "#666" }}>Rənglər yüklənir...</p>
        ) : showOnlyProductColors ? (
          <>
            <div className={styles.colorGrid}>
              {listToShow.map((v) => {
                const hex = colorNameToHex[v.color?.toLowerCase()] || "#ccc";
                const isCurrent = v.id === currentProductId;
                return (
                  <div
                    key={v.id}
                    className={styles.colorSwatchWrapper}
                    onClick={isCurrent ? undefined : () => onSelectVariant?.(v.id)}
                    title={isCurrent ? `${v.title} (cari)` : `${v.title} – ${v.color}`}
                  >
                    <div className={styles.colorSwatch} style={{ backgroundColor: hex }}>
                      {isCurrent && (
                        <div className={styles.checkmarkIcon}>
                          <CheckmarkIcon />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {listToShow.length === 1 && (
              <p style={{ padding: "12px 0 0", fontSize: 13, color: "#666" }}>
                Bu məhsulun başqa rəng seçimi yoxdur.
              </p>
            )}
          </>
        ) : (
          <p style={{ padding: "20px", color: "#666" }}>Rəng məlumatı yoxdur.</p>
        )}
      </div>
    </div>
  );
};

// --- POSITION PANEL ---
const PositionPanel = ({
  currentPosition,
  onSelectPosition,
}: {
  currentPosition: string;
  onSelectPosition: (position: string) => void;
}) => {
  const positionOptions = [
    "Plinth H3 cm",
    "Plinth H7 cm",
    "Castors H6.8 cm",
    "Legs H12.6 cm",
    "No position (used for stacked modules)",
    "Suspension rail",
  ];
  return (
    <div className={styles.panelContent}>
      <div className={styles.panelHeader}>
        <h3>Position: {currentPosition}</h3>
      </div>
      <ul className={styles.positionList}>
        {positionOptions.map((option) => (
          <li
            key={option}
            className={`${styles.positionItem} ${
              currentPosition === option ? styles.activePosition : ""
            }`}
            onClick={() => onSelectPosition(option)}
          >
            {" "}
            {option}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- DEPTH PANEL ---
const DepthPanel = ({
  currentDepth,
  onSelectDepth,
}: {
  currentDepth: string;
  onSelectDepth: (depth: string) => void;
}) => {
  const depthOptions = ["Depth 20 cm", "Depth 30 cm", "Depth 38 cm", "Depth 47 cm"];
  return (
    <div className={styles.panelContent}>
      <div className={styles.panelHeader}>
        <h3>Depth: {currentDepth}</h3>
      </div>
      <ul className={styles.positionList}>
        {depthOptions.map((option) => (
          <li
            key={option}
            className={`${styles.positionItem} ${
              currentDepth === option ? styles.activePosition : ""
            }`}
            onClick={() => onSelectDepth(option)}
          >
            {" "}
            {option}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- MAIN HERO COMPONENT ---
const ProductHero = ({ product }: ProductHeroProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("description");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Gallery Modal State
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Lens zoom: şəkil sabit, lens siçanla hərəkət edir
  const imageWrapRef = React.useRef<HTMLDivElement>(null);
  const [lensData, setLensData] = useState<{
    lensX: number;
    lensY: number;
    innerLeft: number;
    innerTop: number;
    innerWidth: number;
    innerHeight: number;
  } | null>(null);
  const LENS_SIZE = 140;
  const ZOOM_FACTOR = 2;

  // Məhsulun əsas şəkli
  const [heroImage, setHeroImage] = useState(product.mainImage);

  const [currentProductColor, setCurrentProductColor] = useState(product.color || "White");
  const [currentProductPosition, setCurrentProductPosition] = useState(
    product.position || "Plinth H3 cm"
  );
  const [currentProductDepth, setCurrentProductDepth] = useState("Depth 38 cm");

  const [variants, setVariants] = useState<FrontendProduct[]>([]);
  const [allColors, setAllColors] = useState<BackendColor[]>([]);
  const [loadingColors, setLoadingColors] = useState(true);

  // Məhsul dəyişdikdə şəkli yenilə
  useEffect(() => {
    setHeroImage(product.mainImage);
    setCurrentProductColor(product.color || "White");
  }, [product]);

  useEffect(() => {
    const load = async () => {
      setLoadingColors(true);
      try {
        const colors = await getColors();
        setAllColors(colors);
        if (product.productGroupId != null) {
          const list = await getProductVariants(product.productGroupId);
          const sameGroup = list.filter((p) => p.productGroupId === product.productGroupId);
          setVariants(sameGroup);
        } else {
          const list = await getProductVariantsByNameFallback(product);
          setVariants(list.length >= 2 ? list : []);
        }
      } catch (e) {
        console.error("Colour panel load error:", e);
      } finally {
        setLoadingColors(false);
      }
    };
    load();
  }, [product.id, product.productGroupId, product.title, product.categoryId]);

  const handleSelectVariant = useCallback(
    (variantId: number) => {
      router.push(`/product/${variantId}`);
    },
    [router]
  );

  // Şəkil üzərində siçan — lens mövqeyi (şəkil sabit, zoom lens içində hərəkət edir)
  const handleImageMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const wrap = imageWrapRef.current;
      if (!wrap) return;
      const img = wrap.querySelector("img");
      if (!img) return;
      const rect = wrap.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const nw = (img as HTMLImageElement).naturalWidth || rect.width;
      const nh = (img as HTMLImageElement).naturalHeight || rect.height;
      const scale = Math.min(rect.width / nw, rect.height / nh);
      const dispW = nw * scale;
      const dispH = nh * scale;
      const offsetX = (rect.width - dispW) / 2;
      const offsetY = (rect.height - dispH) / 2;
      const cix = cx - offsetX;
      const ciy = cy - offsetY;
      const innerW = dispW * ZOOM_FACTOR;
      const innerH = dispH * ZOOM_FACTOR;
      setLensData({
        lensX: cx,
        lensY: cy,
        innerLeft: LENS_SIZE / 2 - cix * ZOOM_FACTOR,
        innerTop: LENS_SIZE / 2 - ciy * ZOOM_FACTOR,
        innerWidth: innerW,
        innerHeight: innerH,
      });
    },
    []
  );

  const handleImageMouseLeave = useCallback(() => setLensData(null), []);

  // Menyuda click olunduqda
  const handleMenuClick = (menuKey: string) => {
    // Əgər Gallery seçilibsə, Modalı aç, Menu panelini yox
    if (menuKey === "gallery") {
      setIsGalleryOpen(true);
      setOpenMenu(null); // Başqa açıq menu varsa bağla
      return;
    }
    // Digər menyular üçün standart davranış
    setOpenMenu((prev) => (prev === menuKey ? null : menuKey));
  };

  const menuItems = [
    {
      key: "colour",
      label: "Colour",
      value: currentProductColor,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill={currentProductColor.toLowerCase()} stroke="#333" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="6" fill="#fff" />
        </svg>
      ),
      panel: (
        <ColourPanel
          currentColor={currentProductColor}
          currentProductId={product.id}
          productGroupId={product.productGroupId}
          variants={variants}
          currentProductForSingle={variants.length === 0 ? product : null}
          allColors={allColors}
          loadingColors={loadingColors}
          onSelectColor={setCurrentProductColor}
          onSelectVariant={handleSelectVariant}
        />
      ),
    },
    {
      key: "position",
      label: "Position",
      value: currentProductPosition,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="#333" strokeWidth="2" />
          <path d="M7 6V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke="#333" strokeWidth="2" />
        </svg>
      ),
      panel: (
        <PositionPanel
          currentPosition={currentProductPosition}
          onSelectPosition={setCurrentProductPosition}
        />
      ),
    },
    {
      key: "depth",
      label: "Depth",
      value: currentProductDepth,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3v18" stroke="#333" strokeWidth="2" />
          <path d="M3 3h18" stroke="#333" strokeWidth="2" />
          <path d="M3 12h4" stroke="#333" strokeWidth="2" />
          <path d="M9 3v4" stroke="#333" strokeWidth="2" />
          <path d="M15 3v4" stroke="#333" strokeWidth="2" />
        </svg>
      ),
      panel: (
        <DepthPanel
          currentDepth={currentProductDepth}
          onSelectDepth={setCurrentProductDepth}
        />
      ),
    },
    {
      key: "gallery",
      label: "Gallery",
      value: `${product.galleryImages?.length || 0} images`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="#333" strokeWidth="2" />
          <circle cx="8.5" cy="8.5" r="1.5" fill="#333" />
          <path d="M21 15l-5-5L5 21" stroke="#333" strokeWidth="2" />
        </svg>
      ),
      // Panel burada null saxlanılır, çünki Gallery üçün ayrıca modal istifadə edirik
      panel: null,
    },
  ];

  return (
    <section className={styles.heroSection}>
      {/* Full Screen Gallery Modal */}
      {isGalleryOpen && (
        <FullScreenGallery 
          images={product.galleryImages} 
          title={product.title} 
          onClose={() => setIsGalleryOpen(false)} 
        />
      )}

      <div className={styles.heroMain}>
        <div className={styles.heroItem}>
          <ul className={openMenu ? styles.menuIsOpen : ""}>
            {menuItems.map((item) => (
              <li key={item.key}>
                <div
                  className={styles.menuItemWrapper}
                  onClick={() => handleMenuClick(item.key)}
                >
                  <div className={styles.heroItemIcons}>
                    {openMenu === item.key ? <CloseIcon /> : item.icon}
                  </div>
                  <span className={styles.menuItemLabel}>
                    {item.label}
                    {item.value && (
                      <span className={styles.menuItemValue}>: {item.value}</span>
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {openMenu && (
            <div className={styles.panelContainer}>
              {menuItems.find((item) => item.key === openMenu)?.panel}
            </div>
          )}
        </div>
        <div className={styles.heroProductImage}>
          <Image
            fill
            src={heroImage}
            alt={product.title ?? ""}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className={styles.heroProductDescription}>
          <h2>{product.title}</h2>
          <div className={styles.tabList}>
            <span
              className={activeTab === "description" ? styles.activeTab : ""}
              onClick={() => setActiveTab("description")}
            >
              Description
            </span>
            <span
              className={activeTab === "specifications" ? styles.activeTab : ""}
              onClick={() => setActiveTab("specifications")}
            >
              Specifications
            </span>
          </div>
          {activeTab === "description" && (
            <div className={styles.tabContent}>
              <p>{product.description}</p>
              <p>Designer: {product.designer}</p>
            </div>
          )}
          {activeTab === "specifications" && (
            <div className={styles.tabContent}>
              <p>
                <strong>Material:</strong> {product.specifications.material}
              </p>
              <p>
                <strong>Dimensions:</strong> {product.specifications.dimensions}
              </p>
              <p>
                <strong>Weight:</strong> {product.specifications.weight}
              </p>
              <p>
                <strong>Category:</strong> {product.specifications.category}
              </p>
            </div>
          )}
          <div className={styles.tabMore}>
            <span>Read More</span>
            <span>See downloads</span>
          </div>
          <p className={styles.heroPrice}>{product.price} ₼</p>
          <a href="#" className={styles.heroButton}>
            Find store
          </a>
          <div className={styles.productInfo}>
            <div className={styles.infoRow}>
              <span>10 year guarantee</span>
              <span>EU Ecolabel certified</span>
            </div>
            <div className={styles.infoRow}>
              <span>Danish production</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;