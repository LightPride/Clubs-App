import InstanceAPI from './instance.js';

var PATH = 'clients';

export function fetchClients(callback) {
  InstanceAPI.get(callback, PATH);
}

export function fetchClient(id, callback) {
  InstanceAPI.get(callback, PATH, id);
}

export function createClient(data) {
  InstanceAPI.post(data, PATH);
}

export function updateClient(id, data) {
  InstanceAPI.patch(data, PATH, id);
}

export function deleteClient(id) {
  InstanceAPI.delete(PATH, id);
}
