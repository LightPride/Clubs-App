import { api } from './instance';

class ClubService {
  #CLUBS_PATH = '/clubs';

  async fetchClubs() {
    const response = await api.get(this.#CLUBS_PATH);
    return response?.data;
  }

  async fetchClub(id) {
    const response = await api.get(`${this.#CLUBS_PATH}/${id}`);
    return response?.data;
  }

  async createOrUpdateClub(id, data) {
    const response = !id
      ? await api.post(this.#CLUBS_PATH, data)
      : await api.patch(`${this.#CLUBS_PATH}/${id}`, data);
    return response?.data;
  }

  async deleteClub(id) {
    return await api.delete(`${this.#CLUBS_PATH}/${id}`);
  }
}

export const clubService = new ClubService();
