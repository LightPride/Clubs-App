import { makeAutoObservable } from 'mobx';
import { clubService } from '../api/clubs';

class ClubStore {
  clubList = [];
  currentClub = {};

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
    const data = await clubService.fetchClub(clubId);
    this.setCurrentClub(data);
  }

  async fetchClubs() {
    const data = await clubService.fetchClubs();
    this.setClubList(data);
  }

  async createOrUpdateClub(id, data) {
    await clubService.createOrUpdateClub(id, data);
  }

  async deleteClub(clubId) {
    this.clubList = this.clubList.filter(club => club.id !== clubId);
    await clubService.deleteClub(clubId);
  }
}

export const clubStore = new ClubStore();
