import React from "react";
import { catagoryFullinfos } from "./catagoryFullinfos";
import CategoryCard from "./CategoryCard";
import styles from "./Catagory.module.css";

export default function Category() {
  return (
    <section className={styles.categorySection}>
      {catagoryFullinfos.map((infos, i) => (
        <CategoryCard key={i} data={infos} />
      ))}
    </section>
  );
}
