import ClientsList from '../components/ClientsList/clientsList.js';

function ClientsPage(id) {
  return $('<div></div>')
    .append(
      $(
        '<a href="#clubs/' +
          id +
          '/clients/create" class="btn btn-primary ms-auto me-auto mb-5">Create Client</a>'
      )
    )
    .append($(ClientsList(id)));
}

export default ClientsPage;
