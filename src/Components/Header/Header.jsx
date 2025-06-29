import React, { useContext } from "react";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";
import { Type } from "../../Utility/action.type";

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem =
    basket?.reduce((amount, item) => item.amount + amount, 0) || 0;

  const handleAuthClick = (e) => {
    if (user) {
      e.preventDefault(); // prevent navigating to "#"
      auth.signOut();
      dispatch({ type: Type.SET_USER, user: null });
    }
  };

  return (
    <section className={classes.fixed}>
      <header className={classes.header_container}>
        {/* Logo and Location */}
        <div className={classes.left}>
          <Link to="/" className={classes.hoverBox}>
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="amazon logo"
              className={classes.logo}
            />
          </Link>
          <div className={`${classes.location} ${classes.hoverBox}`}>
            <SlLocationPin className={classes.pinIcon} />
            <div className={classes.deliver}>
              <p className={classes.smallText}>Deliver to</p>
              <span className={classes.boldText}>Ethiopia</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className={classes.search}>
          <select className={classes.dropdown}>
            <option value="">All</option>
          </select>
          <input
            type="text"
            placeholder="Search Amazon"
            className={classes.searchInput}
          />
          <button className={classes.searchIcon}>
            <BsSearch />
          </button>
        </div>

        {/* Right Side */}
        <div className={classes.right}>
          {/* Language */}
          <div className={`${classes.language} ${classes.hoverBox}`}>
            <img
              src="https://static-00.iconduck.com/assets.00/us-flag-icon-2048x1079-pctndxsj.png"
              alt="US Flag"
            />
            <select>
              <option>EN</option>
            </select>
          </div>

          {/* Sign In / Out */}
          <Link
            to={!user ? "/auth" : "#"}
            className={classes.navLink}
            onClick={handleAuthClick}
          >
            <div>
              {user ? (
                <>
                  <p>Hello {user?.email?.split("@")[0]}</p>
                  <span className={classes.boldText}>Sign Out</span>
                </>
              ) : (
                <>
                  <p className={classes.smallText}>Hello, Sign In</p>
                  <span className={classes.boldText}>Account & Lists</span>
                </>
              )}
            </div>
          </Link>

          {/* Orders */}
          <Link to="/orders" className={classes.navLink}>
            <p className={classes.smallText}>Returns</p>
            <span className={classes.boldText}>& Orders</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className={`${classes.cart} ${classes.hoverBox}`}>
            <BiCart className={classes.cartIcon} />
            <span className={classes.cartCount}>{totalItem}</span>
          </Link>
        </div>
      </header>

      <LowerHeader />
    </section>
  );
}

export default Header;
