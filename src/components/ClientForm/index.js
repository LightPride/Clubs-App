import { createClient, fetchClient, updateClient } from '../../api/clients.js';
import validateClientForm from '../../utils/clientFormValidation.js';

function ClientForm(clubId, clientId) {
  var form = $('<form id="clubForm"></form>');
  var firstNameInput = $(
    '<div class="mb-3"><label for="firstName" class="form-label">First Name<input type="text" name="firstName" id="firstName" class="form-control"></label><div id="firstNameCheck" class="form-text"></div></div>'
  );
  var lastNameInput = $(
    '<div class="mb-3"><label for="lastName" class="form-label">Last Name<input type="text" name="lastName" id="lastName" class="form-control"></label><div id="lastNameCheck" class="form-text"></div></div>'
  );
  var ageInput = $(
    '<div class="mb-3"><label for="age" class="form-label">Age<input type="text" name="age" id="age" class="form-control"></label><div id="ageCheck" class="form-text"></div></div>'
  );
  var button = $(
    '<button "type="submit" class="btn btn-primary">Submit</button>'
  );

  if (clientId) {
    fetchClient(clientId, function (client) {
      firstNameInput[0].children[0].children[0].value = client.firstName;
      lastNameInput[0].children[0].children[0].value = client.lastName;
      ageInput[0].children[0].children[0].value = client.age;
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    var firstNameValue = event.currentTarget[0].value;
    var lastNameValue = event.currentTarget[1].value;
    var ageValue = event.currentTarget[2].value;

    if (!validateClientForm(firstNameValue, lastNameValue, ageValue)) {
      return;
    }
    var data = {
      firstName: firstNameValue.trim(),
      lastName: lastNameValue.trim(),
      age: ageValue.trim(),
      clubId: clubId,
    };
    console.log(data);
    if (clientId) {
      updateClient(clientId, data);
    } else {
      createClient(data);
    }
    window.location.hash = '#clubs/' + clubId + '/clients';
  }

  return form
    .on('submit', onSubmit)
    .append(firstNameInput)
    .append($(lastNameInput))
    .append($(ageInput))
    .append($(button));
}

export default ClientForm;
