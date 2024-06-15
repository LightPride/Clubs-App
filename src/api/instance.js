import axios from 'axios';
import { AlertToast } from '../shared/utils/alertToast';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.response.use(undefined, error => {
  if (error?.code === 'ERR_NETWORK') {
    new AlertToast("Server is not responding, check if it's enabled!").show();
  }
  if (error?.response?.status === 404) {
    window.history.replaceState(null, '', '#not-found');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
  if (error?.response?.status === 500) {
    new AlertToast('Server error - check the terminal for more info').show();
  }
});
