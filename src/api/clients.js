import InstanceAPI from './instance.js';

var CLIENTS_PATH = '/clients';

export function fetchClients(callback) {
  InstanceAPI.get(callback, CLIENTS_PATH);
}

export function fetchClient(id, callback) {
  InstanceAPI.get(callback, CLIENTS_PATH + '/' + id);
}

export function createClient(data, callback) {
  InstanceAPI.post(callback, data, CLIENTS_PATH);
}

export function updateClient(id, data, callback) {
  InstanceAPI.patch(callback, data, CLIENTS_PATH + '/' + id);
}

export function deleteClient(id, callback) {
  InstanceAPI.delete(callback, CLIENTS_PATH + '/' + id);
}
