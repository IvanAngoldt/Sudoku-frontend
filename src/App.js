import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from './сomponents/LoginPage';
// import MainPage from './Components/MainPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          {/* <Route path="/" element={<MainPage/> } /> */}
          <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
