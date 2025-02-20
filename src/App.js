import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./сomponents/AuthLayout";
import LoginPage from "./сomponents/LoginPage";
import SignupPage from "./сomponents/SignupPage";

const App = () => {
  return (
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<MainPage />} /> */}

      {/* Группа маршрутов с общим фоном */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
};

export default App;
