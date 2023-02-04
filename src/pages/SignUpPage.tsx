import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackendErrorResponse } from "../server";

interface SignupFormData {
  email: string;
  password: string;
}

// TODO: 반환된 accessToken을 저장, 중복된 코드 컴포넌트화
async function fetchSignUp(signupFormData: SignupFormData) {
  const response = await fetch(
    "https://pre-onboarding-selection-task.shop/auth/signup",
    {
      body: JSON.stringify(signupFormData),
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  if (!response.ok) {
    const body = (await response.json()) as BackendErrorResponse;
    alert(body.message);
    return "";
  }
  const responseBody = await response.json();
  console.log(responseBody);
  return responseBody.access_token;
}

interface SignUpPageProps {
  setAccessToken: (accessToken: string) => void;
}

export function SignUpPage({ setAccessToken }: SignUpPageProps) {
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
            const accessToken = await fetchSignUp({ email, password });
            setAccessToken(accessToken);
            navigate("/signin");
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
