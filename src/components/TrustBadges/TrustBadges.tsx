import React from "react";
import styles from "./TrustBadges.module.css";

const TrustBadges = () => {
  return (
    <>
      <section className={styles.badges}>
        <div className={styles.badgesContent}>
          <div className={styles.badgesItem}>
            <h3>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 20C15 17.5 17 12.5 17 10C17 7.5 16 4 13 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <ellipse
                  cx="8"
                  cy="9"
                  rx="2"
                  ry="3"
                  transform="rotate(-30 8 9)"
                  fill="currentColor"
                />
                <ellipse
                  cx="14"
                  cy="13.5"
                  rx="2"
                  ry="3"
                  transform="rotate(-30 14 13.5)"
                  fill="currentColor"
                />
                <ellipse
                  cx="11"
                  cy="6"
                  rx="2"
                  ry="3"
                  transform="rotate(-30 11 6)"
                  fill="currentColor"
                />
              </svg>
              EU Ecolabel certified
            </h3>
            <p>
              A label of environmental excellence that focuses on a product's
              entire lifecycle, from raw material extraction to production,
              distribution and disposal.
            </p>
          </div>
          <div className={styles.badgesItem}>
            <h3>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 20C15 17.5 17 12.5 17 10C17 7.5 16 4 13 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <ellipse
                  cx="8"
                  cy="9"
                  rx="2"
                  ry="3"
                  transform="rotate(-30 8 9)"
                  fill="currentColor"
                />
                <ellipse
                  cx="14"
                  cy="13.5"
                  rx="2"
                  ry="3"
                  transform="rotate(-30 14 13.5)"
                  fill="currentColor"
                />
                <ellipse
                  cx="11"
                  cy="6"
                  rx="2"
                  ry="3"
                  transform="rotate(-30 11 6)"
                  fill="currentColor"
                />
              </svg>
              Manufactured in Denmark
            </h3>
            <p>
              Since 1982, Montana has been designed and manufactured in Denmark
              by skilled craftsmen on a high-technological production site.
            </p>
          </div>
          <div className={styles.badgesItem}>
            <h3>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 20C15 17.5 17 12.5 17 10C17 7.5 16 4 13 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <ellipse
                  cx="8"
                  cy="9"
                  rx="2"
                  ry="3"
                  transform="rotate(-30 8 9)"
                  fill="currentColor"
                />
                <ellipse
                  cx="14"
                  cy="13.5"
                  rx="2"
                  ry="3"
                  transform="rotate(-30 14 13.5)"
                  fill="currentColor"
                />
                <ellipse
                  cx="11"
                  cy="6"
                  rx="2"
                  ry="3"
                  transform="rotate(-30 11 6)"
                  fill="currentColor"
                />
              </svg>
              5-10 year guarantee
            </h3>
            <p>
              Montana is a buy for life product that is known to be passed on
              from generation to generation. However, we h
              unlikely case is flawed.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustBadges;
