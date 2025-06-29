import "./App.css";
import Routing from "./Router";
import React, { useContext, useEffect } from "react";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { auth } from "./Utility/firebase"; // ✅ import your Firebase auth
import { Type } from "./Utility/action.type"; // ✅ import your action types

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    return () => unsubscribe(); // ✅ cleanup listener
  }, [dispatch]);

  return <Routing />;
}

export default App;
