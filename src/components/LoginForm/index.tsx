import { useState } from 'react';
import {
  LOGIN_BUTTON_TITLE,
  SIGNUP_BUTTON_TITLE,
} from '../../constants/UIMessageConstants';
import { UserEmailField } from '../UserEmailField';
import { UserPasswordField } from '../UserPasswordField';
import { LoginButtonStyle, LoginFormStyle } from './style';

interface LoginFormProps {
  mode: 'signin' | 'signup';
  handleSubmit: (email: string, password: string) => void;
}

export function LoginForm({ mode, handleSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsvalid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordlIsValid, setPasswordlIsvalid] = useState(false);
  const submitAvailable = emailIsValid && passwordlIsValid;
  const buttonTitle =
    mode === 'signin' ? LOGIN_BUTTON_TITLE : SIGNUP_BUTTON_TITLE;

  const updateEmail = (newEmail: string) => {
    setEmailIsvalid(newEmail.includes('@'));
    setEmail(newEmail);
  };

  const updatePassword = (newPassword: string) => {
    setPasswordlIsvalid(newPassword.length >= 8);
    setPassword(newPassword);
  };

  const handleButtonClick = () => handleSubmit(email, password);

  return (
    <div style={LoginFormStyle}>
      <UserEmailField
        id="email-input"
        value={email}
        handleChange={updateEmail}
      />
      <UserPasswordField
        id="password-input"
        value={password}
        handleChange={updatePassword}
      />
      <button
        style={LoginButtonStyle}
        id={`${mode}-button`}
        data-testid={`${mode}-button`}
        disabled={!submitAvailable}
        onClick={handleButtonClick}
      >
        {buttonTitle}
      </button>
    </div>
  );
}
