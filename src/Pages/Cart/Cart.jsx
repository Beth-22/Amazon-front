import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import styles from "./Cart.module.css";
import Currencyformat from "../../Components/CurrencyFormat/Currencyformat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

export default function Cart() {
  const [{ basket }, dispatch] = useContext(DataContext);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className={styles.cartSection}>
        <div className={styles.cartWrapper}>
          <div className={styles.cartList}>
            {basket.length === 0 ? (
              <p className={styles.emptyMessage}>Oops! No item in your cart!</p>
            ) : (
              basket.map((item, index) => (
                <div className={styles.cartItem} key={index}>
                  <div className={styles.imageContainer}>
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className={styles.detailsContainer}>
                    <h3>{item.title}</h3>
                    <p className={styles.description}>{item.description}</p>
                    <div className={styles.price}>
                      ${item.price} × {item.amount} = $
                      {(item.price * item.amount).toFixed(2)}
                    </div>
                    <div className={styles.rating}>
                      {Array(Math.floor(item.rating?.rate || 0))
                        .fill()
                        .map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      <span className={styles.starCount}>
                        {item.rating?.rate} ({item.rating?.count} reviews)
                      </span>
                    </div>
                  </div>

                  <div className={styles.counterContainer}>
                    <button onClick={() => increment(item)}>
                      <MdKeyboardArrowUp size={24} />
                    </button>
                    <span className={styles.itemAmount}>{item.amount}</span>
                    <button onClick={() => decrement(item.id)}>
                      <MdKeyboardArrowDown size={24} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {basket.length !== 0 && (
            <div className={styles.checkoutBox}>
              <p className={styles.checkoutTitle}>
                Subtotal ({basket.length} item{basket.length > 1 ? "s" : ""})
              </p>
              <Currencyformat amount={total} />
              <label className={styles.giftOption}>
                <input type="checkbox" />
                <small>This order contains a gift</small>
              </label>
              <Link to="/payments" className={styles.checkoutBtn}>
                Continue to Checkout
              </Link>
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
}
