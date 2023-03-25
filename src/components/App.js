import React, { useEffect, useState } from "react";
import Router from "./Router";
import { auth } from "../myBase";

function App() {
  const [init, setInit] = useState(false); //프로그램 초기화하길 기다려야함. 그다음에 isLogin이 바뀌도록
  const [isLogin, setIsLogin] = useState(false);
  const [userObj, setUserObj] = useState(null);

  //userobj를 firebase로 업데이트 해줘야함.
  //useState값이 변경되면 바로 변경되지가 않음.
  //왜냐면 auth.currentUser 덩치가 너무 커서. 그래서 object크기를 줄여줘야함
  //setUserObj 필요한 것만 추리기 (전체 가져오지 말고) uid, displayName, updateProfile()

  const refreshUser = () => {
    // console.log(auth.currentUser);
    //setUserObj(auth.currentUser)
    const user = auth.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => {
        user.updateProfile(args);
      },
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
        // setUserObj(user);
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          //내가 원하는 함수를 얻기 위한 중간 함수
          updateProfile: (args) => {
            user.updateProfile(args);
          },
        });
      } else {
        setIsLogin(false);
        setUserObj(null);
      }
      setInit(true); //setInit이 false라면 router를 숨길 것이서 이렇게 처리함.
    });
  }, []);

  // console.log(auth.currentUser);
  // setInterval(() => {
  //   console.log(auth.currentUser);
  // }, 2000);
  return (
    <>
      {init ? (
        <Router refreshUser={refreshUser} isLogin={isLogin} userObj={userObj} />
      ) : (
        "Initializing....."
      )}
    </>
  );
}

export default App;
