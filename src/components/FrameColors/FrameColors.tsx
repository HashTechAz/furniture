import React from 'react'
import styles from './FrameColors.module.css'

const FrameColors = () => {
  return (
    <>
    <section className={styles.frameColors}>
        <div className={styles.frameColorsMain}>
            <div className={styles.frameColorsItem}>
              <img src="https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/colours/158_oat.jpg?mode=crop&width=540&height=540" alt="" />
              <h3>Oat</h3>
              <p>RAL 1016</p>
            </div>
            <div className={styles.frameColorsItem}>
              <img src="https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/colours/152_parsley.jpg?mode=crop&width=540&height=540" alt="" />
              <h3>Oat</h3>
              <p>RAL 1016</p>
            </div>
            <div className={styles.frameColorsItem}>
              <img src="https://b2c.montana-episerver.com/globalassets/ambient-images/square-images/colours/138_juniper.jpg?mode=crop&width=540&height=540" alt="" /> 
              <h3>Oat</h3>
              <p>RAL 1016</p>
            </div>
        </div>
    </section>
    </>
  )
}

export default FrameColors