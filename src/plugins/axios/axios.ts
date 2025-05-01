import axios, { isAxiosError } from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';

import { showNotification } from '../notifications';

declare module 'axios' {
  export interface AxiosRequestConfig {
    errorMessage?: string;
    skipErrorNotification?: boolean;
  }
}

axios.defaults.baseURL = 'http://localhost:3001';

axios.defaults.timeout = 15000;

axios.defaults.paramsSerializer = params => {
  const copyParams = { ...params };
  Object.keys(copyParams).forEach(key => {
    if (copyParams[key] === '') {
      delete copyParams[key];
    }
  });

  return stringify(copyParams, { skipNulls: true, arrayFormat: 'repeat' });
};

axios.interceptors.response.use(
  response => {
    const warningMessage: unknown = response.data?.data?.warning;
    if (typeof warningMessage === 'string' && warningMessage) {
      showNotification({ text: warningMessage, type: 'warning' });
    }
    return response;
  },
  async (error: AxiosError) => {
    if (error.config?.skipErrorNotification) {
      return Promise.reject(error);
    }

    const config = error.config as AxiosRequestConfig;
    let errorMessage = config.errorMessage;

    if (isAxiosError<{ error: { msg: string } }>(error) && error.response?.status === 400) {
      errorMessage = error.response?.data.error.msg ?? errorMessage;
    }

    if (errorMessage) {
      showNotification({ text: errorMessage, type: 'error' });
    }

    return Promise.reject(error);
  }
);

export { axios };
