import axios from 'axios';

import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  logout,
  handleRefreshToken,
} from '@src/utils/auth.utils';

const httpClient = axios.create({
  baseURL: 'http://localhost:5500/api/v1',
  withCredentials: true,
});

/* eslint-disable */
httpClient.interceptors.request.use(
  config => {
    if (!config.headers!['Authorization']) {
      const accessToken = getAccessToken();

      config.headers!['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// variable to make sure renew refresh token is called once
let refreshingToken: any = null;
let isLoggingOut: any = false;

httpClient.interceptors.response.use(
  response => response,
  async error => {
    const prevRequest = error?.config;

    try {
      /* !prevRequest?.sent is a custom property to avoid axios infinite loop */
      if (error?.response.status === 401 && !prevRequest?._retry) {
        prevRequest._retry = true;

        refreshingToken = refreshingToken
          ? refreshingToken
          : handleRefreshToken();
        const { data } = await refreshingToken;

        refreshingToken = null;

        if (data.accessToken) {
          setAccessToken(data.accessToken);
          prevRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        }

        return httpClient(prevRequest);
      }
    } catch (error: any) {
      if (!isLoggingOut) {
        console.log(error);
        logout();
        delete prevRequest.headers['Authorization'];
        isLoggingOut = true;
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;
