import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const Router = ({ isLogin }) => {
  return (
    <BrowserRouter>
      <Routes>
        {isLogin ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
