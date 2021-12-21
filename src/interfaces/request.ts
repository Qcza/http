import { Error } from './error';

export enum HttpMethods {
  'POST' = 'POST',
  'PUT' = 'PUT',
  'GET' = 'GET',
  'DELETE' = 'DELETE',
  'PATCH' = 'PATCH',
  'OPTIONS' = 'OPTIONS',
  'TRACE' = 'TRACE',
  'HEAD' = 'HEAD',
  'CONNECT' = 'CONNECT',
}

export type Body = Document | BodyInit | null;

export type Headers = Record<string, string>;

export type OnSuccessHelper = <T>(
  callback: (response: QczaHttpResponse<T>) => void
) => void;

export type OnErrorHelper = (callback: (error: Error) => void) => void;
``
export type BeforeRequestHelper = (
  callback: (params: RequestParams) => RequestParams
) => RequestParams;

export interface RequestParams {
  method: HttpMethods;
  url: string;
  body?: Body;
  headers?: Headers;
  async?: boolean;
  username?: string;
  password?: string;
  timeout?: number;
  onProgress?(event: ProgressEvent): void;
}

export interface RequestHelpers {
  onSuccess: OnSuccessHelper;
  onError: OnErrorHelper;
  beforeRequest: BeforeRequestHelper;
}

export interface QczaHttpResponse<T> {
  request: RequestParams;
  status: number;
  statusText: string;
  response?: T;
}

export interface QczaHttpRequest<T> {
  request: Promise<QczaHttpResponse<T>>;
  abort(): void;
}
