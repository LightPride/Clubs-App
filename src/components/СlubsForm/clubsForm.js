import { createClub, fetchClub, updateClub } from '../../api/index.js';

function ClubsForm(clubId) {
  if (clubId) {
    fetchClub(clubId, function (data) {
      $('#clubName').val(data.name);
      $('#clubLocation').val(data.location);
    });
  }
  var form = $('<form id="clubForm"></form>');
  var nameInput = $(
    '<div class="mb-3"><label for="clubName" class="form-label">Club Name</label><input type="text" id="clubName" class="form-control"><div id="clubNameCheck" class="form-text"></div></div>'
  );
  var locationInput = $(
    '<div class="mb-3"><label for="clubLocation" class="form-label">Club location</label><input type="text" id="clubLocation" class="form-control"><div id="clubLocationCheck" class="form-text"></div></div>'
  );
  var button = $(
    '<button "type="submit" class="btn btn-primary">Submit</button>'
  );

  return form
    .on('submit', function (event) {
      event.preventDefault();

      if (!validateClubName()) {
        return;
      }
      if (!validateClubLocation()) {
        return;
      }
      var data = {
        name: $('#clubName').val(),
        location: $('#clubLocation').val(),
      };
      if (clubId) {
        updateClub(clubId, data);
      } else {
        createClub(data);
      }
    })
    .append(nameInput)
    .append($(locationInput))
    .append($(button));
}

function validateClubName() {
  var clubNameValue = $('#clubName').val();
  if (clubNameValue.length < 3 || clubNameValue.length > 20) {
    $('#clubNameCheck').show();
    $('#clubNameCheck').html('length of club name must be between 3 and 10');

    return false;
  }
  $('#clubNameCheck').hide();
  return true;
}

function validateClubLocation() {
  var clubLocationValue = $('#clubLocation').val();
  if (clubLocationValue.length < 3 || clubLocationValue.length > 20) {
    $('#clubLocationCheck').show();
    $('#clubLocationCheck').html(
      'length of club location must be between 3 and 10'
    );

    return false;
  }
  $('#clubLocationCheck').hide();
  return true;
}

export default ClubsForm;
