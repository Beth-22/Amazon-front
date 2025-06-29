import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Rating from "@mui/material/Rating";
import axios from "../../Api/axios";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../Utility/firebase";

// Format currency
function formatCurrency(amount) {
  return amount?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  }) || "$0.00";
}

export default function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const totalItem = basket?.reduce((a, item) => a + item.amount, 0);
  const total = basket?.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  const handleChange = (e) => {
    setCardError(e?.error?.message || "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (!user) {
      alert("You must be signed in to proceed with payment.");
      return;
    }

    if (total <= 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setIsProcessing(true);
      const totalInCents = Math.round(total * 100);

      // Step 1: Get client secret from backend
     await axios.post(
  `https://amazon-api-deploy-8u2d.onrender.com/payment/create?total=${totalInCents}`
);
      const clientSecret = res.data.clientSecret;

      // Step 2: Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.email,
          },
        },
      });

      if (result.error) {
        setCardError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        // Save order to Firestore
        await addDoc(collection(db, "orders"), {
          user: user.email,
          created: serverTimestamp(),
          items: basket,
          total,
          paymentId: result.paymentIntent.id,
        });

        dispatch({ type: "EMPTY_BASKET" });
        navigate("/orders");
      }
    } catch (err) {
      console.error("Payment Error", err);
      setCardError("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.checkout_bar}>
        Checkout ({totalItem || 0} items)
      </div>

      <div className={classes.payment}>
        {/* Delivery Address */}
        <div className={classes.section}>
          <div className={classes.left}>
            <h3>Delivery Address</h3>
          </div>
          <div className={classes.right}>
            <p>{user?.email || "Guest"}</p>
            <p>123 React Lane</p>
            <p>Chicago, IL</p>
          </div>
        </div>
        <hr />

        {/* Review Items */}
        <div className={classes.section}>
          <div className={classes.left}>
            <h3>Review items and delivery</h3>
          </div>
          <div className={classes.right}>
            {basket?.map((item, i) => (
              <div key={i} className={classes.product_summary}>
                <img src={item.image} alt={item.title} />
                <div>
                  <h4>{item.title}</h4>
                  <div className={classes.rating}>
                    <Rating
                      value={item.rating?.rate || item.rating || 0}
                      precision={0.1}
                      readOnly
                      size="small"
                    />
                    {item.rating?.count && (
                      <small>({item.rating.count})</small>
                    )}
                  </div>
                  <strong>{formatCurrency(item.price)}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr />

        {/* Payment Method */}
        <div className={classes.section}>
          <div className={classes.left}>
            <h3>Payment Method</h3>
          </div>
          <div className={classes.right}>
            <form
              onSubmit={handlePayment}
              className={classes.payment_form}
              autoComplete="off"
            >
              {/* Prevent autofill */}
              <input type="text" name="fakeuser" style={{ display: "none" }} />
              <input
                type="password"
                name="fakepass"
                style={{ display: "none" }}
              />

              {cardError && (
                <small className={classes.error}>{cardError}</small>
              )}
              <CardElement
                onChange={handleChange}
                className={classes.card_element}
              />

              <div className={classes.payment_footer}>
                <div className={classes.total_price}>
                  Total | {formatCurrency(total)}
                </div>
                <button
                  type="submit"
                  disabled={!stripe || isProcessing}
                  className={classes.pay_button}
                >
                  {isProcessing ? (
                    <>
                      <span className={classes.loader}></span>
                      Please wait while processing...
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LayOut>
  );
}
