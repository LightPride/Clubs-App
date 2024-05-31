import { createClub, fetchClub, updateClub } from '../../api/clubs.js';
import validateClubForm from '../../utils/clubFormValidation.js';

function ClubsForm(clubId) {
  var form = $('<form id="clubForm"></form>');
  var nameInput = $(
    '<div class="mb-3"><label for="clubName" class="form-label">Club Name<input type="text" id="clubName" class="form-control"></label><div id="clubNameCheck" class="form-text"></div></div>'
  );
  var locationInput = $(
    '<div class="mb-3"><label for="clubLocation" class="form-label">Club location<input type="text" id="clubLocation" class="form-control"></label><div id="clubLocationCheck" class="form-text"></div></div>'
  );
  var button = $(
    '<button "type="submit" class="btn btn-primary">Submit</button>'
  );

  if (clubId) {
    fetchClub(clubId, function (club) {
      nameInput[0].children[0].children[0].value = club.name;
      locationInput[0].children[0].children[0].value = club.location;
    });
  }

  function onSubmit(event) {
    event.preventDefault();

    var clubNameValue = event.currentTarget[0].value;
    var clubLocationValue = event.currentTarget[1].value;
    if (!validateClubForm(clubNameValue, clubLocationValue)) {
      return;
    }

    var data = {
      name: clubNameValue.trim(),
      location: clubLocationValue.trim(),
    };
    if (clubId) {
      updateClub(clubId, data);
    } else {
      createClub(data);
    }
    window.location.hash = '#clubs';
  }

  return form
    .on('submit', onSubmit)
    .append(nameInput)
    .append($(locationInput))
    .append($(button));
}

export default ClubsForm;
