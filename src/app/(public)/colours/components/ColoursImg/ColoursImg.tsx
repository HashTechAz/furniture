import React from 'react'
import styles from './ColoursImg.module.css'
import Image from 'next/image'  
const ColoursImg = () => {
  return (
    <>
    <section className={styles.coloursImg}>
        <div className={styles.coloursImgMain}>
            <Image src="https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/colours/montana_colourpalette_web_opdateret.png?mode=crop&width=1520&height=1520" alt="" />
        </div>
    </section>
    </>
  )
}

export default ColoursImg