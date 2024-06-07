import { deleteClub, fetchClubs } from '../../api/clubs.js';

function ClubsCatalogue() {
  var parentNode = $(
    '<div id="catalogue" class="row row-cols-1 row-cols-md-3 g-4"></div>'
  );

  fetchClubs(handleFetchClubs(parentNode));

  return parentNode;
}

function handleFetchClubs(parentNode) {
  return function (data) {
    if (data) {
      renderCatalogue(data, parentNode);
    }
  };
}

function renderCatalogue(clubs, parentNode) {
  parentNode.html('');
  clubs.forEach(function (club) {
    var clubCard = $('<div id="' + club.id + '"></div>').append(
      $('<div class="card"></div>').append(
        $('<div class="card-body"></div>')
          .append($('<h5 class="card-title">' + club.name + '</h5>'))
          .append($('<p>' + club.location + '</p>'))
          .append(
            $(
              '<a href="#clubs/' +
                club.id +
                '" class="btn btn-primary me-5">View info</a>'
            )
          )
          .append(
            $(
              '<a href="#clubs/' +
                club.id +
                '/clients" class="btn btn-primary me-5">View clients</a>'
            )
          )
          .append(
            $(
              '<a href="#clubs/' +
                club.id +
                '/update" class="btn btn-primary me-5">Update</a>'
            )
          )
          .append(
            $(
              '<button type="button" class="btn btn-primary">Delete</button>'
            ).on('click', function () {
              deleteClub(club.id, function () {
                fetchClubs(handleFetchClubs(parentNode));
              });
            })
          )
      )
    );
    parentNode.append(clubCard);
  });
}

export default ClubsCatalogue;
