import axios from 'axios';
import { HttpCodes } from '@shared/constants';
import { toast } from 'react-toastify';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.response.use(undefined, (error) => {
  if (error?.code === 'ERR_NETWORK') {
    toast.error("Server is not responding, check if it's enabled!");
  }
  if (error?.response?.status === HttpCodes.INTERNAL_SERVER_ERROR) {
    toast.error('Server error - check the terminal for more info');
  }
});
