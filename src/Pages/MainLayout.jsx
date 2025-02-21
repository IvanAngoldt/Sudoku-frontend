import { Outlet } from "react-router-dom";

import Header from "../сomponents/Header/Header";
import "../App.css"

const MainLayout = () => {
  return (
    <div className="wrapper">
        <Header />
        <div className="page-content">
          <Outlet />
        </div>
    </div>
  );
};

export default MainLayout;
