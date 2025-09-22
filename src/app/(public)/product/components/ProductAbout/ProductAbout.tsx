import React from "react";
import styles from "./ProductAbout.module.css";

const ProductAbout = () => {
  return (
    <>
      <section className={styles.productAbout}>
        <div className={styles.productAboutTitle}>
          <h1>Shelving systems</h1>
        </div>
        <div className={styles.productAboutMain}>
          <div className={styles.productLeftText}>
            <h5>A Montana bookcase is more than just storage space</h5>
            <p>
              Your Montana bookcase is also an exhibit you display to your
              guests. That’s why your shelves should create the right framework
              for your personal treasures - favourite books, travel souvenirs
              and memories of the people in your life. Montana gives you the
              opportunity to create bookcases that are unique and personal.
              Configurations that satisfy exactly your needs. Lacquered in your
              favourite colours.
            </p>

            <p>
              The 12 configurations in the Montana Free system vary in size and
              function. There is the very simple, low two-shelf-tall bench,
              which can be placed under a window. Or there is the large
              configuration measuring six shelves in height, which is perfect as
              an airy and decorative room divider or as a monumental bookcase
              against a wall.
            </p>

            <p>
              The classic Montana shelving system (12mm) gives you endless
              possibilities to create your very own shelving. Create your dream
              storage solution with our 36 basic modules, 4 depths and 42
              colours. The possibilities are truly endless.
            </p>

            <p>
              With Montana Selection, we make it easier for you to choose. Here
              we have pre-designed the solution so you can concentrate on
              choosing the right colours. READ is an example of a modern
              bookcase and is one of the most popular Montana Selection variants
              consisting of six individual modules.
            </p>
          </div>

          <div className={styles.productRightText}>
            <h5>
              Add more colour to your life with the Montana shelving system
            </h5>

            <p>
              We love to help you add more colour to your life: primary colours,
              personal pastels or calm earth tones. The choice of colour is
              entirely up to you. Our colour palette consists of 42 poetic and
              sensuous colours. All carefully developed to be matched in endless
              combinations. Create looks ranging from modern minimalism to
              classic functionalism to eclectic play with bold colours. It’s
              your life, your home and, of course, your choice.
            </p>

            <h5>Sustainable multi-generational storage solutions</h5>

            <p>
              Montana is manufactured at our factory in Haarby on the island of
              Funen, as it has been ever since we started in 1982. Here, skilled
              craftsmen work every day to create sustainable shelving that lasts
              for a long time. This means our furniture is often passed on for
              several generations. That is, of course, an advantage for you. But
              it also benefits the planet, because it’s sustainable in the long
              run. Our shelving system is therefore designed in such a way that
              makes it easy to rearrange and use in new spaces and new contexts.
              A shelving system that transforms as your needs evolve throughout
              life.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductAbout;
