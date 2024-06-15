import { clientService } from '../../api/clients';
import { AlertToast } from '../../shared/utils/alertToast';

export class ClientsList {
  constructor(clubId) {
    this.clubId = clubId;
    this.parentNode = $(`<div id="clientsList" class="list-group"></div>`);
  }
  handleFetchClients = async () => {
    const clients = await clientService.fetchClients();
    this.renderClients(clients);
  };
  renderClients = (clients = []) => {
    this.parentNode.html('');
    clients.forEach(client => {
      if (client.clubId === this.clubId) {
        const clientCard = $(
          `<div class="list-group-item list-group-item-action"></div>`
        )
          .append(
            $(
              `<span class="fw-bold fs-5">${client.firstName}</span> <span class="fw-bold fs-5">${client.lastName}</span>`
            )
          )
          .append($(`<p class="mb-1">${client.birthDate}</p>`))
          .append($(`<p class="mb-1">I am a teapot</p>`))
          .append(
            $(
              `<a href="#clubs/${this.clubId}/clients/${client.id}/update" class="btn btn-primary me-2">Update</a>`
            )
          )
          .append(
            $(
              `<button type="button" class="btn btn-danger">Delete</button>`
            ).on('click', async () => {
              await clientService.deleteClient(client.id).then(response => {
                new AlertToast(
                  `Client: ${response.data.firstName} ${response.data.lastName}, successfully deleted!`
                ).show();
              });
              this.handleFetchClients();
            })
          );
        this.parentNode.append(clientCard);
      }
    });
  };

  render = () => {
    this.handleFetchClients();
    return $('<div></div>')
      .append(
        $(
          `<a href="#clubs/${this.clubId}/clients/create" class="btn btn-primary ms-auto me-auto mb-5">Create Client</a>`
        )
      )
      .append(this.parentNode);
  };
}
