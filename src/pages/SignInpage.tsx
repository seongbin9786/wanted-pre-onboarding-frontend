import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../apis/AuthApi";

interface SignInPageProps {
  authApi: AuthApi;
  setAccessToken: (accessToken: string) => void;
}

export function SignInPage({ authApi, setAccessToken }: SignInPageProps) {
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
      <h1>로그인 폼</h1>
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
          <label htmlFor="signin-email-input" style={{ display: "block" }}>
            이메일
          </label>
          <input
            id="signin-email-input"
            data-testid="signin-email-input"
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
          <label htmlFor="signin-password-input" style={{ display: "block" }}>
            비밀번호
          </label>
          <input
            id="signin-password-input"
            data-testid="signin-password-input"
            type="password"
            value={password}
            onChange={(e) => updatePassword(e.target.value)}
            style={{ height: 24, padding: "4px 8px", fontSize: 16 }}
          />
        </div>
        <button
          style={{ height: 48, marginTop: 4 }}
          id="signin-button"
          data-testid="signin-button"
          disabled={!submitAvailable}
          onClick={async () => {
            const accessToken = await authApi.signInApi({ email, password });
            setAccessToken(accessToken);
            navigate("/todo");
            localStorage.setItem("accessToken", accessToken);
          }}
        >
          로그인
        </button>
      </div>
    </div>
  );
}
