import {
  QczaHttpRequest,
  RequestHelpers,
  RequestParams,
} from '../interfaces/request';

export abstract class Request {
  public abstract request<T>(
    params: RequestParams,
    helpers: RequestHelpers
  ): QczaHttpRequest<T>;
}
