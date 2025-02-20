import SudokuBackground from "./Background";
import { Outlet } from "react-router-dom";
import "../styles/Auth.css"; 

const AuthLayout = () => {
  return (
    <div className="login-container">
        <SudokuBackground />
        <Outlet />
    </div>
  );
};

export default AuthLayout;
