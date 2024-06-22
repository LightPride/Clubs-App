import { isEmpty } from './isEmpty';

export const validateClubForm = (clubNameValue, clubLocationValue) => {
  const errors = {
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
};
