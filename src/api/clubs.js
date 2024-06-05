import InstanceAPI from './instance.js';

var CLUBS_PATH = '/clubs';

export function fetchClubs(callback) {
  InstanceAPI.get(callback, CLUBS_PATH);
}

export function fetchClub(id, callback) {
  InstanceAPI.get(callback, CLUBS_PATH + '/' + id);
}

export function createOrUpdateClub(id, data, callback) {
  if (!id) {
    InstanceAPI.post(callback, data, CLUBS_PATH);
  } else {
    InstanceAPI.patch(callback, data, CLUBS_PATH + '/' + id);
  }
}

export function updateClub(id, data, callback) {
  InstanceAPI.patch(callback, data, CLUBS_PATH + '/' + id);
}

export function deleteClub(id, callback) {
  InstanceAPI.delete(callback, CLUBS_PATH + '/' + id);
}
