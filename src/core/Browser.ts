import { Request } from './Request';
import {
  QczaHttpRequest,
  QczaHttpResponse,
  RequestParams,
} from '../interfaces/request';
import { setHeaders } from '../utils/headers';
import { prepareResponse } from '../utils/response';
import { prepareError } from '../utils/error';
import { ErrorType } from '../interfaces/error';

export class Browser extends Request {
  public request<T>(params: RequestParams): QczaHttpRequest<T> {
    const {
      method,
      url,
      headers,
      username,
      password,
      body,
      timeout,
      onProgress,
      async = true,
    } = params;

    const xhr = new XMLHttpRequest();

    xhr.open(method, url, async, password, username);

    if (typeof timeout !== 'undefined') {
      xhr.timeout = timeout;
    }

    if (headers) {
      setHeaders(xhr, headers);
    }

    xhr.send(body);

    if (onProgress) {
      xhr.onprogress = onProgress;
    }

    const request = new Promise<QczaHttpResponse<T>>((resolve, reject) => {
      xhr.onload = () => resolve(prepareResponse<T>(params, xhr));
      xhr.onabort = () => reject(prepareError(ErrorType.ABORT, params, xhr));
      xhr.ontimeout = () =>
        reject(prepareError(ErrorType.TIMEOUT, params, xhr));
      xhr.onerror = () => reject(prepareError(ErrorType.NETWORK, params, xhr));
    });

    return {
      request,
      abort: () => xhr.abort(),
    };
  }
}
