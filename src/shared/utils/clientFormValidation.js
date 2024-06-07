import countAge from './countAge.js';
import isEmpty from './isEmpty.js';

function validateClientForm(firstNameValue, lastNameValue, birthDateValue) {
  var legalAge = 18;
  var age = countAge(birthDateValue);

  var errors = {
    firstNameError: '',
    lastNameError: '',
    birthDateError: '',
  };

  if (isEmpty(firstNameValue)) {
    errors.firstNameError = 'This field should not be empty';
  }

  if (isEmpty(lastNameValue)) {
    errors.lastNameError = 'This field should not be empty';
  }

  if (isEmpty(birthDateValue)) {
    errors.birthDateError = 'This field should not be empty';
  } else if (age < legalAge) {
    errors.birthDateError = 'Club member must be 18 years old';
  }

  return errors;
}

export default validateClientForm;
