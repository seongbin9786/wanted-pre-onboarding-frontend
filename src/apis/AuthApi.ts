import { AbstractApi } from "./AbstractApi";

export interface SignupFormData {
  email: string;
  password: string;
}

export interface SigninFormData {
  email: string;
  password: string;
}

interface SignInApiResponse {
  acess_token: string;
}

export class AuthApi extends AbstractApi {
  async signInApi(signInFormData: SigninFormData) {
    const url = "/auth/signin";
    const response = await this.request<SignInApiResponse>(
      "post",
      url,
      signInFormData
    );
    return response.acess_token;
  }

  async signUpApi(signupFormData: SignupFormData) {
    const url = "/auth/signup";
    await this.request("post", url, signupFormData);
  }
}
