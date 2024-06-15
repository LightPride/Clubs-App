import { api } from './instance';

class ClubService {
  constructor() {
    this.CLUBS_PATH = '/clubs';
  }

  fetchClubs = async () => {
    const response = await api.get(this.CLUBS_PATH);
    return response?.data;
  };

  fetchClub = async id => {
    const response = await api.get(`${this.CLUBS_PATH}/${id}`);
    return response?.data;
  };

  createOrUpdateClub = async (id, data) => {
    return !id
      ? await api.post(this.CLUBS_PATH, data)
      : await api.patch(`${this.CLUBS_PATH}/${id}`, data);
  };

  deleteClub = async id => {
    return await api.delete(`${this.CLUBS_PATH}/${id}`);
  };
}

export const clubService = new ClubService();
