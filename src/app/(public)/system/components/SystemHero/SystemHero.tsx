import React from "react";
import styles from "./SystemHero.module.css";

// Komponentin qəbul edəcəyi propları təyin edirik
interface SystemHeroProps {
  title: string;
  backgroundColor?: string;
  color?: string;
}

const SystemHero = ({ title, backgroundColor, color }: SystemHeroProps) => {
  // Prop-dan gələn arxa fon rəngini tətbiq etmək üçün
  const sectionStyle = backgroundColor ? { backgroundColor } : {};
  const titleStyle = color ? { color } : {};

  return (
    <>
      <section className={styles.systemHero} style={sectionStyle}>
        <div className={styles.content}>
          <h1 className={styles.title} style={titleStyle}>
            {title}
          </h1>
        </div>
      </section>
    </>
  );
};

export default SystemHero;