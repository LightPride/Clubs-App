import { fetchClubs } from '../../api/index.js';

function ClubsCatalogue() {
  fetchClubs(function (data) {
    console.log(data);
    if (data) {
      console.log(data);
      renderCatalogue(data);
    } else {
      return;
    }
  });

  return '<div id="catalogue" class="row row-cols-1 row-cols-md-3 g-4"></div>';
}

function renderCatalogue(clubs) {
  var clubsList = '';
  for (var i = 0; i < clubs.length; i += 1) {
    var club = clubs[i];
    clubsList +=
      '<div> <div class="card"> <div class="card-body"><h5 class="card-title">' +
      club.name +
      '</h5> <p>' +
      club.location +
      '</p><a href="/clubs/' +
      club.id +
      ' " class="btn btn-primary">View info</a></div></div></div>';
  }

  $('#catalogue').append($(clubsList));
}

export default ClubsCatalogue;
