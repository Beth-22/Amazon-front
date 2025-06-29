import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";

const ProtectedRoute = ({ children, msg = "Please log in to continue", redirect }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [{ user }] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth", {
        state: {
          msg: msg || location.state?.msg || "Please log in to continue",
          redirect,
        },
      });
    }
  }, [user]);

  return user ? children : null;
};

export default ProtectedRoute;
