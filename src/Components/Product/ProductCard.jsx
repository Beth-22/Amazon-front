import React, {useContext} from "react";
import Rating from "@mui/material/Rating";
import Currencyformat from "../CurrencyFormat/Currencyformat";
import styles from "./Product.module.css";
import {Link} from 'react-router-dom'
import {DataContext} from '../DataProvider/DataProvider'
import {Type} from '../../Utility/action.type'


export default function ProductCard({ product }) {
  const { image, title,id ,rating, price,description } = product;
  const[state,dispatch]=useContext(DataContext)

  const addToCart=()=>{
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description
      },
    });
  }

  return (
    <div className={styles.card}>
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={styles.image} />
      </Link>

      <h3 className={styles.title}>{title}</h3>

      <div className={styles.rating}>
        <Rating
          value={rating?.rate || 0}
          precision={0.1}
          readOnly
          size="small"
        />
        <small>({rating?.count})</small>
      </div>

      <div className={styles.price}>
        <Currencyformat amount={price} />
      </div>

      <button className={styles.button} onClick={addToCart}>Add to cart</button>
    </div>
  );
}
