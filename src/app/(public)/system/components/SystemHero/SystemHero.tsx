import React from "react";
import styles from "./SystemHero.module.css";

export interface SystemHeroProps {
  title: string;
  description?: string;
  backgroundColor?: string;
  color?: string;
}

const SystemHero = ({ title, description, backgroundColor, color }: SystemHeroProps) => {
  const sectionStyle = backgroundColor ? { backgroundColor } : {};
  const titleStyle = color ? { color } : {};

  return (
    <>
      <section className={styles.systemHero} style={sectionStyle}>
        <div className={styles.content}>
          <h1 className={styles.title} style={titleStyle}>
            {title}
          </h1>
          {description && (
            <p className={styles.description} style={titleStyle}>
              {description}
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default SystemHero;