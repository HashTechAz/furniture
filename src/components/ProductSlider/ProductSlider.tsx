import React from "react";
import styles from "./ProductSlider.module.css";

const ProductSlider = () => {
  return (
    <>
      <section className={styles.sliderMain}>
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
              alignItems: "flex-end",
              justifyContent: "center",
              width: "100px",
              height: "70px",
            }}
          >
            {/* Sol ok (Left Arrow) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30" /* Genişliği kısalttık */
              height="10"
              viewBox="0 0 30 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M25 5H5m0 0l4 4m-4-4l4-4" />
            </svg>

            {/* Sağ ok (Right Arrow) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40" /* Genişliği kısalttık */
              height="10"
              viewBox="0 0 30 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 5h20m0 0l-4 4m4-4l-4-4" />
            </svg>
          </div>
        </div>

        <div className={styles.sliderBox}></div>
      </section>
    </>
  );
};

export default ProductSlider;
