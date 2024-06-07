import ClientsList from '../components/ClientsList/index.js';

function ClientsPage(clubId) {
  return $('<div></div>')
    .append(
      $(
        '<a href="#clubs/' +
          clubId +
          '/clients/create" class="btn btn-primary ms-auto me-auto mb-5">Create Client</a>'
      )
    )
    .append(ClientsList(clubId));
}

export default ClientsPage;
