import { Config } from '../interfaces/config';
import { Request } from './Request';
import { Browser } from './Browser';
import {
  Body,
  HttpMethods,
  QczaHttpRequest,
  RequestParams,
  QczaHttpResponse, OnErrorHelper, OnSuccessHelper, BeforeRequestHelper,
} from '../interfaces/request';
import { Url } from '../interfaces/common';
import { checkUrl } from '../utils/url';
import { Error } from '../interfaces/error';

export type QczaHttpRequestParams = Omit<
  RequestParams,
  'method' | 'url' | 'body' | 'timeout'
>;

interface HttpInterface {
  post<T>(
    url: Url,
    body?: Body,
    params?: QczaHttpRequestParams
  ): QczaHttpRequest<T>;
  put<T>(
    url: Url,
    body?: Body,
    params?: QczaHttpRequestParams
  ): QczaHttpRequest<T>;
  get<T>(url: Url, params?: QczaHttpRequestParams): QczaHttpRequest<T>;
  delete<T>(
    url: Url,
    body?: Body,
    params?: QczaHttpRequestParams
  ): QczaHttpRequest<T>;
  patch<T>(
    url: Url,
    body?: Body,
    params?: QczaHttpRequestParams
  ): QczaHttpRequest<T>;
  options<T>(url: Url, params?: QczaHttpRequestParams): QczaHttpRequest<T>;
  trace<T>(url: Url, params?: QczaHttpRequestParams): QczaHttpRequest<T>;
  head<T>(url: Url, params?: QczaHttpRequestParams): QczaHttpRequest<T>;
  connect<T>(url: Url, params?: QczaHttpRequestParams): QczaHttpRequest<T>;
  onError: OnErrorHelper;
  onSuccess: OnSuccessHelper;
  beforeRequest: BeforeRequestHelper;
}

export class Http implements HttpInterface {
  constructor(config?: Config) {
    this.client = new Browser();
    this.config = config;
  }

  private readonly client: Request;

  private readonly config?: Config;

  public onError()

  private createBodyRequest = (method: HttpMethods) => <T>(
    url: Url,
    body?: Body,
    params?: QczaHttpRequestParams
  ): QczaHttpRequest<T> => {
    const baseUrl = this.config?.baseUrl;
    const timeout = this.config?.timeout;
    const isFullUrl = checkUrl(url);

    return this.client.request<T>({
      ...params,
      method,
      url: `${baseUrl && !isFullUrl ? `${baseUrl}/` : ''}${url}`,
      timeout,
      body,
    });
  };

  private createRequest = (method: HttpMethods) => <T>(
    url: Url,
    params?: QczaHttpRequestParams
  ) => {
    const baseUrl = this.config?.baseUrl;
    const timeout = this.config?.timeout;
    const isFullUrl = checkUrl(url);

    return this.client.request<T>({
      ...params,
      method,
      url: `${baseUrl && !isFullUrl ? `${baseUrl}/` : ''}${url}`,
      timeout,
    });
  };

  public post = this.createBodyRequest(HttpMethods.POST);

  public put = this.createBodyRequest(HttpMethods.PUT);

  public get = this.createRequest(HttpMethods.GET);

  public delete = this.createBodyRequest(HttpMethods.DELETE);

  public patch = this.createBodyRequest(HttpMethods.PATCH);

  public options = this.createRequest(HttpMethods.OPTIONS);

  public trace = this.createRequest(HttpMethods.TRACE);

  public head = this.createRequest(HttpMethods.HEAD);

  public connect = this.createRequest(HttpMethods.CONNECT);
}
