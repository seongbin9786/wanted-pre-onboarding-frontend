import { useEffect, useState } from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import { AuthApi } from "../apis/AuthApi";
import { SignInPage } from "./SignInpage";
import { SignUpPage } from "./SignUpPage";
import { TodoListPage } from "./TodoListPage";

// 한 번 생성하면 끝이어서 컴포넌트 바깥에서 생성
const authApi = new AuthApi("https://pre-onboarding-selection-task.shop");

export const RootRouter = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const updateAccessToken = (newAccessToken: string) => {
    setAccessToken(newAccessToken);
    setLoggedIn(true);
  };
  const logout = () => {
    setAccessToken("");
    setLoggedIn(false);
    localStorage.removeItem("accessToken");
  };

  useEffect(() => {
    const fromLocalStorage = localStorage.getItem("accessToken");
    if (fromLocalStorage) {
      updateAccessToken(fromLocalStorage);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Welcome to TodoList App</h1>
              <p>current AccessToken: [{accessToken}]</p>
              {loggedIn && <button onClick={logout}>Logout</button>}
              <br />
              <Link to="/">Move to main</Link>
              <br />
              <Link to="/signin">Move to Sign in</Link>
              <br />
              <Link to="/signup">Move to Sign up</Link>
              <br />
              <Link to="/todo">Move to Todo List</Link>
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
            element={
              <SignInPage
                authApi={authApi}
                setAccessToken={updateAccessToken}
              />
            }
          />
          <Route path="signup" element={<SignUpPage authApi={authApi} />} />
          <Route
            path="todo"
            element={
              <TodoListPage loggedIn={loggedIn} accessToken={accessToken} />
            }
          />
          <Route
            path="*"
            element={
              <div>
                <h1>Page Not found</h1>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
