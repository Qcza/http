import {RequestParams} from './request';

export enum ErrorType {
  'NETWORK' = 'NETWORK',
  'ABORT' = 'ABORT',
  'TIMEOUT' = 'TIMEOUT',
}

export interface Error {
  request: RequestParams;
  type: ErrorType;
  status: number;
  statusText: string;
}
