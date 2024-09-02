import { makeAutoObservable } from 'mobx';
import { clubService } from '@api/clubs';

class ClubStore {
  clubList = [];
  currentClub = {};
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setClubList(data) {
    this.clubList = data;
  }

  setCurrentClub(data) {
    this.currentClub = data;
  }

  async fetchClub(clubId) {
    this.isLoading = true;
    const data = await clubService.fetchClub(clubId);
    this.setCurrentClub(data);
    this.isLoading = false;
  }

  async fetchClubs() {
    this.isLoading = true;
    const data = await clubService.fetchClubs();
    this.setClubList(data);
    this.isLoading = false;
  }

  async createOrUpdateClub(id, data) {
    await clubService.createOrUpdateClub(id, data);
  }

  async deleteClub(clubId) {
    this.clubList = this.clubList.filter((club) => club.id !== clubId);
    await clubService.deleteClub(clubId);
  }
}

export const clubStore = new ClubStore();
