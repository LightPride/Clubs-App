import { deleteClient, fetchClients } from '../../api/clients.js';

function ClientsList(clubId) {
  var parentNode = $('<div id="clientsList" class="list-group"></div>');
  fetchClients(function (data) {
    if (data) {
      renderClients(data, clubId, parentNode);
    } else {
      return;
    }
  });

  return parentNode;
}

function filterClients(clients, clubId) {
  var filteredClients = clients.filter(function (client) {
    return client.clubId === clubId;
  });
  return filteredClients;
}

function renderClients(clients, clubId, parentNode) {
  var filteredClients = filterClients(clients, clubId);

  filteredClients.map(function (client) {
    var clientCard = $(
      '<div class="list-group-item list-group-item-action"></div>'
    )
      .append(
        $(
          '<span class="fw-bold fs-5">' +
            client.firstName +
            '</span> <span class="fw-bold fs-5">' +
            client.lastName +
            '</span>'
        )
      )
      .append($('<p class="mb-1">' + client.birthDate + '</p>'))
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
            deleteClient(client.id, function () {
              parentNode.html('');
              fetchClients(function (data) {
                if (data) {
                  renderClients(data, clubId, parentNode);
                } else {
                  return;
                }
              });
            });
          }
        )
      );
    parentNode.append(clientCard);
  });
}

export default ClientsList;
