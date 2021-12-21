import { QczaHttpResponse, RequestParams } from '../interfaces/request';

export const prepareResponse = <T>(
  request: RequestParams,
  { status, statusText, response }: XMLHttpRequest
): QczaHttpResponse<T> => ({
  request,
  status,
  statusText,
  response,
});
