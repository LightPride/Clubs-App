import { clubService } from '../../api/clubs';
import { validateClubForm } from '../../shared/utils/clubFormValidation';
import { AlertToast } from '../../shared/utils/alertToast';

export class ClubsForm {
  constructor(clubId) {
    this.clubId = clubId;
    this.form = $(`<form id="clubForm"></form>`);
    this.nameInput = $(
      `<div class="mb-3"><label for="clubName" class="form-label">Club Name<input type="text" id="clubName" class="form-control"></label></div>`
    );
    this.locationInput = $(
      `<div class="mb-3"><label for="clubLocation" class="form-label">Club location<input type="text" id="clubLocation" class="form-control"></label></div>`
    );
    this.nameCheck = $(`<div id="clubNameCheck" class="form-text"></div>`);
    this.locationCheck = $(
      `<div id="clubLocationCheck" class="form-text"></div>`
    );
    this.button = $(
      `<button "type="submit" class="btn btn-primary">Submit</button>`
    );
    if (this.clubId) {
      this.handleFetchClub();
    }
  }
  handleFetchClub = async () => {
    const club = await clubService.fetchClub(this.clubId);
    this.nameInput[0].children[0].children[0].value = club.name;
    this.locationInput[0].children[0].children[0].value = club.location;
  };

  handleErrors = (clubNameValue, clubLocationValue) => {
    const validationErrors = validateClubForm(clubNameValue, clubLocationValue);

    this.nameCheck
      .html(validationErrors.clubNameError)
      .toggle(Boolean(validationErrors.clubNameError));
    this.locationCheck
      .html(validationErrors.clubLocationError)
      .toggle(Boolean(validationErrors.clubLocationError));

    return validationErrors.clubNameError || validationErrors.clubLocationError;
  };

  onSubmit = async event => {
    event.preventDefault();

    const clubNameValue = event.currentTarget[0].value;
    const clubLocationValue = event.currentTarget[1].value;

    if (this.handleErrors(clubNameValue, clubLocationValue)) {
      return;
    }

    const data = {
      name: clubNameValue.trim(),
      location: clubLocationValue.trim(),
    };

    await clubService.createOrUpdateClub(this.clubId, data).then(response => {
      new AlertToast(
        `Club: ${response.data.name}, successfully ${this.clubId ? `updated` : `created`}!`
      ).show();
    });

    window.location.hash = '#clubs';
  };

  render = () => {
    return this.form
      .on('submit', this.onSubmit)
      .append(this.nameInput.append(this.nameCheck))
      .append(this.locationInput.append(this.locationCheck))
      .append(this.button);
  };
}
