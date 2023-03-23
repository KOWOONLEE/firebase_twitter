import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const Router = ({ refreshUser, isLogin, userObj }) => {
  return (
    <BrowserRouter>
      {isLogin && <Navigation userObj={userObj} />}
      <Routes>
        {isLogin ? (
          <Route path="/" element={<Home userObj={userObj} />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
        <Route
          path="/profile"
          element={<Profile refreshUser={refreshUser} userObj={userObj} />}
        />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
