import React from "react";
import styles from "./CenterInfoText.module.css";

interface CenterInfoTextProps {
  title?: string;
  description?: string;
  secondParagraph?: string;
}

const CenterInfoText = ({ 
  title = "Eva advice – begin small and invest in help",
  description = "If you would like to approach colours like Eva, you should find inspiration for colour combinations in nature, books and your wardrobe. She advises you to find your own personal favourites instead of looking too much to magazines and trends. Begin with small adjustments like a new green cushion for your sofa and take your time to discover how that colour makes you feel.",
  secondParagraph = "Eva also says that you shouldn't hesitate to reach out for help – either contact a talented colour lover on social media or a professional consultant. Find someone likeminded you can exchange ideas with, and consider the possibility of spending money on advice from a pro. It usually pays off."
}: CenterInfoTextProps) => {
  return (
    <>
      <section className={styles.centerInfoText}>
        <div className={styles.centerInfoTextContent}>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{secondParagraph}</p>
        </div>
      </section>
    </>
  );
};

export default CenterInfoText;
