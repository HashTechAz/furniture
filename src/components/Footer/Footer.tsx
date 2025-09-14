import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <h2>Montana Furniture</h2>

        <div className={styles.parent}>
          <div className={styles.footerItem}>
            <p>
              Akkerupvej 16 <br /> 5683 Haarby <br /> Danmark
            </p>
            <p className={styles.cvrNumber}>CVR: 66652912</p>
          </div>
          <div className={styles.footerItem}>
            <h3>Montana</h3>
            <ul>
              <li>
                <Link className={styles.footerLink} href={"/"}>About Montana</Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/"}>The Montana system</Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/"}>The Montana colors</Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/"}>Environment and quality</Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/"}>Store locator</Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/"}>Showrooms</Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/"}>Career</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerItem}>
            <h3>Ressources</h3>
            <ul>
              
              <li>
                <Link className={styles.footerLink} href={"/"}>Digital Showroom</Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/"}>Downloads</Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/"}>Press</Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/"}>Assembly guides</Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/"}>Montana Academy</Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/"}>Catalogues</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerItem}>
            <h3>Customer service</h3>
            <ul>
              
              <li>
                <Link className={styles.footerLink} href={"/"}>Customer support</Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/"}>Guarantees</Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/"}>Materials and care</Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/"}>Competition terms and conditions</Link>
              </li>
              <li>
                <Link className={styles.footerLink} href={"/"}>Privacy policy</Link>
              </li>
             
            </ul>
          </div>

          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
