"use client";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import styles from "./ProductHero.module.css";
import useEmblaCarousel from "embla-carousel-react";
import { FrontendProduct } from "@/lib/products";

interface Product {
  id: number;
  title: string;
  color: string;
  measurements: string;
  position: string;
  description: string;
  price: string;
  mainImage: string;
  galleryImages: string[];
  specifications: {
    material: string;
    finish: string;
    weight: string;
    assembly: string;
  };
}

interface ProductHeroProps {
  product: FrontendProduct;
}

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18"
      stroke="#333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6L18 18"
      stroke="#333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const CheckmarkIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 6L9 17L4 12"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


const GalleryPanel = ({
  title,
  images,
  onClose,
}: {
  title: string;
  images: string[];
  onClose: () => void;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={styles.galleryOverlay}>
      <header className={styles.galleryHeader}>
        <h3 className={styles.galleryTitle}>{title} Gallery</h3>
        <div className={styles.galleryNav}>
          <button onClick={scrollPrev} className={styles.galleryNavButton}>
            &larr;
          </button>
          <button onClick={scrollNext} className={styles.galleryNavButton}>
            &rarr;
          </button>
          <button onClick={onClose} className={styles.galleryCloseButton}>
            &times;
          </button>
        </div>
      </header>
      <div className={styles.gallerySliderContainer}>
        <div className={styles.galleryEmbla} ref={emblaRef}>
          <div className={styles.galleryEmblaContainer}>
            {images.map((src, index) => (
              <div
                key={index}
                className={`${styles.galleryEmblaSlide} ${index === 0 ? styles.wide : styles.normal
                  }`}
                style={{ position: "relative" }}
              >
                <Image
                  fill
                  src={src}
                  alt={`Product image ${index + 1}`}
                  className={styles.galleryImage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ColourPanel = ({
  currentColor,
  onSelectColor,
}: {
  currentColor: string;
  onSelectColor: (color: string) => void;
}) => {
  const availableColors = [
    { name: "Snow", hex: "#F0F1EC" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Oat", hex: "#EAE5D9" },
    { name: "Mushroom", hex: "#D8D1C5" },
    { name: "Mist", hex: "#D1D3D2" },
    { name: "Vanilla", hex: "#F2EBDD" },
    { name: "Cumin", hex: "#E2C7A1" },
    { name: "Clay", hex: "#C6BBAF" },
    { name: "Fennel", hex: "#DEE0D5" },
    { name: "Flint", hex: "#B7B9B8" },
    { name: "Truffle", hex: "#A8A096" },
    { name: "Amber", hex: "#F1B470" },
    { name: "Hokkaido", hex: "#F2A057" },
    { name: "Pomelo", hex: "#E5855E" },
    { name: "Azure", hex: "#B5D6E1" },
    { name: "Ice", hex: "#A2B6C0" },
    { name: "Shadow", hex: "#90979E" },
    { name: "Balsamic", hex: "#A99A81" },
    { name: "Iris", hex: "#A89CB2" },
    { name: "Rosehip", hex: "#D36E5D" },
    { name: "Ruby", hex: "#B53326" },
    { name: "Acacia", hex: "#7799D1" },
    { name: "Royal", hex: "#3E578A" },
    { name: "Juniper", hex: "#5E6B65" },
    { name: "Oregano", hex: "#72745E" },
    { name: "Truffle", hex: "#6D5F54" },
    { name: "Monarch", hex: "#3B3736" },
    { name: "Pine", hex: "#58644f" },
    { name: "Coal", hex: "#4A4B4D" },
    { name: "Anthracite", hex: "#3B3B3D" },
    { name: "Black", hex: "#2A2A2B" },
    { name: "Rhubarb", hex: "#8B2C21" },
    { name: "Masala", hex: "#7A3B2E" },
    { name: "Parsley", hex: "#58644f" },
    { name: "Fjord", hex: "#354851" },
  ];
  return (
    <div className={styles.panelLayout}>
      <div className={styles.panelContent}>
        <div className={styles.panelHeader}>
          <h3>Colour: {currentColor}</h3>
        </div>
        <div className={styles.panelSubHeader}>
          <span>Laquers</span>
        </div>
        <div className={styles.colorGrid}>
          {availableColors.map((color) => (
            <div
              key={color.name}
              className={styles.colorSwatchWrapper}
              onClick={() => onSelectColor(color.name)}
            >
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: color.hex }}
              >
                {currentColor.toLowerCase() === color.name.toLowerCase() && (
                  <div className={styles.checkmarkIcon}>
                    <CheckmarkIcon />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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
            className={`${styles.positionItem} ${currentPosition === option ? styles.activePosition : ""
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

const DepthPanel = ({
  currentDepth,
  onSelectDepth,
}: {
  currentDepth: string;
  onSelectDepth: (depth: string) => void;
}) => {
  const depthOptions = [
    "Depth 20 cm",
    "Depth 30 cm",
    "Depth 38 cm",
    "Depth 47 cm",
  ];
  return (
    <div className={styles.panelContent}>
      <div className={styles.panelHeader}>
        <h3>Depth: {currentDepth}</h3>
      </div>
      <ul className={styles.positionList}>
        {depthOptions.map((option) => (
          <li
            key={option}
            className={`${styles.positionItem} ${currentDepth === option ? styles.activePosition : ""
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

const ProductHero = ({ product }: ProductHeroProps) => {
  const [activeTab, setActiveTab] = useState("description");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [currentProductColor, setCurrentProductColor] = useState(product.color);
  const [currentProductPosition, setCurrentProductPosition] = useState(
    product.position
  );
  const [currentProductDepth, setCurrentProductDepth] = useState("Depth 38 cm");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleMenuClick = (menuKey: string) => {
    if (menuKey === "gallery") {
      setIsGalleryOpen(true);
      setOpenMenu(null);
    } else {
      setOpenMenu((prev) => (prev === menuKey ? null : menuKey));
    }
  };

  const menuItems = [
    {
      key: "colour",
      label: "Colour",
      value: currentProductColor,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            fill={currentProductColor.toLowerCase()}
            stroke="#333"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="6" fill="#fff" />
        </svg>
      ),
      panel: (
        <ColourPanel
          currentColor={currentProductColor}
          onSelectColor={setCurrentProductColor}
        />
      ),
    },
    {
      key: "position",
      label: "Position",
      value: currentProductPosition,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="6"
            width="18"
            height="12"
            rx="2"
            fill="none"
            stroke="#333"
            strokeWidth="2"
          />
          <path
            d="M7 6V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"
            stroke="#333"
            strokeWidth="2"
          />
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
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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
      value: "",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            stroke="#333"
            strokeWidth="2"
          />
          <circle cx="8.5" cy="8.5" r="1.5" fill="#333" />
          <path d="M21 15l-5-5L5 21" stroke="#333" strokeWidth="2" />
        </svg>
      ),
      panel: null,
    },
  ];

  return (
    <section className={styles.heroSection}>
      {isGalleryOpen && (
        <GalleryPanel
          title={product.title}
          images={product.galleryImages}
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
                    {item.value && <span className={styles.menuItemValue}>: {item.value}</span>}
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
            src={product.mainImage}
            alt={product.title ?? ""}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={styles.zoomIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.9497 16.9497L20.4853 20.4853"
                stroke="#333333"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="10.4142"
                cy="10.4142"
                r="6.36396"
                stroke="#333333"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className={styles.zoomText}>Tap here to zoom</p>
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
              {/* DİNAMİK DİZAYNER ADI */}
              <p>Designer: {product.designer}</p>
            </div>
          )}
          {activeTab === "specifications" && (
            <div className={styles.tabContent}>
              <p>
                <strong>Material:</strong> {product.specifications.material}
              </p>
              <p>
                <strong>Finish:</strong> {product.specifications.finish}
              </p>
              <p>
                <strong>Weight:</strong> {product.specifications.weight}
              </p>
              <p>
                <strong>Assembly:</strong> {product.specifications.assembly}
              </p>
            </div>
          )}
          <div className={styles.tabMore}>
            <span>Read More</span>
            <span>See downloads</span>
          </div>
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
