import { BackendErrorResponse } from "../server";

export interface SignupFormData {
  email: string;
  password: string;
}

export interface SigninFormData {
  email: string;
  password: string;
}

export interface SignInApiResponse {
  acess_token: string;
}

export class AuthApi {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // TODO: 반환된 accessToken을 저장, 중복된 코드 컴포넌트화
  async signInApi(signInFormData: SigninFormData): Promise<string> {
    const response = await this.postWithBody<SignInApiResponse>(
      "/auth/signin",
      signInFormData
    );
    return response.acess_token;
  }

  async signUpApi(signupFormData: SignupFormData): Promise<void> {
    await this.postWithBody("/auth/signup", signupFormData);
  }

  private async postWithBody<T>(
    endpointUrl: string,
    inputData: object
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpointUrl}`, {
      body: JSON.stringify(inputData),
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = await this.extractBackendErrorMessage(response);
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    return response.json() as T;
  }

  private async extractBackendErrorMessage(response: Response) {
    const responseBody = await response.json();
    return (responseBody as BackendErrorResponse).message;
  }
}
