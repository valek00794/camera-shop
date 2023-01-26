import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';
import {toast} from 'react-toastify';
import {StatusCodes} from 'http-status-codes';


const ErrorStatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!ErrorStatusCodeMapping[response.status];

const ERROR_RESPONSE_MESSAGES = {
  400: 'Ошибка запроса, повторите позднее',
  401: 'Выполните вход в систему',
  404: 'Упс! Ничего не найдено'
};

const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy/';

const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      if (error.response && shouldDisplayError(error.response)) {
        toast.error(`${error.response.status} - ${ERROR_RESPONSE_MESSAGES[error.response.status as keyof typeof ERROR_RESPONSE_MESSAGES]}`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }

      throw error;
    }
  );

  return api;
};
