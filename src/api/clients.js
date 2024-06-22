import { api } from './instance';

class ClientService {
  #CLIENTS_PATH = '/clients';

  async fetchClients() {
    const response = await api.get(this.#CLIENTS_PATH);
    return response?.data;
  }

  async fetchClient(id) {
    const response = await api.get(`${this.#CLIENTS_PATH}/${id}`);
    return response?.data;
  }

  async createOrUpdateClient(id, data) {
    const response = !id
      ? await api.post(this.#CLIENTS_PATH, data)
      : await api.patch(`${this.#CLIENTS_PATH}/${id}`, data);
    return response?.data;
  }

  async deleteClient(id) {
    return await api.delete(`${this.#CLIENTS_PATH}/${id}`);
  }
}

export const clientService = new ClientService();
