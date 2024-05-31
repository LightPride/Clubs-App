import { deleteClub, fetchClubs } from '../../api/clubs.js';
import Store from '../../shared/libs/store/index.js';

function ClubsCatalogue() {
  var parentNode = $(
    '<div id="catalogue" class="row row-cols-1 row-cols-md-3 g-4"></div>'
  );
  fetchClubs(function (data) {
    if (data) {
      Store.setItems('clubs', data);
      console.log(Store.getItems('clubs'));
      renderCatalogue(Store.getItems('clubs'), parentNode);
    } else {
      return;
    }
  });

  return parentNode;
}

function renderCatalogue(clubs, parentNode) {
  clubs.map(function (club) {
    parentNode.append(
      $('<div id="' + club.id + '"></div>').append(
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
                deleteClub(club.id);
                Store.deleteItem('clubs', club.id);
              })
            )
        )
      )
    );
  });
}

// function deleteClubHandler(id, parentNode) {
//   deleteClub(id);

//   renderCatalogue(Store.getItems('clubs'), parentNode);
// }

export default ClubsCatalogue;
