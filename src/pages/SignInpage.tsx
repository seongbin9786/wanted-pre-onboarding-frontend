import { useNavigate } from 'react-router-dom';
import { AuthApi } from '../apis/AuthApi';
import { LoginForm } from '../components/LoginForm';

interface SignInPageProps {
  authApi: AuthApi;
  setAccessToken: (accessToken: string) => void;
}

export function SignInPage({ authApi, setAccessToken }: SignInPageProps) {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const accessToken = await authApi.signInApi({ email, password });
    setAccessToken(accessToken);
    navigate('/todo');
    localStorage.setItem('accessToken', accessToken);
  };

  return (
    <div>
      <h1>로그인 폼</h1>
      <LoginForm mode="signin" handleSubmit={handleLogin} />
    </div>
  );
}
