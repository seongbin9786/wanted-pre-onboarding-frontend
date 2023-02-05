import { useNavigate } from 'react-router-dom';
import { AuthApi } from '../apis/AuthApi';
import { LoginForm } from '../components/LoginForm';

interface SignUpPageProps {
  authApi: AuthApi;
}

export function SignUpPage({ authApi }: SignUpPageProps) {
  const navigate = useNavigate();

  const handleSignup = async (email: string, password: string) => {
    await authApi.signUpApi({ email, password });
    navigate('/signin');
  };

  return (
    <div>
      <h1>회원가입 폼</h1>
      <LoginForm mode="signup" handleSubmit={handleSignup} />
    </div>
  );
}
