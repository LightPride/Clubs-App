import isEmpty from './isEmpty.js';

function validateClubForm(clubNameValue, clubLocationValue) {
  var errors = {
    clubNameError: '',
    clubLocationError: '',
  };

  if (isEmpty(clubNameValue)) {
    errors.clubNameError = 'This field should not be empty';
  }

  if (isEmpty(clubLocationValue)) {
    errors.clubLocationError = 'This field should not be empty';
  }

  return errors;
}

export default validateClubForm;
