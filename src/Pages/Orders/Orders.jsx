import React, { useEffect, useState, useContext } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import LayOut from "../../Components/LayOut/LayOut";
import Currencyformat from "../../Components/CurrencyFormat/Currencyformat";
import classes from "./Orders.module.css";

export default function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const q = query(
        collection(db, "orders"),
        where("user", "==", user.email),
        orderBy("created", "desc")
      );

      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(results);
    };

    fetchOrders();
  }, [user]);

  return (
    <LayOut>
      <div className={classes.ordersContainer}>
        <h2>Your Orders</h2>

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className={classes.orderCard}>
              <div className={classes.orderHeader}>
                <p><strong>Order ID:</strong> {order.paymentId}</p>
                <p><strong>Date:</strong> {order.created?.toDate?.().toLocaleString()}</p>
                <p><strong>Total:</strong> <Currencyformat amount={order.total} /></p>
              </div>

              <div className={classes.itemsList}>
                {order.items.map((item, i) => (
                  <div key={i} className={classes.orderItem}>
                    <img src={item.image} alt={item.title} />
                    <div>
                      <h4>{item.title}</h4>
                      <p>Quantity: {item.amount}</p>
                      <p>Price: ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </LayOut>
  );
}
