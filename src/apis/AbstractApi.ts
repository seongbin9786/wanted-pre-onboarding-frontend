import { BackendErrorResponse } from '../server';

export class AbstractApi {
  private readonly accessToken: string;
  private readonly baseUrl: string;

  constructor(baseUrl: string, accessToken?: string) {
    this.baseUrl = baseUrl;
    this.accessToken = accessToken || '';
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

    // bugfix: response body가 없는 경우 오류 발생함
    try {
      const text = await response.text();
      return JSON.parse(text) as T;
    } catch (err) {
      // TODO: T 제거
      return null as T;
    }
  }

  private createFetchConfig(requestMethod: string, inputData: object | null) {
    const config: RequestInit = {
      method: requestMethod,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (inputData) {
      config['body'] = JSON.stringify(inputData);
    }

    if (this.accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${this.accessToken}`,
      };
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
