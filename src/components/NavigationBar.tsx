import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';

export const NavigationBar = () => {
  const { loggedIn, logout } = useContext(LoginContext);

  return (
    <div>
      <h1>Welcome to TodoList App</h1>
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
  );
};
