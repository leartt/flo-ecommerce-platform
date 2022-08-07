import axios from 'axios';

export const setAccessToken = (token: string) => {
  localStorage.setItem('access_token', token);
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem('refresh_token', token);
};

export const getAccessToken = () => localStorage.getItem('access_token');

export const getRefreshToken = () => localStorage.getItem('refresh_token');

export const removeTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const handleRefreshToken = () => {
  return axios.post(
    'http://localhost:5500/api/v1/auth/renew-token',
    {},
    {
      withCredentials: true,
    }
  );
};

export const logout = async () => {
  await axios.delete('http://localhost:5500/api/v1/auth/logout');
  removeTokens();
  window.location.replace('/login');
};
