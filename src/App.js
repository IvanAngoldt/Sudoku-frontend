import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./Pages/Auth/AuthLayout";
import LoginPage from "./Pages/Auth/LoginPage";
import SignupPage from "./Pages/Auth/SignupPage";

import MainLayout from "./Pages/MainLayout";
import ProfilePage from "./Pages/Profile/ProfilePage";
import MainPage from "./Pages/Main/MainPage";
import SingleGamePage from "./Pages/SingleGame/SingleGamePage";
import StrategiesPage from "./Pages/Strategies/StrategiesPage";
import StrategyDetailsPage from "./Pages/Strategies/StrategyDetailsPage";
import TournamentsPage from "./Pages/Tournaments/TournamentsPage";
import NewsPage from "./Pages/News/NewsPage";
import NewsListPage from "./Pages/News/NewsListPage";

import RequireAuth from "./RequireAuth";
import { AvatarProvider } from "./context/avatar-context";

import CreateAchievementsPage from "./Pages/Create/CreateAchievementsPage";
import GameEntryPage from "./Pages/SingleGame/GameEntryPage"; // новый файл

import AdminPage from "./Pages/Admin/AdminPage";

const App = () => {
  return (
    <BrowserRouter>
      <AvatarProvider>
        <Routes>
          <Route path="CreateAchievements" element={<CreateAchievementsPage />} />
          <Route path="Admin" element={<AdminPage />} />
          {/* Авторизация */}
          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>

          {/* Защищённая часть */}
          <Route
            element={
              <RequireAuth>
                <MainLayout />
              </RequireAuth>
            }
          >
            <Route path="/" element={<MainPage />} />
            <Route path="profile" element={<ProfilePage />} />

            {/* Изменённые маршруты для game */}
            <Route path="game" element={<GameEntryPage />} />
            <Route path="game/:id" element={<SingleGamePage />} />

            <Route path="strategies" element={<StrategiesPage />} />
            <Route path="strategies/:strategyId" element={<StrategyDetailsPage />} />
            <Route path="tournaments" element={<TournamentsPage />} />
            <Route path="news" element={<NewsListPage />} />
            <Route path="news/:id" element={<NewsPage />} />
          </Route>
        </Routes>
      </AvatarProvider>
    </BrowserRouter>
  );
};

export default App;
