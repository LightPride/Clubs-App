import { fetchClients } from '../../api/index.js';

function ClientsList(id) {
  fetchClients(function (data) {
    if (data) {
      renderClients(data, id);
    } else {
      return;
    }
  });

  return $('<div id="clientsList" class="list-group"></div>');
}

function filterClients(clients, id) {
  var filteredClients = clients.filter(function (client) {
    return client.club === id;
  });
  return filteredClients;
}

function renderClients(clients, id) {
  var filteredClients = filterClients(clients, id);

  for (var i = 0; i < filteredClients.length; i += 1) {
    var client = filteredClients[i];

    $('#clientsList').append(
      $('<a href="#" class="list-group-item list-group-item-action"></a>')
        .append(
          $(
            '<h5 class="mb-1">' +
              client.firstName +
              ' ' +
              client.lastName +
              '</h5>'
          )
        )
        .append($('<p class="mb-1">I am a teapot</p>'))
    );
  }
}

export default ClientsList;
