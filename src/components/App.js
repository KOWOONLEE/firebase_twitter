import React, { useEffect, useState } from "react";
import Router from "./Router";
import { auth } from "../myBase";

function App() {
  const [init, setInit] = useState(false); //프로그램 초기화하길 기다려야함. 그다음에 isLogin이 바뀌도록
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      setInit(true); //setInit이 false라면 router를 숨길 것이서 이렇게 처리함.
    });
  }, []);

  // console.log(auth.currentUser);
  // setInterval(() => {
  //   console.log(auth.currentUser);
  // }, 2000);
  return <>{init ? <Router isLogin={isLogin} /> : "Initializing....."}</>;
}

export default App;
