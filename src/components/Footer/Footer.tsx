import Link from "next/link";
import styles from "./Footer.module.css";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <div>
          <Link href='/' className={styles.footerTitle}>
            <Image
              fill
              src='/images/logo/svlogosparro-01.png'
              alt='Sparro Logo'
              className={styles.footerLogo}
              sizes='100px'
            />
          </Link>
        </div>

        <div className={styles.parent}>
          <div className={`${styles.footerItem} ${styles.info}`}>
            <p>
              Akkerupvej 16 <br /> 5683 Haarby <br /> Danmark
            </p>
            <p className={styles.cvrNumber}>CVR: 66652912</p>
          </div>

          <div className={`${styles.footerItem} ${styles.montanaLinks}`}>
            <h3>Products</h3>
            <ul>
              <li>
                <Link className={styles.footerLink} href={"/product"}>
                  All Products
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/about"}>
                  About Sparro
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/system"}>
                  The Sparro system
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/sustainability"}>
                  Environment & Quality
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/colours"}>
                  41 colors & 2 veneers
                </Link>
              </li>
            </ul>
          </div>

          <div className={`${styles.footerItem} ${styles.ressourcesLinks}`}>
            <h3>Inspiration</h3>
            <ul>
              <li>
                <Link className={styles.footerLink} href={"/creative-minds/swantje"}>
                  Swantje Hinrichsen
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/creative-minds/cathrine"}>
                  Cathrine De Lichtenberg
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/creative-minds/tekla"}>
                  Tekla Evelina Severin
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/"}>
                  Faebrik
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/"}>
                  Colours of comfort
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/creative-minds"}>
                  Find more inspiration
                </Link>
              </li>
            </ul>
          </div>

          <div className={`${styles.footerItem} ${styles.serviceLinks}`}>
            <h3>Customer service</h3>
            <ul>
              <li>
                <Link className={styles.footerLink} href={"/contact"}>
                  Customer support
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/series/assembly"}>
                  Assembly guides
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/series/guarantees"}>
                  Guarantees
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/privacy-policy"}>
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>

          <div className={`${styles.footerItem} ${styles.social}`}>
            <h3>Select Market</h3>
            <div className={styles.footerSocial}>
              <ul>
                <li>
                  <Link href={"/"} aria-label='Facebook'>
                    <FaFacebookF />
                  </Link>
                </li>
                <li>
                  <Link href={"/"} aria-label='Instagram'>
                    <FaInstagram />
                  </Link>
                </li>
                <li>
                  <Link href={"/"} aria-label='YouTube'>
                    <FaYoutube />
                  </Link>
                </li>
                <li>
                  <Link href={"/"} aria-label='Pinterest'>
                    <FaPinterestP />
                  </Link>
                </li>
                <li>
                  <Link href={"/"} aria-label='LinkedIn'>
                    <FaLinkedinIn />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerEnd}>
        <h3>© {new Date().getFullYear()} Montana Furniture A/S. All rights reserved.</h3>
      </div>
    </footer>
  );
};

export default Footer;
