import React from "react";
import { catagoryFullInfos } from "./catagoryFullInfos";
import CategoryCard from "./CategoryCard";
import styles from "./catagory.module.css";

export default function Category() {
  return (
    <section className={styles.categorySection}>
      {catagoryFullInfos.map((infos, i) => (
        <CategoryCard key={i} data={infos} />
      ))}
    </section>
  );
}
