import axios from "axios";
import { getTokenFromStorage } from 'utils';
import config from "./config";

const request = axios.create({
  baseURL: config.apiURL,
});

request.interceptors.request.use((request) => {
  request.metadata = { started: performance.now() };
  request.headers.Authorization = `Bearer ${getTokenFromStorage()}`;

  return request;
});

request.interceptors.response.use(
  (response) => {
    response.config.metadata.ended = performance.now();
    response.duration = Math.ceil(
      response.config.metadata.ended - response.config.metadata.started
    );
    return response;
  },
  (error) => {
    error.config.metadata.ended = performance.now();
    error.duration = Math.ceil(
      error.config.metadata.ended - error.config.metadata.started
    );
    return Promise.reject({ ...error });
  }
);

export default request;
