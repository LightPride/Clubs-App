import { createClient, fetchClient, updateClient } from '../../api/clients.js';
import validateClientForm from '../../shared/utils/clientFormValidation.js';

function ClientForm(clubId, clientId) {
  var form = $('<form id="clubForm"></form>');
  var firstNameInput = $(
    '<div class="mb-3"><label for="firstName" class="form-label">First Name<input type="text" name="firstName" id="firstName" class="form-control"></label><div id="firstNameCheck" class="form-text"></div></div>'
  );
  var lastNameInput = $(
    '<div class="mb-3"><label for="lastName" class="form-label">Last Name<input type="text" name="lastName" id="lastName" class="form-control"></label><div id="lastNameCheck" class="form-text"></div></div>'
  );
  var birthDateInput = $(
    '<div class="mb-3"><label for="birthDate" class="form-label">Date of birth<input type="date" name="birthDate" id="birthDate" class="form-control"></label><div id="birthDateCheck" class="form-text"></div></div>'
  );
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

  function onSubmit(event) {
    event.preventDefault();
    var firstNameValue = event.currentTarget[0].value;
    var lastNameValue = event.currentTarget[1].value;
    var birthDateValue = event.currentTarget[2].value;

    if (!validateClientForm(firstNameValue, lastNameValue, birthDateValue)) {
      return;
    }
    var data = {
      firstName: firstNameValue.trim(),
      lastName: lastNameValue.trim(),
      birthDate: birthDateValue,
      clubId: clubId,
    };
    console.log(data);
    if (clientId) {
      updateClient(clientId, data, function () {
        window.location.hash = '#clubs/' + clubId + '/clients';
      });
    } else {
      createClient(data, function () {
        window.location.hash = '#clubs/' + clubId + '/clients';
      });
    }
  }

  return form
    .on('submit', onSubmit)
    .append(firstNameInput)
    .append($(lastNameInput))
    .append($(birthDateInput))
    .append($(button));
}

export default ClientForm;
