/**
 * 백엔드에서 사용하는 오류 시 반환값(response.body)
 * - 해당 값에서 메시지를 추출해 표시
 */
interface BackendErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

/**
 * 타 Api 요청 코드의 재사용을 위한 클래스
 * - 반복되는 코드를 해당 클래스에서 정의 후 하위 클래스에서 직접 사용
 * - composition이 아니라 상속을 사용한 이유는 개발자 입장에서의 사용성 때문
 *    - AuthApi, TodoApi를 생성하기 위해 AbstractApi를 매번 생성하는 게 불편
 */
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
