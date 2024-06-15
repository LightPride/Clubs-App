import { countAge } from './countAge';
import { isEmpty } from './isEmpty';

export const validateClientForm = (
  firstNameValue,
  lastNameValue,
  birthDateValue
) => {
  const legalAge = 18;
  const age = countAge(birthDateValue);

  const errors = {
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
};
