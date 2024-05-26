import { deleteClub, fetchClubs } from '../../api/index.js';

function ClubsCatalogue() {
  fetchClubs(function (data) {
    if (data) {
      renderCatalogue(data);
    } else {
      return;
    }
  });

  return $(
    '<div id="catalogue" class="row row-cols-1 row-cols-md-3 g-4"></div>'
  );
}

function renderCatalogue(clubs) {
  for (var i = 0; i < clubs.length; i += 1) {
    var club = clubs[i];

    $('#catalogue').append(
      $('<div id="' + club.id + '"></div>').append(
        $('<div class="card"></div>').append(
          $('<div class="card-body"></div>')
            .append($('<h5 class="card-title">' + club.name + '</h5>'))
            .append($('<p>' + club.location + '</p>'))
            .append(
              $(
                '<a href="#clubs/' +
                  club.id +
                  '" class="btn btn-primary me-5 mb-2">View info</a>'
              )
            )
            .append(
              $(
                '<a href="#clubs/' +
                  club.id +
                  '/clients" class="btn btn-primary me-5 mb-2">View clients</a>'
              )
            )
            .append(
              $(
                '<a href="#clubs/' +
                  club.id +
                  '/update" class="btn btn-primary me-5 mb-2">Update</a>'
              )
            )
            .append(
              $(
                '<button type="button" class="btn btn-primary">Delete</button>'
              ).on('click', function () {
                deleteClub(club.id);
              })
            )
        )
      )
    );
  }
}

export default ClubsCatalogue;
