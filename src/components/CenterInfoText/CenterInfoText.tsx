import React from "react";
import styles from "./CenterInfoText.module.css";

const CenterInfoText = () => {
  return (
    <>
      <section className={styles.centerInfoText}>
        <div className={styles.centerInfoTextContent}>
          <h2>Eva advice – begin small and invest in help</h2>
          <p>
            If you would like to approach colours like Eva, you should find
            inspiration for colour combinations in nature, books and your
            wardrobe. She advises you to find your own personal favourites
            instead of looking too much to magazines and trends. Begin with
            small adjustments like a new green cushion for your sofa and take
            your time to discover how that colour makes you feel.
          </p>

          <p>
            Eva also says that you shouldn’t hesitate to reach out for help –
            either contact a talented colour lover on social media or a
            professional consultant. Find someone likeminded you can exchange
            ideas with, and consider the possibility of spending money on advice
            from a pro. It usually pays off.
          </p>
        </div>
      </section>
    </>
  );
};

export default CenterInfoText;
