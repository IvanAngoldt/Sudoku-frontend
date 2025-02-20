import SudokuBackground from "../../сomponents/Background/Background";
import { Outlet } from "react-router-dom";
import "./Auth.css";

const AuthLayout = () => {
  return (
    <div className="login-container">
        <SudokuBackground />
        <Outlet />
    </div>
  );
};

export default AuthLayout;
