import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Header from "./сomponents/Header/Header"

import AuthLayout from "./Pages/Auth/AuthLayout";
import LoginPage from "./Pages/Auth/LoginPage";
import SignupPage from "./Pages/Auth/SignupPage";

import MainLayout from "./Pages/MainLayout";
import ProfilePage from "./Pages/Profile/ProfilePage";
import MainPage from "./Pages/Main/MainPage";
import SingleGamePage from "./Pages/SingleGame/SingleGamePage";


const App = () => {
  return (
  <BrowserRouter>
    <Routes>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>

      {/* {<Header />} */}

      <Route element={<MainLayout />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="single" element={<SingleGamePage />} />
      </Route>

    </Routes>
  </BrowserRouter>
  );
};

export default App;
