import { clubService } from '../../api/clubs';

export class ClubItem {
  constructor(clubId) {
    this.clubId = clubId;
    this.parentNode = $(
      `<div id="clubcard" class="card ms-auto me-auto" style="width: 18rem;"></div>`
    );
  }
  makeClubMarkup = async () => {
    const club = await clubService.fetchClub(this.clubId);
    if (club) {
      const clubInfo = `<div class="card-body" id="${club.id}"><h5 class="card-title">${club.name}</h5><p class="card-text">${club.location}</p><p class="card-text">Im a teapot</p></div>`;
      this.parentNode.append(clubInfo);
    }
  };
  render = () => {
    this.makeClubMarkup();
    return this.parentNode;
  };
}
