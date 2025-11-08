import React from 'react'
import styles from './Catalogues.module.css'
import Image from 'next/image'  
interface CataloguesProps {
  cataloguesData?: Array<{
    id: number;
    imageUrl: string;
    alt: string;
  }>;
}

const cataloguesData = [
  { id: 1, imageUrl: "https://b2c.montana-episerver.com/globalassets/thumbnails/catalogue-thumbs/2025/montana_wire_2025_thumb.jpg?mode=crop&width=540&height=720", alt: "Montana Wire 2025" },
  { id: 2, imageUrl: "https://b2c.montana-episerver.com/globalassets/thumbnails/catalogue-thumbs/202324/office_catalogue_thumb_ny.jpg?mode=crop&width=540&height=720", alt: "Montana Office 2023/24" },
  { id: 3, imageUrl: "https://b2c.montana-episerver.com/globalassets/thumbnails/catalogue-thumbs/2025/montana_mini_2025_thumb.jpg?mode=crop&width=540&height=720", alt: "Montana Mini 2025" },
  { id: 4, imageUrl: "https://b2c.montana-episerver.com/globalassets/thumbnails/catalogue-thumbs/home_catalogue_22_23_thumb.jpg?mode=crop&width=540&height=720", alt: "Home Catalogue 22/23" },
  { id: 5, imageUrl: "https://b2c.montana-episerver.com/globalassets/thumbnails/catalogue-thumbs/202324/montana_kids_a5_thumb.jpg?mode=crop&width=540&height=720" },
  { id: 6, imageUrl: "https://b2c.montana-episerver.com/globalassets/thumbnails/catalogue-thumbs/montana_catalogue_pantonwire.jpg?mode=crop&width=540&height=720" },
  { id: 7, imageUrl: "https://b2c.montana-episerver.com/globalassets/thumbnails/catalogue-thumbs/montana_catalogue_montanamini.jpg?mode=crop&width=540&height=720" },
  { id: 8, imageUrl: "https://b2c.montana-episerver.com/globalassets/thumbnails/catalogue-thumbs/montana_selection_2024_thumb.jpg?mode=crop&width=540&height=720" },
  { id: 9, imageUrl: "https://b2c.montana-episerver.com/globalassets/thumbnails/catalogue-thumbs/montana_bathroom_thumb_eur_ex.jpg?mode=crop&width=540&height=720" },
  { id: 10, imageUrl: "https://b2c.montana-episerver.com/globalassets/thumbnails/catalogue-thumbs/montana_selection_2024_thumb.jpg?mode=crop&width=540&height=720" },

];

const Catalogues = ({ cataloguesData: propCataloguesData }: CataloguesProps) => {
  const data = propCataloguesData || cataloguesData;
  
  return (
    <> 
    <section className={styles.catalogues}>
    <h1>Catalogues</h1>

        <div className={styles.cataloguesMain}> 
            {data.map((catalogue) => (
                <div className={styles.cataloguesItem} key={catalogue.id}>
                    <Image src={catalogue.imageUrl} alt={catalogue.alt} />
                </div>
            ))}
        </div>
    </section>
    </>
  )
}

export default Catalogues