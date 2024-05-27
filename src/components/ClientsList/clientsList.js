import { deleteClient, fetchClients } from '../../api/index.js';

function ClientsList(clubId) {
  fetchClients(function (data) {
    if (data) {
      renderClients(data, clubId);
    } else {
      return;
    }
  });

  return $('<div id="clientsList" class="list-group"></div>');
}

function filterClients(clients, clubId) {
  var filteredClients = clients.filter(function (client) {
    return client.clubId === clubId;
  });
  return filteredClients;
}

function renderClients(clients, clubId) {
  var filteredClients = filterClients(clients, clubId);

  for (var i = 0; i < filteredClients.length; i += 1) {
    var client = filteredClients[i];

    $('#clientsList').append(
      $('<div class="list-group-item list-group-item-action"></div>')
        .append(
          $(
            '<span class="fw-bold fs-5">' +
              client.firstName +
              '</span> <span class="fw-bold fs-5">' +
              client.lastName +
              '</span>'
          )
        )
        .append($('<p class="mb-1">' + client.age + ' yrs</p>'))
        .append($('<p class="mb-1">I am a teapot</p>'))
        .append(
          $(
            '<a href="#clubs/' +
              clubId +
              '/clients/' +
              client.id +
              '/update" class="btn btn-primary me-2">Update</a>'
          )
        )
        .append(
          $('<button type="button" class="btn btn-danger">Delete</button>').on(
            'click',
            function () {
              deleteClient(client.id);
            }
          )
        )
    );
  }
}

export default ClientsList;
