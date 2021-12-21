import { Headers } from '../interfaces/request';

export const setHeaders = (xhr: XMLHttpRequest, headers: Headers) =>
  Object.entries(headers).forEach(([name, value]) =>
    xhr.setRequestHeader(name, value)
  );
