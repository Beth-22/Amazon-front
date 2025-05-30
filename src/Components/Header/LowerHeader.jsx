import React from "react";
import classes from "./Header.module.css";
import { GiHamburgerMenu } from "react-icons/gi";

function LowerHeader() {
  return (
    <div className={classes.lowerHeader}>
      <div className={classes.lowerHeaderLinks}>
        <a href="#" className={classes.lowerLink}>
          <GiHamburgerMenu className={classes.icon} />
          All
        </a>
        <a href="#" className={classes.lowerLink}>
          Today's Deals
        </a>
        <a href="#" className={classes.lowerLink}>
          Customer Service
        </a>
        <a href="#" className={classes.lowerLink}>
          Registry
        </a>
        <a href="#" className={classes.lowerLink}>
          Gift Cards
        </a>
        <a href="#" className={classes.lowerLink}>
          Sell
        </a>
      </div>
    </div>
  );
}

export default LowerHeader;
