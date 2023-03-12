import React, { useState } from "react";
import Router from "./Router";
import myBase from "../myBase";
import { auth } from "../myBase";

function App() {
  const [isLogin, setIsLogin] = useState(auth.currentUser);
  return (
    <>
      <Router isLogin={isLogin} />
    </>
  );
}

export default App;
