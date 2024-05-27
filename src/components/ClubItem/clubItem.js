import { fetchClub } from '../../api/index.js';

function ClubItem(clubId) {
  fetchClub(clubId, function (data) {
    if (data) {
      renderClub(data);
    } else {
      return;
    }
  });
  return $('<div id="clubcard" class="card" style="width: 18rem;"></div>');
}

function renderClub(club) {
  var clubInfo =
    '<div class="card-body" id="' +
    club.id +
    '">' +
    '<h5 class="card-title">' +
    club.name +
    '</h5>' +
    '<p class="card-text">' +
    club.location +
    '</p >' +
    '<p class="card-text">Im a teapot</p >' +
    '</div >';
  $('#clubcard').append($(clubInfo));
}

export default ClubItem;
