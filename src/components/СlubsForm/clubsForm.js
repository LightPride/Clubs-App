import { createClubs } from '../../api/index.js';

function ClubsForm() {
  var form = $('<form id="clubForm"></form>');
  var nameInput = $(
    '<div class="mb-3"><label for="clubName" class="form-label">Club Name</label><input type="text" id="clubName" class="form-control"><div id="clubNameCheck" class="form-text"></div></div>'
  );
  var locationInput = $(
    '<div class="mb-3"><label for="clubLocation" class="form-label">Club location</label><input type="text" class="form-control" id="clubLocation"><div id="clubLocationCheck" class="form-text"></div></div></div>'
  );
  var button = $(
    '<button "type="submit" class="btn btn-primary">Submit</button>'
  );

  return form
    .on('submit', function (event) {
      event.preventDefault();
      console.log('Handler for `submit` called.');
      console.log(validateClubName());

      if (!validateClubName()) {
        return;
      }
      if (!validateClubLocation()) {
        return;
      }
      var data = {
        id: Date.now().toString(),
        name: $('#clubName').val(),
        location: $('#clubLocation').val(),
        clients: [],
      };
      console.log(data);
      createClubs(data);
    })
    .append(nameInput)
    .append($(locationInput))
    .append($(button));
}

function validateClubName() {
  let clubNameValue = $('#clubName').val();
  if (clubNameValue.length < 3 || clubNameValue.length > 10) {
    $('#clubNameCheck').show();
    $('#clubNameCheck').html('length of club name must be between 3 and 10');

    return false;
  }
  $('#clubNameCheck').hide();
  return true;
}

function validateClubLocation() {
  let clubLocationValue = $('#clubLocation').val();
  if (clubLocationValue.length < 3 || clubLocationValue.length > 10) {
    $('#clubLocationCheck').show();
    $('#clubLocationCheck').html(
      'length of club location  must be between 3 and 10'
    );

    return false;
  }
  $('#clubLocationCheck').hide();
  return true;
}

export default ClubsForm;
