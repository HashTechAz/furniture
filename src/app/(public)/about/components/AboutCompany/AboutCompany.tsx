import React from "react";
import styles from "./AboutCompany.module.css";

const AboutCompany = () => {
  return (
    <>
      <section className={styles.aboutCompany}>
        <div className={styles.aboutCompanyTitle}>
          <h4>
            As a sculptor starts with an abstract stone, I started with an
            abstract square box. I removed all the unnecessary parts of the box
            so that it eventually featured rounded edges, missing corners and
            retracted fronts, Montana's design DNA. Lorem ipsum dolor sit amet.
          </h4>
          <div className={styles.companyBox}>
            <p>
              <svg
                width='48'
                height='48'
                viewBox='0 0 24 24'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M6 17H3L2 12V7H8V12H5L6 17ZM14 17H11L10 12V7H16V12H13L14 17Z' />
              </svg>
            </p>
          </div>

          <div className={styles.companyAuthor}>
            <span>Peter J. Lassen, Founder</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutCompany;
