import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LOGOUT_BUTTON_TITLE,
  NAVBAR_LINKS,
} from '../../constants/UIMessageConstants';
import { LoginContext } from '../../contexts/LoginContext';
import { ContainerStyle, LinkStyle, LogoutButtonStyle } from './style';

export const NavigationBar = () => {
  const navigate = useNavigate();
  const { loggedIn, logout } = useContext(LoginContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={ContainerStyle}>
      {loggedIn && (
        <button onClick={handleLogout} style={LogoutButtonStyle}>
          {LOGOUT_BUTTON_TITLE}
        </button>
      )}
      {NAVBAR_LINKS.map(([link, name]) => (
        <Link key={link} to={link} style={LinkStyle}>
          {name}
        </Link>
      ))}
    </div>
  );
};
