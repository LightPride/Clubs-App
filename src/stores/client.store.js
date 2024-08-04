import { makeAutoObservable } from 'mobx';
import { clientService } from '@api/clients';

class ClientStore {
  clientList = [];
  currentClient = {};
  isLoading = false;

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
    this.isLoading = true;
    const data = await clientService.fetchClients();
    const filteredData = data.filter((client) => client.clubId === clubId);
    this.setClientList(filteredData);
    this.isLoading = false;
  }

  async fetchClient(clientId) {
    const data = await clientService.fetchClient(clientId);
    this.setCurrentClient(data);
  }

  async createOrUpdateClient(id, data) {
    await clientService.createOrUpdateClient(id, data);
  }

  async deleteClient(clientId) {
    this.clientList = this.clientList.filter(
      (client) => client.id !== clientId,
    );
    await clientService.deleteClient(clientId);
  }
}

export const clientStore = new ClientStore();
