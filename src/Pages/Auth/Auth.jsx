import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./SignUp.module.css";
import { auth } from "../../Utility/firebase";
import { ClipLoader } from "react-spinners";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location?.state?.redirect || "/";
  const warningMsg = location?.state?.msg || "";

  const authHandler = async (e) => {
    e.preventDefault();
    const isSignIn = e.target.name === "signin";

    try {
      if (isSignIn) {
        setLoading((prev) => ({ ...prev, signIn: true }));
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({ type: Type.SET_USER, user: userInfo.user });
        setLoading((prev) => ({ ...prev, signIn: false }));
        navigate(redirectPath);
      } else {
        setLoading((prev) => ({ ...prev, signUp: true }));
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({ type: Type.SET_USER, user: userInfo.user });
        setLoading((prev) => ({ ...prev, signUp: false }));
        navigate(redirectPath);
      }
    } catch (err) {
      setError(err.message);
      setLoading({ signIn: false, signUp: false });
    }
  };

  return (
    <section className={classes.authContainer}>
      <div className={classes.card}>
        <Link to="/">
          <img
            className={classes.logo}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
            alt="Amazon"
          />
        </Link>

        {warningMsg && (
          <div className={classes.authMessage}>
            <p>{warningMsg}</p>
          </div>
        )}

        <h2>Sign-in</h2>
        <form>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={classes.signInBtn}
            disabled={loading.signIn}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>

        <p className={classes.notice}>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice, and our
          Interest-Based Ads Notice.
        </p>

        <button
          type="button"
          name="signup"
          onClick={authHandler}
          className={classes.secondaryBtn}
          disabled={loading.signUp}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>

        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
