import { createOrUpdateClub, fetchClub } from '../../api/clubs.js';
import validateClubForm from '../../shared/utils/clubFormValidation.js';

function ClubsForm(clubId) {
  var form = $('<form id="clubForm"></form>');
  var nameInput = $(
    '<div class="mb-3"><label for="clubName" class="form-label">Club Name<input type="text" id="clubName" class="form-control"></label></div>'
  );

  var locationInput = $(
    '<div class="mb-3"><label for="clubLocation" class="form-label">Club location<input type="text" id="clubLocation" class="form-control"></label></div>'
  );

  var nameCheck = $('<div id="clubNameCheck" class="form-text"></div>');

  var locationCheck = $('<div id="clubLocationCheck" class="form-text"></div>');

  var button = $(
    '<button "type="submit" class="btn btn-primary">Submit</button>'
  );

  if (clubId) {
    fetchClub(clubId, function (club) {
      nameInput[0].children[0].children[0].value = club.name;
      locationInput[0].children[0].children[0].value = club.location;
    });
  }

  function handleErrors(clubNameValue, clubLocationValue) {
    var validationErrors = validateClubForm(clubNameValue, clubLocationValue);

    nameCheck
      .html(validationErrors.clubNameError)
      .toggle(!!validationErrors.clubNameError);
    locationCheck
      .html(validationErrors.clubLocationError)
      .toggle(!!validationErrors.clubLocationError);

    return validationErrors.clubNameError || validationErrors.clubLocationError;
  }

  function onSubmit(event) {
    event.preventDefault();

    var clubNameValue = event.currentTarget[0].value;
    var clubLocationValue = event.currentTarget[1].value;

    if (handleErrors(clubNameValue, clubLocationValue)) {
      return;
    }

    var data = {
      name: clubNameValue.trim(),
      location: clubLocationValue.trim(),
    };

    createOrUpdateClub(clubId, data, function () {
      window.location.hash = '#clubs';
    });
  }

  return form
    .on('submit', onSubmit)
    .append(nameInput.append(nameCheck))
    .append(locationInput.append(locationCheck))
    .append(button);
}

export default ClubsForm;
