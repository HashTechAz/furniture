import React from 'react'
import styles from './AboutBigImage.module.css'
import Image from 'next/image'
const AboutBigImage = () => {
  return (
    <>
    <section className={styles.aboutBigImage}>
        <div className={styles.aboutBigImageMain } style={{position:"relative"}}>
                 <Image  fill src="https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/designer-portraits/peter_joakim_lassen_montana_2018_1bw_w.jpg?mode=crop&width=1520&height=1093" alt="" />
        </div>
    </section>
    </>
  )
}

export default AboutBigImage