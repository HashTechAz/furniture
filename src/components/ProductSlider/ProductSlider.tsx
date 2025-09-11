import React from "react";
import styles from "./ProductSlider.module.css";

// TypeScript üçün hər bir slaydın data tipini müəyyən edirik
interface SlideData {
  id: number;
  label: string;
  imageUrl: string;
}

// Məhsul məlumatlarını və şəkil URL-lərini burada saxlayırıq
const slideData: SlideData[] = [
  { id: 1, label: "Modern Chair", imageUrl: "https://source.unsplash.com/random/320x400?modern,chair" },
  { id: 2, label: "Minimalist Sofa", imageUrl: "https://source.unsplash.com/random/320x400?minimalist,sofa" },
  { id: 3, label: "Wooden Table", imageUrl: "https://source.unsplash.com/random/320x400?wooden,table" },
  { id: 4, label: "Tall Bookcase", imageUrl: "https://source.unsplash.com/random/320x400?tall,bookcase" },
  { id: 5, label: "Living Room Sideboard", imageUrl: "https://source.unsplash.com/random/320x400?livingroom,sideboard" },
  { id: 6, label: "Designer Lamp", imageUrl: "https://source.unsplash.com/random/320x400?designer,lamp" },
  { id: 7, label: "Cozy Armchair", imageUrl: "https://source.unsplash.com/random/320x400?cozy,armchair" },
];

const ProductSlider: React.FC = () => {
  return (
    <>
      <section className={styles.sliderMain}>
        {/* Başlıq və naviqasiya oxları üçün konteyner */}
        <div className={styles.container}>
          <div className={styles.sliderTitle}>
            <div className={styles.sliderTitleText}>
              <span>
                Explore the endless possibilities. <br />
                36 modules, 4 depths and 43 colours.
              </span>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              {/* Sol ox */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="10"
                viewBox="0 0 30 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ cursor: "pointer" }}
              >
                <path d="M25 5H5m0 0l4 4m-4-4l4-4" />
              </svg>

              {/* Sağ ox */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="10"
                viewBox="0 0 30 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ cursor: "pointer" }}
              >
                <path d="M5 5h20m0 0l-4 4m4-4l-4-4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Üfüqi sürüşən slider üçün wrapper */}
        <div className={styles.sliderBoxWrapper}>
          <div className={styles.sliderBox}>
            {/* Məlumat massivindən hər bir məhsul kartını yaradırıq */}
            {slideData.map((slide) => (
              <div key={slide.id} className={styles.slideContainer}>
                {/* Şəkil burada arxa fon kimi təyin edilir */}
                <div
                  className={styles.slideItem}
                  style={{ backgroundImage: `url(${slide.imageUrl})` }}
                >
                  {/* Bu div boş qalır, çünki şəkil arxa fondadır */}
                </div>
                {/* Məhsulun adı */}
                <p className={styles.slideCaption}>{slide.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSlider;