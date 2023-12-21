import React, { useEffect } from "react";
import Rotas from "./Routes/routes";
import { UserContext } from "./context/AuthContext";
import { useState } from "react";

const App = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token")

    setUserData(token === null ? {} : JSON.parse(token))
  }, []); 

  
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Rotas />
    </UserContext.Provider>
  );
};

export default App;
