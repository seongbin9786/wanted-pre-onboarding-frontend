import type * as CSS from 'csstype';
import { useState } from 'react';
import { UserEmailField } from './UserEmailField';
import { UserPasswordField } from './UserPasswordField';

const LoginFormStyle: CSS.Properties = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '300px',
  gap: '16px',
  padding: '32px 16px',
  backgroundColor: 'darkgray',
};

const LoginButtonStyle: CSS.Properties = {
  height: '48px',
  marginTop: '4px',
};

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
        id={`${mode}-email-input`}
        value={email}
        handleChange={updateEmail}
      />
      <UserPasswordField
        id={`${mode}-password-input`}
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
        로그인
      </button>
    </div>
  );
}
