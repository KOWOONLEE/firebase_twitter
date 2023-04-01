import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
import styled from "styled-components";
import { theme } from "../color";

const Router = ({ refreshUser, isLogin, userObj }) => {
  return (
    <BrowserRouter>
      <StyledRouter>
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
      </StyledRouter>
    </BrowserRouter>
  );
};
export default Router;

const StyledRouter = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${theme.bg};
  overflow-y: auto;
`;
