import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthApi } from '../apis/AuthApi';
import { LoginForm } from '../components/LoginForm';
import { LoginContext } from '../contexts/LoginContext';

const API_SERVER_URL = 'https://pre-onboarding-selection-task.shop';
const authApi = new AuthApi(API_SERVER_URL);

export function SignInPage() {
  const { loggedIn, login } = useContext(LoginContext);

  const navigate = useNavigate();

  const redirectToTodoList = () => {
    navigate('/todo');
  };

  const redirectIfLoggedIn = () => {
    if (loggedIn) {
      redirectToTodoList();
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const accessToken = await authApi.signInApi({ email, password });
    login(accessToken);
    redirectToTodoList();
  };

  useEffect(() => {
    redirectIfLoggedIn();
  });

  return (
    <div>
      <h1>로그인 폼</h1>
      <LoginForm mode="signin" handleSubmit={handleLogin} />
    </div>
  );
}
