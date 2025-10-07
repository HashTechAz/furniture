import React from "react";
import styles from "./Companies.module.css";

interface CompaniesProps {
  title?: string;
  author?: string;
  authorTitle?: string;
  backgroundColor?: string;
}

const Companies = ({
  title = "Just as the modules offer infinite possibilities for combination, the colours also need to be able to be mixed and matched",
  author = "Joakim Lassen",
  authorTitle = "CEO",
  backgroundColor = "#EAEFD9"
}: CompaniesProps) => {
  return (
    <section className={styles.companies}>
      <div className={styles.companiesTitle}>
        {/* Arxa fon qutusu (mətn bunun üzərində olacaq) */}
        <div className={styles.companyBox} style={{ backgroundColor }}>
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

        {/* Əsas mətn */}
        <h4>{title}</h4>

        {/* Müəllif */}
        <div className={styles.companyAuthor}>
          <span>{author}, {authorTitle}</span>
        </div>
      </div>
    </section>
  );
};

export default Companies;