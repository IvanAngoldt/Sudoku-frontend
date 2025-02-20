import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css"; // Стили

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [touchedFields, setTouchedFields] = useState({ login: false, password: false });

  const handleBlur = (field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (!loginIdentifier || !password) {
        throw new Error("Please enter both fields.");
      }

      console.log("Logging in with:", { loginIdentifier, password });
      setTimeout(() => {
        setIsLoading(false);
        alert("Signed in successfully!");
      }, 1500);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Угловые номера */}
        {/* <div className="corner-number top-left">1</div>
        <div className="corner-number top-right">9</div>
        <div className="corner-number bottom-left">7</div>
        <div className="corner-number bottom-right">4</div> */}

        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to continue your game</p>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="loginIdentifier">Nickname or Email</label>
            <div className={`input-wrapper ${touchedFields.login && !loginIdentifier ? "error-border" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                id="loginIdentifier"
                type="text"
                required
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                onBlur={() => handleBlur("login")}
                placeholder="Nickname or Email"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className={`input-wrapper ${touchedFields.password && !password ? "error-border" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                placeholder="Password"
                minLength={6}
              />
              <span
                className="toggle-password"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
              >
                {showPassword ? 
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" class="sc-gsFSXq kzWFeD">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="currentColor"/>
                </svg>
                : 
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" class="sc-gsFSXq kzWFeD">
                  <path d="M12 17C9.24 17 7 14.76 7 12C7 11.35 7.13 10.74 7.36 10.17L4.44 7.25C2.93 8.51 1.74 10.14 1.01 12C2.74 16.39 7.01 19.5 12.01 19.5C13.41 19.5 14.75 19.25 15.99 18.8L13.83 16.64C13.26 16.87 12.65 17 12 17ZM22 19.73L19.26 16.99C20.92 15.7 22.22 13.98 23 12C21.27 7.61 17 4.5 12 4.5C10.45 4.5 8.97 4.8 7.62 5.34L4.27 2L3 3.27L20.73 21L22 19.73ZM16.47 14.2L14.92 12.65C14.97 12.44 15 12.22 15 12C15 10.34 13.66 9 12 9C11.78 9 11.56 9.03 11.35 9.08L9.8 7.53C10.47 7.2 11.21 7 12 7C14.76 7 17 9.24 17 12C17 12.79 16.8 13.53 16.47 14.2ZM12.16 14.98L9.01 11.83L8.99 11.99C8.99 13.65 10.33 14.99 11.99 14.99L12.16 14.98Z" fill="currentColor"></path>
                </svg>
                }
              </span>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? "LOGGING IN..." : "LOG IN"}
          </button>
        </form>

        <p className="register-text">
          Don’t have an account? <Link to="/signup" className="register-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
