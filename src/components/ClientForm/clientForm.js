import { createClient, fetchClient, updateClient } from '../../api/index.js';

function ClientForm(clubId, clientId) {
  if (clientId) {
    fetchClient(clientId, function (client) {
      $('#firstName').val(client.firstName);
      $('#lastName').val(client.lastName);
      $('#age').val(client.age);
    });
  }
  var form = $('<form id="clubForm"></form>');
  var firstNameInput = $(
    '<div class="mb-3"><label for="firstName" class="form-label">First Name</label><input type="text" id="firstName" class="form-control"><div id="firstNameCheck" class="form-text"></div></div>'
  );
  var lastNameInput = $(
    '<div class="mb-3"><label for="lastName" class="form-label">Last Name</label><input type="text" id="lastName" class="form-control"><div id="lastNameCheck" class="form-text"></div></div>'
  );
  var ageInput = $(
    '<div class="mb-3"><label for="age" class="form-label">Age</label><input type="text" id="age" class="form-control"><div id="ageCheck" class="form-text"></div></div>'
  );
  var button = $(
    '<button "type="submit" class="btn btn-primary">Submit</button>'
  );

  return form
    .on('submit', function (event) {
      event.preventDefault();
      if (!validateFirstName()) {
        return;
      }
      if (!validateLastName()) {
        return;
      }
      if (!validateAge()) {
        return;
      }
      var data = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        age: $('#age').val(),
        clubId: clubId,
      };
      if (clientId) {
        updateClient(clientId, data);
      } else {
        createClient(data);
      }
    })
    .append(firstNameInput)
    .append($(lastNameInput))
    .append($(ageInput))
    .append($(button));
}

function validateFirstName() {
  var firstNameValue = $('#firstName').val();
  if (firstNameValue.length === 0) {
    $('#firstNameCheck').show();
    $('#firstNameCheck').html('This field should not be empty');

    return false;
  }
  $('#firstNameCheck').hide();
  return true;
}

function validateLastName() {
  var lastNameValue = $('#lastName').val();
  if (lastNameValue.length === 0) {
    $('#lastNameCheck').show();
    $('#lastNameCheck').html('This field should not be empty');

    return false;
  }
  $('#lastNameCheck').hide();
  return true;
}

function validateAge() {
  var ageValue = $('#age').val();
  if (ageValue < 18) {
    $('#ageCheck').show();
    $('#ageCheck').html('Club member must be 18 years old');

    return false;
  }
  $('#lastNameCheck').hide();
  return true;
}

export default ClientForm;
