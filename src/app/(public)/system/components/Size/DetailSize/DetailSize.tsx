import React from 'react'
import styles from "./DetailSize.module.css"
import Image from 'next/image'
interface DetailItem {
  image: string;
  title: string;
  text: string;
}

interface DetailSizeProps {
  title: string;
  description: string;
  items: DetailItem[]; // expects 4 items
}

const DetailSize = ({ title, description, items }: DetailSizeProps) => {
  return (
    <>
      <section className={styles.detailSize}>
        <div className={styles.detailMain}>
          <div className={styles.detailHeader}>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>

          <div className={styles.detailGrid}>
            {items.map((item, idx) => (
              <div className={styles.detailCard} key={idx}>
                <Image src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default DetailSize