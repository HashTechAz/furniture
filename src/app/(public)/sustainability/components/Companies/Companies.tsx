import React from "react";
import styles from "./Companies.module.css";

const Companies = () => {
  return (
    <>
      <section className={styles.companies}>
        <div className={styles.companiesTitle}>
          <span>
            Companies are the most powerful drivers in terms of making the world
            a better place
          </span>
          <div className={styles.companyBox}>
            <p>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 17H3L2 12V7H8V12H5L6 17ZM14 17H11L10 12V7H16V12H13L14 17Z" />
              </svg>
            </p>
          </div>

          <div className={styles.companyAuthor}>
            <span>Joakim Lassen, CEO
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Companies;
