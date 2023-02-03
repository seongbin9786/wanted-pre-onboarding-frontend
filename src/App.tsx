import { useState } from "react";
import { SignInPage } from "./pages/SignInpage";
import { SignUpPage } from "./pages/SignUpPage";

export function App() {
  const [accessToken, setAccessToken] = useState("");
  return (
    <div>
      <h1>Under App.tsx</h1>
      <p>current AccessToken: [{accessToken}]</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
        }}
      >
        <SignUpPage setAccessToken={setAccessToken} />
        <SignInPage setAccessToken={setAccessToken} />
      </div>
    </div>
  );
}
