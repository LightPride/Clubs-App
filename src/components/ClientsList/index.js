import { clientService } from '../../api/clients';
import { toast } from '../AlertToast';

export class ClientsList {
  #parentNode = $(`<div id="clientsList" class="list-group"></div>`);

  constructor(clubId) {
    this.clubId = clubId;
  }

  render = () => {
    this.#handleFetchClients();
    return $('<div></div>')
      .append(
        $(
          `<a href="#clubs/${this.clubId}/clients/create" class="btn btn-primary ms-auto me-auto mb-5">Create Client</a>`
        )
      )
      .append(this.#parentNode);
  };

  #handleFetchClients = async () => {
    const clients = await clientService.fetchClients();
    this.#renderClients(clients);
  };

  #renderClients = (clients = []) => {
    this.#parentNode.html('');
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
                toast.show(
                  `Client: ${response.data.firstName} ${response.data.lastName}, successfully deleted!`,
                  'success'
                );
              });
              this.#handleFetchClients();
            })
          );
        this.#parentNode.append(clientCard);
      }
    });
  };
}
