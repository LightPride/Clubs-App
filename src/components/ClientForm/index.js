import { createOrUpdateClient, fetchClient } from '../../api/clients.js';
import validateClientForm from '../../shared/utils/clientFormValidation.js';
import getCurrentDate from '../../shared/utils/getCurrentDate.js';

function ClientForm(clubId, clientId) {
  var form = $('<form id="clubForm"></form>');
  var firstNameInput = $(
    '<div class="mb-3"><label for="firstName" class="form-label">First Name<input type="text" name="firstName" id="firstName" class="form-control"></label></div>'
  );

  var lastNameInput = $(
    '<div class="mb-3"><label for="lastName" class="form-label">Last Name<input type="text" name="lastName" id="lastName" class="form-control"></label></div>'
  );

  var birthDateInput = $(
    '<div class="mb-3"><label for="birthDate" class="form-label">Date of birth<input type="date" min="1900-01-01" max="' +
      getCurrentDate() +
      '" name="birthDate" id="birthDate" class="form-control"></label></div>'
  );

  var firstNameCheck = $('<div id="firstNameCheck" class="form-text"></div>');

  var lastNameCheck = $('<div id="lastNameCheck" class="form-text"></div>');

  var birthDateCheck = $('<div id="birthDateCheck" class="form-text"></div>');

  var button = $(
    '<button "type="submit" class="btn btn-primary">Submit</button>'
  );

  if (clientId) {
    fetchClient(clientId, function (client) {
      firstNameInput[0].children[0].children[0].value = client.firstName;
      lastNameInput[0].children[0].children[0].value = client.lastName;
      birthDateInput[0].children[0].children[0].value = client.birthDate;
    });
  }

  function handleErrors(firstNameValue, lastNameValue, birthDateValue) {
    var validationErrors = validateClientForm(
      firstNameValue,
      lastNameValue,
      birthDateValue
    );

    firstNameCheck
      .html(validationErrors.firstNameError)
      .toggle(!!validationErrors.firstNameError);
    lastNameCheck
      .html(validationErrors.lastNameError)
      .toggle(!!validationErrors.lastNameError);
    birthDateCheck
      .html(validationErrors.birthDateError)
      .toggle(!!validationErrors.birthDateError);

    return (
      validationErrors.firstNameError ||
      validationErrors.lastNameError ||
      validationErrors.birthDateError
    );
  }

  function onSubmit(event) {
    event.preventDefault();
    var firstNameValue = event.currentTarget[0].value;
    var lastNameValue = event.currentTarget[1].value;
    var birthDateValue = event.currentTarget[2].value;

    if (handleErrors(firstNameValue, lastNameValue, birthDateValue)) {
      return;
    }
    var data = {
      firstName: firstNameValue.trim(),
      lastName: lastNameValue.trim(),
      birthDate: birthDateValue,
      clubId: clubId,
    };

    createOrUpdateClient(clientId, data, function () {
      window.location.hash = '#clubs/' + clubId + '/clients';
    });
  }

  return form
    .on('submit', onSubmit)
    .append(firstNameInput.append(firstNameCheck))
    .append(lastNameInput.append(lastNameCheck))
    .append(birthDateInput.append(birthDateCheck))
    .append(button);
}

export default ClientForm;
