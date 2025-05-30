
import React from "react";
import LayOut from "../../Components/LayOut/LayOut";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productUrl } from "../../Api/endPoints";
import Loader from "../../Components/Loader/Loader";
import styles from "./ProductDetail.module.css";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setproduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${productUrl}/products/${productId}`).then((res) => {
      setproduct(res.data);
      setIsLoading(false);
    });
  }, [productId]);

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <div className={styles.imageSection}>
            <img src={product.image} alt={product.title} />
          </div>
          <div className={styles.detailsSection}>
            <h2>{product.title}</h2>
            <h3 className={styles.price}>${product.price}</h3>
            <p className={styles.category}>
              <strong>Category:</strong> {product.category}
            </p>
            <p className={styles.description}>{product.description}</p>
            <button className={styles.buyButton}>Buy Now</button>
          </div>
        </div>
      )}
    </LayOut>
  );
}
