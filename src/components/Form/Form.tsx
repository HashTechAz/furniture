"use client";

import React from "react";
import styles from "./Form.module.css";
import Link from "next/link";

interface FormProps {
  name: string;
  email: string;
}

const Form = ({ name, email }: FormProps) => {
  return (
    <>
      <section className={styles.formSection}>
        <div className={styles.formMain}>
          <div className={styles.formTitle}>
            <h1>Stay tuned to get more inspiration and news from us.</h1>
          </div>
          <div className={styles.formContentBox}>
            <div className={styles.formLeftContent}>
              <p>
                We are sending newsletters about inspiration, campaign offers
                and invitations for events. You can unsubscribe directly from
                the newsletters or by contacting us at <Link className={styles.formLink} href={"/"}>montana@montana.dk</Link>. Read
                more about our <Link className={styles.formLink} href={"/"}>privacy policy</Link>.
              </p>
            </div>

            <div className={styles.formRightContent}>
              <form action="" method="">
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email" required />
                <input type="select" placeholder="Customer Type" required />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Form;
