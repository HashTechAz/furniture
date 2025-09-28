import React from 'react'
import styles from './AboutBigImage.module.css'

const AboutBigImage = () => {
  return (
    <>
    <section className={styles.aboutBigImage}>
        <div className={styles.aboutBigImageMain}>
                <img src="https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/designer-portraits/peter_joakim_lassen_montana_2018_1bw_w.jpg?mode=crop&width=1520&height=1093" alt="" />
        </div>
    </section>
    </>
  )
}

export default AboutBigImage