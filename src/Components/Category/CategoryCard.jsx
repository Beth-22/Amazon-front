import React from "react";
import styles from "./categoryCard.module.css";
import {Link} from 'react-router-dom'
export default function CategoryCard({ data }) {
  return (
    <div className={styles.card}>
     <Link to ={`/category/${data.name}`}>
      <h2 className={styles.title}>{data.title}</h2>
      <img className={styles.image} src={data.imageLink} alt={data.title} />
      <Link to={`#${data.name}`} className={styles.link}>
        Shop now
      </Link>
    </Link>
    </div>
  );
}
