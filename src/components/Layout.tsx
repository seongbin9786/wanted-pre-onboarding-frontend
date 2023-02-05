import type * as CSS from 'csstype';

import { Outlet } from 'react-router-dom';
import { NavigationBar } from './NavigationBar';

const TITLE = '김성빈의 TodoList App';

const ContainerStyle: CSS.Properties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  minWidth: '400px',
  maxWidth: '600px',
  margin: '0px auto',
};

const TitleStyle: CSS.Properties = {
  margin: '0px 0px 8px 0px',
};

export const Layout = () => {
  return (
    <div style={ContainerStyle}>
      <div>
        <h1 style={TitleStyle}>{TITLE}</h1>
        <NavigationBar />
      </div>
      <Outlet />
    </div>
  );
};
