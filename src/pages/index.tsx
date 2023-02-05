import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { MainPage } from './MainPage';
import { NotFoundPage } from './NotFoundPage';
import { SignInPage } from './SignInpage';
import { SignUpPage } from './SignUpPage';
import { TodoListPage } from './TodoListPage';

export const RootRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="todo" element={<TodoListPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
