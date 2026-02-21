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

const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
  productGroupId,
  variants,
  currentProductForSingle,
  onSelectVariant,
}: {
  currentPosition: string;
  productGroupId: number | null | undefined;
  variants: FrontendProduct[];
  currentProductForSingle: FrontendProduct | null;
  onSelectVariant?: (variantId: number) => void;
}) => {
  const hasVariants = variants.length > 0;

  // Məhsul qrupuna aid unik pozisiyaları toplamaq üçün
  const listToShow = hasVariants
    ? variants
    : currentProductForSingle
      ? [currentProductForSingle]
      : [];

  // Məhsulun eyni adla olanlarını tapırıq, ölçülərinə (W x H) görə qruplayırıq
  const uniquePositionsMap = new Map<string, FrontendProduct>();
  listToShow.forEach(v => {
    const dimLabel = v.width && v.height ? `W ${v.width} × H ${v.height} cm` : "Not specified";
    if (!uniquePositionsMap.has(dimLabel)) {
      uniquePositionsMap.set(dimLabel, { ...v, position: dimLabel }); // Display values in position
    }
  });

  const uniquePositions = Array.from(uniquePositionsMap.values());

  return (
    <div className={styles.panelContent}>
      {uniquePositions.length > 0 ? (
        <ul className={styles.positionList}>
          {uniquePositions.map((option) => (
            <li
              key={option.id}
              className={`${styles.positionItem} ${currentPosition === option.position ? styles.activePosition : ""
                }`}
              onClick={() => onSelectVariant?.(option.id)}
            >
              {option.position}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ padding: "0", margin: "0", color: "#666", fontSize: "14px", whiteSpace: "nowrap" }}>Digər ölçülər tapılmadı.</p>
      )}
    </div>
  );
};

// --- DEPTH PANEL ---
const DepthPanel = ({
  currentDepth,
  productGroupId,
  variants,
  currentProductForSingle,
  onSelectVariant,
}: {
  currentDepth: string;
  productGroupId: number | null | undefined;
  variants: FrontendProduct[];
  currentProductForSingle: FrontendProduct | null;
  onSelectVariant?: (variantId: number) => void;
}) => {
  const hasVariants = variants.length > 0;

  const listToShow = hasVariants
    ? variants
    : currentProductForSingle
      ? [currentProductForSingle]
      : [];

  const uniqueDepthsMap = new Map<string, FrontendProduct>();
  listToShow.forEach(v => {
    // Dərinlik `v.depth` obyektində gəlir, "Depth X cm" formatına salaq
    const depthLabel = v.depth ? `Depth ${v.depth} cm` : "Not specified";
    if (!uniqueDepthsMap.has(depthLabel)) {
      uniqueDepthsMap.set(depthLabel, { ...v, depthLabel } as FrontendProduct & { depthLabel: string });
    }
  });

  const uniqueDepths = Array.from(uniqueDepthsMap.values()) as Array<FrontendProduct & { depthLabel: string }>;

  return (
    <div className={styles.panelContent}>
      {uniqueDepths.length > 0 ? (
        <ul className={styles.positionList}>
          {uniqueDepths.map((option) => (
            <li
              key={option.id}
              className={`${styles.positionItem} ${currentDepth === option.depthLabel ? styles.activePosition : ""
                }`}
              onClick={() => onSelectVariant?.(option.id)}
            >
              {option.depthLabel}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ padding: "0", margin: "0", color: "#666", fontSize: "14px", whiteSpace: "nowrap" }}>Digər ölçülər tapılmadı.</p>
      )}
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
    product.width && product.height ? `W ${product.width} × H ${product.height} cm` : "Not specified"
  );
  const [currentProductDepth, setCurrentProductDepth] = useState(
    product.depth ? `Depth ${product.depth} cm` : "Not specified"
  );

  const [variants, setVariants] = useState<FrontendProduct[]>([]);
  const [allColors, setAllColors] = useState<BackendColor[]>([]);
  const [loadingColors, setLoadingColors] = useState(true);

  // WhatsApp link: client-only to avoid hydration mismatch (server has no window)
  const [waHref, setWaHref] = useState("#");

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

  // Set WhatsApp href after mount - ASCII-only template + [M][R] style "icons" so encoding never breaks
  useEffect(() => {
    const productUrl = `${window.location.origin}/product/${product.id}`;
    const title = product.title || "";
    const desc = product.description || product.shortDescription || "-";
    const depthStr = product.depth != null ? product.depth + " cm" : "Not specified";
    const message =
      "Salam! Bu mehsulla maraqliram:" +
      "\n\n" +
      "[M] *Mehsul:* " +
      title +
      "\n" +
      "[R] *Reng:* " +
      currentProductColor +
      "\n" +
      "[O] *Olcu:* " +
      currentProductPosition +
      "\n" +
      "[D] *Derinlik:* " +
      depthStr +
      "\n" +
      "[T] *Tesvir:* " +
      desc +
      "\n\n" +
      "[L] Link: " +
      productUrl;
    setWaHref(`https://wa.me/994775480896?text=${encodeURIComponent(message)}`);
  }, [
    product.id,
    product.title,
    product.description,
    product.shortDescription,
    product.depth,
    currentProductColor,
    currentProductPosition,
  ]);

  const handleSelectVariant = useCallback(
    (variantId: number) => {
      router.push(`/product/${variantId}`);
    },
    [router]
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
          productGroupId={product.productGroupId}
          variants={variants}
          currentProductForSingle={variants.length === 0 ? product : null}
          onSelectVariant={handleSelectVariant}
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
          productGroupId={product.productGroupId}
          variants={variants}
          currentProductForSingle={variants.length === 0 ? product : null}
          onSelectVariant={handleSelectVariant}
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
          <div className={styles.heroButtons}>
            <a href="#" className={styles.heroButton}>
              Find store
            </a>
            <a
              href={waHref}
              className={styles.heroButtonWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>
          </div>
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