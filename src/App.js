import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./Pages/Auth/AuthLayout";
import LoginPage from "./Pages/Auth/LoginPage";
import SignupPage from "./Pages/Auth/SignupPage";

import MainLayout from "./Pages/MainLayout";
import ProfilePage from "./Pages/Profile/ProfilePage";
import MainPage from "./Pages/Main/MainPage";
import StrategiesPage from "./Pages/Strategies/StrategiesPage";
import StrategyDetailsPage from "./Pages/Strategies/StrategyDetailsPage";
import TournamentsPage from "./Pages/Tournaments/TournamentsPage";
import NewsPage from "./Pages/News/NewsPage";
import NewsListPage from "./Pages/News/NewsListPage";

import SingleGamePage from "./Pages/SingleGame/SingleGamePage";
import TournamentGamePage from "./Pages/TournamentGame/TournamentGamePage";

import RequireAuth from "./RequireAuth";
import { AvatarProvider } from "./context/avatar-context";

import CreateAchievementsPage from "./Pages/Create/CreateAchievementsPage";

import AdminPage from "./Pages/Admin/AdminPage";

import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AvatarProvider>
          <Routes>
            <Route path="CreateAchievements" element={<CreateAchievementsPage />} />
            <Route path="admin" element={<AdminPage />} />
            {/* Авторизация */}
            <Route element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
            </Route>

            <Route element={
              <RequireAuth>
                <MainLayout />
              </RequireAuth>}>

              <Route path="/" element={<MainPage />} />
              <Route path="profile" element={<ProfilePage />} />

              <Route path="game" element={<SingleGamePage />} />
              <Route path="game/:id" element={<SingleGamePage />} />

              <Route path="tournament" element={<TournamentGamePage />} />
              <Route path="tournament/:id" element={<TournamentGamePage />} />

              <Route path="strategies" element={<StrategiesPage />} />
              <Route path="strategies/:strategyId" element={<StrategyDetailsPage />} />
              <Route path="tournaments" element={<TournamentsPage />} />
              <Route path="news" element={<NewsListPage />} />
              <Route path="news/:id" element={<NewsPage />} />
            </Route>
          </Routes>
        </AvatarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
