import { clubService } from '../../api/clubs';
import { validateClubForm } from '../../shared/utils/clubFormValidation';
import { toast } from '../AlertToast';

export class ClubsForm {
  #form = $(`<form id="clubForm"></form>`);
  #nameInput = $(
    `<div class="mb-3"><label for="clubName" class="form-label">Club Name<input type="text" id="clubName" class="form-control"></label></div>`
  );
  #locationInput = $(
    `<div class="mb-3"><label for="clubLocation" class="form-label">Club location<input type="text" id="clubLocation" class="form-control"></label></div>`
  );
  #nameCheck = $(`<div id="clubNameCheck" class="form-text"></div>`);
  #locationCheck = $(`<div id="clubLocationCheck" class="form-text"></div>`);
  #button = $(`<button "type="submit" class="btn btn-primary">Submit</button>`);

  constructor(clubId) {
    if (clubId) {
      this.clubId = clubId;
      this.#handleFetchClub();
    }
  }

  render = () => {
    return this.#form
      .on('submit', this.#onSubmit)
      .append(this.#nameInput.append(this.#nameCheck))
      .append(this.#locationInput.append(this.#locationCheck))
      .append(this.#button);
  };

  async #handleFetchClub() {
    const club = await clubService.fetchClub(this.clubId);
    $('#clubName').val(club.name);
    $('#clubLocation').val(club.location);
  }

  #handleErrors = (clubNameValue, clubLocationValue) => {
    const validationErrors = validateClubForm(clubNameValue, clubLocationValue);

    this.#nameCheck
      .html(validationErrors.clubNameError)
      .toggle(Boolean(validationErrors.clubNameError));
    this.#locationCheck
      .html(validationErrors.clubLocationError)
      .toggle(Boolean(validationErrors.clubLocationError));

    return validationErrors.clubNameError || validationErrors.clubLocationError;
  };

  #onSubmit = async event => {
    event.preventDefault();

    const clubNameValue = event.currentTarget[0].value;
    const clubLocationValue = event.currentTarget[1].value;

    if (this.#handleErrors(clubNameValue, clubLocationValue)) {
      return;
    }

    const data = {
      name: clubNameValue.trim(),
      location: clubLocationValue.trim(),
    };

    const club = await clubService.createOrUpdateClub(this.clubId, data);
    toast.showSuccess(
      `Club: ${club.name}, successfully ${this.clubId ? `updated` : `created`}!`
    );

    window.location.hash = '#clubs';
  };
}
