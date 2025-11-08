import Link from "next/link";
import styles from "./NewsCard.module.css";
import Image from "next/image"; 
interface NewsCardProps {
  imageSrc: string;
  title: string;
  description: string;
  limit?: number;
}

const NewsCard = ({ imageSrc, title, description }: NewsCardProps) => {
  return (
    <Link href="#" className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.imageWrapper} style={{position:"relative"}}>
          <Image fill
            src={imageSrc}
            alt={title ?? ""}
            className={styles.image}
          />
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </Link>
  );
};

export default NewsCard;