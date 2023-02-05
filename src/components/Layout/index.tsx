import { Outlet } from 'react-router-dom';
import { WEBSITE_TITLE } from '../../constants/UIMessageConstants';
import { NavigationBar } from '../NavigationBar';
import { ContainerStyle, TitleStyle } from './style';

/**
 * 네비게이션 바 및 라우터 별 페이지를 표시하는 Layout 컴포넌트
 */
export function Layout() {
  return (
    <div style={ContainerStyle}>
      <div>
        <h1 style={TitleStyle}>{WEBSITE_TITLE}</h1>
        <NavigationBar />
      </div>
      <Outlet />
    </div>
  );
}
