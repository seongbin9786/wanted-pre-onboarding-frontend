import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthApi } from '../apis/AuthApi';
import { LoginForm } from '../components/LoginForm';
import { SIGNUP_PAGE_TITLE } from '../constants/UIMessageConstants';
import { LoginContext } from '../contexts/LoginContext';

const API_SERVER_URL = 'https://pre-onboarding-selection-task.shop';
const authApi = new AuthApi(API_SERVER_URL);

export function SignUpPage() {
  const { loggedIn } = useContext(LoginContext);

  const navigate = useNavigate();

  const redirectIfLoggedIn = () => {
    if (loggedIn) {
      navigate('/todo');
    }
  };

  const redirectToSignIn = () => {
    navigate('/signin');
  };

  const handleSignup = async (email: string, password: string) => {
    await authApi.signUpApi({ email, password });
    redirectToSignIn();
  };

  useEffect(() => {
    redirectIfLoggedIn();
  });

  return (
    <div>
      <h1>{SIGNUP_PAGE_TITLE}</h1>
      <LoginForm mode="signup" handleSubmit={handleSignup} />
    </div>
  );
}
