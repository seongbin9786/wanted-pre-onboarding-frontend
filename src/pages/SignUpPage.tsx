import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../apis/AuthApi";

interface SignUpPageProps {
  authApi: AuthApi;
}

export function SignUpPage({ authApi }: SignUpPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsValid, setEmailIsvalid] = useState(false);
  const [passwordlIsValid, setPasswordlIsvalid] = useState(false);
  const submitAvailable = emailIsValid && passwordlIsValid;

  const updateEmail = (newEmail: string) => {
    // email 검사
    setEmailIsvalid(newEmail.includes("@"));
    setEmail(newEmail);
  };

  const updatePassword = (newPassword: string) => {
    setPasswordlIsvalid(newPassword.length >= 8);
    setPassword(newPassword);
  };

  return (
    <div>
      <h1>회원가입 폼</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 300,
          gap: 16,
          padding: "32px 16px",
          backgroundColor: "darkgray",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <label htmlFor="signup-email-input" style={{ display: "block" }}>
            이메일
          </label>
          <input
            id="signup-email-input"
            data-testid="signup-email-input"
            type="email"
            value={email}
            onChange={(e) => updateEmail(e.target.value)}
            style={{ height: 24, padding: "4px 8px", fontSize: 16 }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <label htmlFor="signup-password-input" style={{ display: "block" }}>
            비밀번호
          </label>
          <input
            id="signup-password-input"
            data-testid="signup-password-input"
            type="password"
            value={password}
            onChange={(e) => updatePassword(e.target.value)}
            style={{ height: 24, padding: "4px 8px", fontSize: 16 }}
          />
        </div>
        <button
          style={{ height: 48, marginTop: 4 }}
          id="signup-button"
          data-testid="signup-button"
          disabled={!submitAvailable}
          onClick={async () => {
            await authApi.signUpApi({ email, password });
            navigate("/signin");
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
