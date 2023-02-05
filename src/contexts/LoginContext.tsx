import React, { createContext, useEffect, useState } from 'react';

const ACCESS_TOKEN = 'access_token';

const initialState = {
  loggedIn: false,
  accessToken: '',
  // eslint-disable-next-line
  login: (newAccessToken: string) => {},
  // eslint-disable-next-line
  logout: () => {},
};

export const LoginContext = createContext(initialState);

export const LoginProvider = ({ children }: React.PropsWithChildren) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const login = (newAccessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN, newAccessToken);
    setAccessToken(newAccessToken);
    setLoggedIn(true);
  };

  const logout = () => {
    setAccessToken('');
    setLoggedIn(false);
    localStorage.removeItem(ACCESS_TOKEN);
  };

  const loadAccessToken = () => {
    const fromLocalStorage = localStorage.getItem(ACCESS_TOKEN);
    if (fromLocalStorage) {
      login(fromLocalStorage);
    }
  };

  useEffect(() => {
    loadAccessToken();
  }, []);

  return (
    <LoginContext.Provider
      value={{
        loggedIn,
        accessToken,
        login,
        logout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
