import { Outlet } from 'react-router-dom';
import { NavigationBar } from '../NavigationBar';
import { ContainerStyle, TitleStyle } from './style';

const TITLE = '김성빈의 TodoList App';

/**
 * 네비게이션 바 및 라우터 별 페이지를 표시하는 Layout 컴포넌트
 */
export function Layout() {
  return (
    <div style={ContainerStyle}>
      <div>
        <h1 style={TitleStyle}>{TITLE}</h1>
        <NavigationBar />
      </div>
      <Outlet />
    </div>
  );
}
