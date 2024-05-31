import InstanceAPI from './instance.js';

var PATH = 'clubs';

export function fetchClubs(callback) {
  InstanceAPI.get(callback, PATH);
}

export function fetchClub(id, callback) {
  InstanceAPI.get(callback, PATH, id);
}

export function createClub(data) {
  InstanceAPI.post(data, PATH);
}

export function updateClub(id, data) {
  InstanceAPI.patch(data, PATH, id);
}

export function deleteClub(id) {
  InstanceAPI.delete(PATH, id);
}
