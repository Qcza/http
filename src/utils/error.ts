import { Error, ErrorType } from '../interfaces/error';
import { RequestParams } from '../interfaces/request';

export const prepareError = (
  type: ErrorType,
  request: RequestParams,
  { status, statusText }: XMLHttpRequest
): Error => ({
  type,
  request,
  status,
  statusText,
});
