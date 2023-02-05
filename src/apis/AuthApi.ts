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
  access_token: string;
}

export class AuthApi extends AbstractApi {
  async signInApi(form: SigninFormData) {
    const url = "/auth/signin";
    const response = await this.request<SignInApiResponse>("post", url, form);
    console.log(response.access_token);
    return response.access_token;
  }

  async signUpApi(form: SignupFormData) {
    const url = "/auth/signup";
    await this.request("post", url, form);
  }
}
