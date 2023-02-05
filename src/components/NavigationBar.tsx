import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';

import type * as CSS from 'csstype';

const NAVBAR_LINKS = [
  ['/signin', '로그인'],
  ['/signup', '회원가입'],
  ['/todo', '할일목록'],
];

const ContainerStyle: CSS.Properties = {
  display: 'flex',
  gap: '16px',
  border: '1px solid black',
  flexDirection: 'row-reverse',
  padding: '8px',
};

const LinkStyle: CSS.Properties = {
  fontSize: '20px',
  lineHeight: '1.5',
  fontWeight: 'bold',
  color: '#666',
};

const LogoutButtonStyle: CSS.Properties = {
  fontSize: '20px',
  lineHeight: '1.5',
  fontWeight: 'bold',
  background: 'none',
  border: 'none',
  textDecoration: 'underline',
  cursor: 'pointer',
  color: '#666',
};

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
