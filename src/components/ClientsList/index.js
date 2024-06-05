import { deleteClient, fetchClients } from '../../api/clients.js';

function ClientsList(clubId) {
  var parentNode = $('<div id="clientsList" class="list-group"></div>');
  fetchClients(function (data) {
    handleFetchClients(data, clubId, parentNode);
  });

  return parentNode;
}

function handleFetchClients(data, clubId, parentNode) {
  if (data) {
    renderClients(data, clubId, parentNode);
  } else {
    return;
  }
}

function renderClients(clients, clubId, parentNode) {
  parentNode.html('');

  clients.forEach(function (client) {
    if (client.clubId === clubId) {
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
                fetchClients(function (data) {
                  handleFetchClients(data, clubId, parentNode);
                });
              });
            }
          )
        );
      parentNode.append(clientCard);
    }
  });
}

export default ClientsList;
