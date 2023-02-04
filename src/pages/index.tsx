import { useState } from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import { SignInPage } from "./SignInpage";
import { SignUpPage } from "./SignUpPage";

export const RootRouter = () => {
  const [accessToken, setAccessToken] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Under App.tsx</h1>
              <p>current in-memory AccessToken: [{accessToken}]</p>
              <p>
                current localstorage AccessToken: [
                {localStorage.getItem("accessToken")}]
              </p>
              <Link to="/">Move to main</Link>
              <br />
              <Link to="/signin">Move to Sign in</Link>
              <br />
              <Link to="/signup">Move to Sign up</Link>
              <Outlet />
            </div>
          }
        >
          <Route
            index
            element={
              <div>
                <h1>Welcome to Seongbin onboarding</h1>
              </div>
            }
          />
          <Route
            path="signin"
            element={<SignInPage setAccessToken={setAccessToken} />}
          />
          <Route
            path="signup"
            element={<SignUpPage setAccessToken={setAccessToken} />}
          />

          {/* Using path="*"" means "match anything", so this route
        acts like a catch-all for URLs that we don't have explicit
        routes for. */}
          <Route
            path="*"
            element={
              <div>
                <h1>404 Not found</h1>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
