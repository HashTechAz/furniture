import React from 'react'
import styles from "./SustainabilityHistory.module.css"

const SustainabilityHistory = () => {
  return (
    <>
     <section className={styles.history}>
        <div className={styles.historyMain}>
            <div className={styles.historyLeftTitle}>
                <h1>Montana's environmental history — A timeline</h1>
            </div>

            <div className={styles.historyList}>
                <ul>
                    <li>
                        <h3>1982</h3>
                        <p>Montana establishes a management system for environment and work environment</p>
                    </li>
                    <li>
                        <h3>1984</h3>
                        <p>Montana is established with production in Denmark</p>
                    </li>
                    <li>
                        <h3>1990</h3>
                        <p>Montana introduces first environmental accounting</p>
                    </li>
                    <li>
                        <h3>1993</h3>
                        <p>Montana transitions to water-based primers without harmful substance</p>
                    </li>
                    <li>
                        <h3>1997</h3>
                        <p>Montana achieves The Indoor Climate Label</p>
                    </li>
                    <li>
                        <h3>2002</h3>
                        <p>Montana becomes ISO 14001 certified in Environmental Management</p>
                    </li>
                    <li>
                        <h3>2005</h3>
                        <p>Montana transitions to water-based lacquers without harmful substances</p>
                    </li>
                    <li>
                        <h3>2010</h3>
                        <p>Montana achieves the EU Ecolabel as one of the first Danish furniture manufacturers</p>
                    </li>
                    <li>
                        <h3>2014</h3>
                        <p>Montana's production in Funen transitions to district heating and achievies a significant annual CO2 reduction</p>
                    </li>
                    <li>
                        <h3>2022</h3>
                        <p>Montana achieves the PEFC certification and most MDF products are now made from PEFC certified wood</p>
                    </li>
                </ul>
            </div>
        </div>
     </section>
    </>
  )
}

export default SustainabilityHistory