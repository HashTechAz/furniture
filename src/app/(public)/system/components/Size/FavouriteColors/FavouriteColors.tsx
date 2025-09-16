import React from "react";
import styles from "./FavouriteColors.module.css";
import Link from "next/link";

const FavouriteColors = () => {
  return (
    <section className={styles.fav}>
      <div className={styles.favMain}>
        <h2>3. Choose your favourite colours</h2>

        <p className={styles.favText}>
          Montana’s functional and flexible system is featured in a range of 43
          poetic and complex colours developed in close collaboration with the
          award-winning Danish designer and colour expert Margrethe Odgaard.
        </p>

        <p className={styles.favText}>
          Colours mean everything. Ambience. Atmosphere. Identity. Colours are
          paramount in our design. We want to influence and inspire the world of
          interiors with our take on colours. Bright and light. Dense and deep.
          There is a colour for any purpose.
        </p>

        <div className={styles.favBtn}>
          <Link href={"/"}>Explore the colours</Link>
        </div>
      </div>
    </section>
  );
};

export default FavouriteColors;
