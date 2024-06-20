import axios from 'axios';
import { toast } from '../components/AlertToast';
import { HttpCodes } from '../shared/constants';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.response.use(undefined, error => {
  if (error?.code === 'ERR_NETWORK') {
    toast.showError("Server is not responding, check if it's enabled!");
  }
  if (error?.response?.status === HttpCodes.NOT_FOUND) {
    window.history.replaceState(null, '', '#not-found');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
  if (error?.response?.status === HttpCodes.INTERNAL_SERVER_ERROR) {
    toast.showError('Server error - check the terminal for more info');
  }
});
