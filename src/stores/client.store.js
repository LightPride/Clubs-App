import { makeAutoObservable } from 'mobx';
import { clientService } from '../api/clients';

class ClientStore {
  clientList = [];
  currentClient = {};

  constructor() {
    makeAutoObservable(this);
  }

  setClientList(data) {
    this.clientList = data;
  }

  setCurrentClient(data) {
    this.currentClient = data;
  }

  async fetchClients(clubId) {
    const data = await clientService.fetchClients();
    const filteredData = data.filter(client => client.clubId === clubId);
    this.setClientList(filteredData);
  }

  async fetchClient(clientId) {
    const data = await clientService.fetchClient(clientId);
    this.setCurrentClient(data);
  }

  async createOrUpdateClient(id, data) {
    await clientService.createOrUpdateClient(id, data);
  }

  async deleteClient(clientId) {
    this.clientList = this.clientList.filter(client => client.id !== clientId);
    await clientService.deleteClient(clientId);
  }
}

export const clientStore = new ClientStore();
