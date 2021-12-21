import { Url } from '../interfaces/common';

export const checkUrl = (url: Url) => {
  const stringUrl = String(url);

  return stringUrl.startsWith('http://') || stringUrl.startsWith('https://');
};
