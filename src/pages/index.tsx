import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import { AuthApi } from '../apis/AuthApi';
import { TodoApi } from '../apis/TodoApis';
import { SignInPage } from './SignInpage';
import { SignUpPage } from './SignUpPage';
import { TodoListPage } from './TodoListPage';

const API_SERVER_URL = 'https://pre-onboarding-selection-task.shop';

// 한 번 생성하면 끝이어서 컴포넌트 바깥에서 생성
const authApi = new AuthApi(API_SERVER_URL);

export const RootRouter = () => {
  const [todoApi, setTodoApi] = useState(new TodoApi(API_SERVER_URL));
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const updateAccessToken = (newAccessToken: string) => {
    setAccessToken(newAccessToken);
    setLoggedIn(true);
    setTodoApi(new TodoApi(API_SERVER_URL, newAccessToken));
  };
  const logout = () => {
    setAccessToken('');
    setLoggedIn(false);
    localStorage.removeItem('accessToken');
  };

  useEffect(() => {
    const fromLocalStorage = localStorage.getItem('accessToken');
    if (fromLocalStorage) {
      updateAccessToken(fromLocalStorage);
    }
    // 함수는 바뀌지 않음
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
            element={<TodoListPage loggedIn={loggedIn} todoApi={todoApi} />}
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
