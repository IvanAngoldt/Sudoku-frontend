import { Outlet } from "react-router-dom";

import Header from "../сomponents/Header/Header";

const MainLayout = () => {
  return (
    <div>
        <Header />
        <Outlet />
    </div>
  );
};

export default MainLayout;
