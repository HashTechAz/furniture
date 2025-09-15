import styles from './page.module.css';

export default function Contact() {
  return (
    <>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1>Contact Us</h1>
          <p>
            Get in touch with our team for product inquiries, support, or partnership opportunities.
          </p>
        </div>
      </div>

      <div className={styles.contactContent}>
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2>Get in Touch</h2>
              <p>
                We&apos;re here to help you find the perfect furniture solutions for your space. 
                Contact us for product information, design consultation, or support.
              </p>
              
              <div className={styles.contactMethods}>
                <div className={styles.contactMethod}>
                  <h3>Email</h3>
                  <p>info@montanafurniture.com</p>
                </div>
                <div className={styles.contactMethod}>
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div className={styles.contactMethod}>
                  <h3>Address</h3>
                  <p>123 Design Street<br />Furniture City, FC 12345</p>
                </div>
              </div>
            </div>

            <div className={styles.contactForm}>
              <h2>Send us a Message</h2>
              <form>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} required></textarea>
                </div>
                <button type="submit" className={styles.submitButton}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
