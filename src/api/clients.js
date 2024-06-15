import { api } from './instance';

class ClientService {
  constructor() {
    this.CLIENTS_PATH = '/clients';
  }

  fetchClients = async () => {
    const response = await api.get(this.CLIENTS_PATH);
    return response?.data;
  };

  fetchClient = async id => {
    const response = await api.get(`${this.CLIENTS_PATH}/${id}`);
    return response?.data;
  };

  createOrUpdateClient = async (id, data) => {
    return !id
      ? await api.post(this.CLIENTS_PATH, data)
      : await api.patch(`${this.CLIENTS_PATH}/${id}`, data);
  };

  deleteClient = async id => {
    return await api.delete(`${this.CLIENTS_PATH}/${id}`);
  };
}

export const clientService = new ClientService();
