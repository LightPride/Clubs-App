import { clientService } from '../../api/clients';
import { toast } from '../AlertToast';
import { validateClientForm } from '../../shared/utils/clientFormValidation';
import { getCurrentDate } from '../../shared/utils/getCurrentDate';

export class ClientForm {
  #form = $(`<form id="clubForm"></form>`);
  #firstNameInput = $(
    `<div class="mb-3"><label for="firstName" class="form-label">First Name<input type="text" name="firstName" id="firstName" class="form-control"></label></div>`
  );
  #lastNameInput = $(
    `<div class="mb-3"><label for="lastName" class="form-label">Last Name<input type="text" name="lastName" id="lastName" class="form-control"></label></div>`
  );
  #birthDateInput = $(
    `<div class="mb-3"><label for="birthDate" class="form-label">Date of birth<input type="date" min="1900-01-01" max="${getCurrentDate()}" name="birthDate" id="birthDate" class="form-control"></label></div>`
  );
  #firstNameCheck = $(`<div id="firstNameCheck" class="form-text"></div>`);
  #lastNameCheck = $(`<div id="lastNameCheck" class="form-text"></div>`);
  #birthDateCheck = $(`<div id="birthDateCheck" class="form-text"></div>`);
  #button = $(`<button "type="submit" class="btn btn-primary">Submit</button>`);

  constructor(clubId, clientId) {
    this.clubId = clubId;
    if (clientId) {
      this.clientId = clientId;
      this.#handleFetchClient();
    }
  }

  render = () => {
    return this.#form
      .on('submit', this.#onSubmit)
      .append(this.#firstNameInput.append(this.#firstNameCheck))
      .append(this.#lastNameInput.append(this.#lastNameCheck))
      .append(this.#birthDateInput.append(this.#birthDateCheck))
      .append(this.#button);
  };

  async #handleFetchClient() {
    const client = await clientService.fetchClient(this.clientId);
    $('#firstName').val(client.firstName);
    $('#lastName').val(client.lastName);
    $('#birthDate').val(client.birthDate);
  }

  #handleErrors = (firstNameValue, lastNameValue, birthDateValue) => {
    const validationErrors = validateClientForm(
      firstNameValue,
      lastNameValue,
      birthDateValue
    );

    this.#firstNameCheck
      .html(validationErrors.firstNameError)
      .toggle(Boolean(validationErrors.firstNameError));
    this.#lastNameCheck
      .html(validationErrors.lastNameError)
      .toggle(Boolean(validationErrors.lastNameError));
    this.#birthDateCheck
      .html(validationErrors.birthDateError)
      .toggle(Boolean(validationErrors.birthDateError));

    return (
      validationErrors.firstNameError ||
      validationErrors.lastNameError ||
      validationErrors.birthDateError
    );
  };

  #onSubmit = async event => {
    event.preventDefault();
    const firstNameValue = event.currentTarget[0].value;
    const lastNameValue = event.currentTarget[1].value;
    const birthDateValue = event.currentTarget[2].value;

    if (this.#handleErrors(firstNameValue, lastNameValue, birthDateValue)) {
      return;
    }

    const data = {
      firstName: firstNameValue.trim(),
      lastName: lastNameValue.trim(),
      birthDate: birthDateValue,
      clubId: this.clubId,
    };

    const client = await clientService.createOrUpdateClient(
      this.clientId,
      data
    );

    toast.showSuccess(
      `Client: ${client.firstName} ${client.lastName}, successfully ${this.clientId ? 'updated' : 'added'}!`
    );

    window.location.hash = `#clubs/${this.clubId}/clients`;
  };
}
