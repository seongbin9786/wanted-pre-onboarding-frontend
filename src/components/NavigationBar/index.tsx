import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';
import { ContainerStyle, LinkStyle, LogoutButtonStyle } from './style';

const NAVBAR_LINKS = [
  ['/signin', '로그인'],
  ['/signup', '회원가입'],
  ['/todo', '할일목록'],
];

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
          로그아웃
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
