import React from "react";
import styles from "./SustainabilityCertifications.module.css";
import Image from "next/image"; 
const SustainabilityCertifications = () => {
  return (
    <section className={styles.certifications}>
      <div className={styles.certificationsMain}>
        <h2>Certifications</h2>
        <p>
          The Montana shelving modules carry the EU Ecolabel, the Danish
          Indoor Climate Label, and the PEFC certification. Further, Montana's
          production comply with the ISO 14001 environmental standards.
        </p>

        <p>
          Montana became one of the first Danish businesses to run
          'cradle-to-grave' analyses of the environmental consequences of a
          given product. Since 2007, we have exclusively used water-based
          lacquer colours, which neither smell nor contain solvents.
        </p>

        <div className={styles.certificationsLogo}>
          <div className={styles.certificationsLogoItems}>
             <Image  fill 
              src="https://b2c.montana-episerver.com/globalassets/icons/certifications/thumb_montana_ecolabel.png?mode=crop&width=540&height=540" 
              alt="EU Ecolabel" 
            />
          </div>
          <div className={styles.certificationsLogoItems}>
             <Image  fill 
              src="https://b2c.montana-episerver.com/globalassets/icons/certifications/thumb_montana_indoorclimate.png?mode=crop&width=540&height=540" 
              alt="Danish Indoor Climate Label" 
            />
          </div>
          <div className={styles.certificationsLogoItems}>
             <Image  fill 
              src="https://b2c.montana-episerver.com/globalassets/icons/certifications/iso_14001.png?mode=crop&width=540&height=540" 
              alt="ISO 14001" 
            />
          </div>
          <div className={styles.certificationsLogoItems}>
             <Image  fill 
              src="https://b2c.montana-episerver.com/globalassets/icons/certifications/pefc-label-pefc09-31-172-landscape-uk-text-pefc-label.jpg?mode=crop&width=540&height=540" 
              alt="PEFC Certification" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityCertifications;
