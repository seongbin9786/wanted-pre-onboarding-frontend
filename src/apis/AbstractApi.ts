import { BackendErrorResponse } from "../server";

export class AbstractApi {
  private readonly accessToken: string;
  private readonly baseUrl: string;

  constructor(baseUrl: string, accessToken?: string) {
    this.baseUrl = baseUrl;
    this.accessToken = accessToken || "";
  }

  /**
   * 자식 클래스에서 재사용할 request 메소드
   */
  protected async request<T>(
    method: string,
    endpointUrl: string,
    inputBody: object | null
  ): Promise<T> {
    const url = `${this.baseUrl}${endpointUrl}`;
    const requestConfig = this.createFetchConfig(method, inputBody);
    const response = await fetch(url, requestConfig);

    await this.assertResponseIsOk(response);
    return response.json() as T;
  }

  private createFetchConfig(requestMethod: string, inputData: object | null) {
    const config = {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (inputData) {
      Object.defineProperty(config, "body", JSON.stringify(inputData));
    }

    if (this.accessToken) {
      Object.defineProperty(
        config.headers,
        "Authorization",
        `Bearer ${this.accessToken}`
      );
    }

    return config;
  }

  private async assertResponseIsOk(response: Response) {
    if (!response.ok) {
      const errorMessage = await this.extractBackendErrorMessage(response);
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  private async extractBackendErrorMessage(response: Response) {
    const responseBody = await response.json();
    return (responseBody as BackendErrorResponse).message;
  }
}
