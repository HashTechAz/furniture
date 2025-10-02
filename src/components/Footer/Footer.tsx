import Link from "next/link";
import styles from "./Footer.module.css";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <h2 className={styles.footerTitle}>Montana Furniture</h2>

        <div className={styles.parent}>
          <div className={`${styles.footerItem} ${styles.info}`}>
            <p>
              Akkerupvej 16 <br /> 5683 Haarby <br /> Danmark
            </p>
            <p className={styles.cvrNumber}>CVR: 66652912</p>
          </div>

          <div className={`${styles.footerItem} ${styles.montanaLinks}`}>
            <h3>Montana</h3>
            <ul>
              <li><Link className={styles.footerLink} href={"/"}>About Montana</Link></li>
              <li><Link className={styles.footerLink} href={"/"}>The Montana system</Link></li>
              <li><Link className={styles.footerLink} href={"/"}>The Montana colors</Link></li>
              <li><Link className={styles.footerLink} href={"/"}>Environment and quality</Link></li>
              <li><Link className={styles.footerLink} href={"/"}>Store locator</Link></li>
              <li><Link className={styles.footerLink} href={"/"}>Showrooms</Link></li>
              <li><Link className={styles.footerLink} href={"/"}>Career</Link></li>
            </ul>
          </div>

          <div className={`${styles.footerItem} ${styles.ressourcesLinks}`}>
            <h3>Ressources</h3>
            <ul>
              <li><Link className={styles.footerLink} href={"/"}>Digital Showroom</Link></li>
              <li><Link className={styles.footerLink} href={"/"}>Downloads</Link></li>
              <li><Link className={styles.footerLink} href={"/"}>Press</Link></li>
              <li><Link className={styles.footerLink} href={"/"}>Assembly guides</Link></li>
              <li><Link className={styles.footerLink} href={"/"}>Montana Academy</Link></li>
              <li><Link className={styles.footerLink} href={"/"}>Catalogues</Link></li>
            </ul>
          </div>

          <div className={`${styles.footerItem} ${styles.serviceLinks}`}>
            <h3>Customer service</h3>
            <ul>
              <li><Link className={styles.footerLink} href={"/"}>Customer support</Link></li>
              <li><Link className={styles.footerLink} href={"/"}>Guarantees</Link></li>
              <li><Link className={styles.footerLink} href={"/"}>Materials and care</Link></li>
              <li><Link className={styles.footerLink} href={"/"}>Competition terms and conditions</Link></li>
              <li><Link className={styles.footerLink} href={"/"}>Privacy policy</Link></li>
            </ul>
          </div>

          <div className={`${styles.footerItem} ${styles.social}`}>
            <h3>Select Market</h3>
            <div className={styles.footerSocial}>
              <ul>
                <li><Link href={"/"} aria-label="Facebook"><FaFacebookF /></Link></li>
                <li><Link href={"/"} aria-label="Instagram"><FaInstagram /></Link></li>
                <li><Link href={"/"} aria-label="YouTube"><FaYoutube /></Link></li>
                <li><Link href={"/"} aria-label="Pinterest"><FaPinterestP /></Link></li>
                <li><Link href={"/"} aria-label="LinkedIn"><FaLinkedinIn /></Link></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      <div className={styles.footerEnd}>
        <h3>© 2025 Montana Furniture A/S. All rights reserved.</h3>
      </div>
    </footer>
  );
};

export default Footer;