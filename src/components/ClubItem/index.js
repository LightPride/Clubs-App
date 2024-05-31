import { fetchClub } from '../../api/clubs.js';

function ClubItem(clubId) {
  var parentNode = $(
    '<div id="clubcard" class="card" style="width: 18rem;"></div>'
  );
  fetchClub(clubId, function (data) {
    if (data) {
      renderClub(data, parentNode);
    } else {
      return;
    }
  });
  return parentNode;
}

function renderClub(club, parentNode) {
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
  parentNode.append($(clubInfo));
}

export default ClubItem;
