import InstanceAPI from './instance.js';

var CLUBS_PATH = '/clubs';

export function fetchClubs(callback) {
  InstanceAPI.get(callback, CLUBS_PATH);
}

export function fetchClub(id, callback) {
  InstanceAPI.get(callback, CLUBS_PATH + '/' + id);
}

export function createClub(data, callback) {
  InstanceAPI.post(callback, data, CLUBS_PATH);
}

export function updateClub(id, data, callback) {
  InstanceAPI.patch(callback, data, CLUBS_PATH + '/' + id);
}

export function deleteClub(id, callback) {
  InstanceAPI.delete(callback, CLUBS_PATH + '/' + id);
}
