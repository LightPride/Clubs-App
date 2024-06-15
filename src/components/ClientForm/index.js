import { clientService } from '../../api/clients';
import { AlertToast } from '../../shared/utils/alertToast';
import { validateClientForm } from '../../shared/utils/clientFormValidation';
import { getCurrentDate } from '../../shared/utils/getCurrentDate';

export class ClientForm {
  constructor(clubId, clientId) {
    this.clubId = clubId;
    this.clientId = clientId;
    this.form = $(`<form id="clubForm"></form>`);
    this.firstNameInput = $(
      `<div class="mb-3"><label for="firstName" class="form-label">First Name<input type="text" name="firstName" id="firstName" class="form-control"></label></div>`
    );
    this.lastNameInput = $(
      `<div class="mb-3"><label for="lastName" class="form-label">Last Name<input type="text" name="lastName" id="lastName" class="form-control"></label></div>`
    );
    this.birthDateInput = $(
      `<div class="mb-3"><label for="birthDate" class="form-label">Date of birth<input type="date" min="1900-01-01" max="${getCurrentDate()}" name="birthDate" id="birthDate" class="form-control"></label></div>`
    );
    this.firstNameCheck = $(
      `<div id="firstNameCheck" class="form-text"></div>`
    );
    this.lastNameCheck = $(`<div id="lastNameCheck" class="form-text"></div>`);
    this.birthDateCheck = $(
      `<div id="birthDateCheck" class="form-text"></div>`
    );
    this.button = $(
      `<button "type="submit" class="btn btn-primary">Submit</button>`
    );
    if (this.clientId) {
      this.handleFetchClient();
    }
  }
  handleFetchClient = async () => {
    const client = await clientService.fetchClient(this.clientId);
    this.firstNameInput[0].children[0].children[0].value = client.firstName;
    this.lastNameInput[0].children[0].children[0].value = client.lastName;
    this.birthDateInput[0].children[0].children[0].value = client.birthDate;
  };

  handleErrors = (firstNameValue, lastNameValue, birthDateValue) => {
    const validationErrors = validateClientForm(
      firstNameValue,
      lastNameValue,
      birthDateValue
    );

    this.firstNameCheck
      .html(validationErrors.firstNameError)
      .toggle(Boolean(validationErrors.firstNameError));
    this.lastNameCheck
      .html(validationErrors.lastNameError)
      .toggle(Boolean(validationErrors.lastNameError));
    this.birthDateCheck
      .html(validationErrors.birthDateError)
      .toggle(Boolean(validationErrors.birthDateError));

    return (
      validationErrors.firstNameError ||
      validationErrors.lastNameError ||
      validationErrors.birthDateError
    );
  };

  onSubmit = async event => {
    event.preventDefault();
    const firstNameValue = event.currentTarget[0].value;
    const lastNameValue = event.currentTarget[1].value;
    const birthDateValue = event.currentTarget[2].value;

    if (this.handleErrors(firstNameValue, lastNameValue, birthDateValue)) {
      return;
    }

    const data = {
      firstName: firstNameValue.trim(),
      lastName: lastNameValue.trim(),
      birthDate: birthDateValue,
      clubId: this.clubId,
    };

    await clientService
      .createOrUpdateClient(this.clientId, data)
      .then(response => {
        new AlertToast(
          `Client: ${response.data.firstName} ${response.data.lastName}, successfully ${this.clientId ? 'updated' : 'added'}!`
        ).show();
      });

    window.location.hash = `#clubs/${this.clubId}/clients`;
  };

  render = () => {
    return this.form
      .on('submit', this.onSubmit)
      .append(this.firstNameInput.append(this.firstNameCheck))
      .append(this.lastNameInput.append(this.lastNameCheck))
      .append(this.birthDateInput.append(this.birthDateCheck))
      .append(this.button);
  };
}
