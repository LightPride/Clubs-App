function validateClientForm(firstNameValue, lastNameValue, ageValue) {
  var firstNameCheck = $('#firstNameCheck');
  var lastNameCheck = $('#lastNameCheck');
  var ageCheck = $('#birthDateCheck');
  if (firstNameValue.trim().length === 0) {
    firstNameCheck.show();
    firstNameCheck.html('This field should not be empty');

    return false;
  }
  firstNameCheck.hide();

  if (lastNameValue.trim().length === 0) {
    lastNameCheck.show();
    lastNameCheck.html('This field should not be empty');

    return false;
  }
  lastNameCheck.hide();
  console.log(ageValue);
  var diff = Date.now() - new Date(ageValue).getTime();
  var age = new Date(diff).getUTCFullYear() - 1970;

  if (ageValue.length === 0) {
    ageCheck.show();
    ageCheck.html('This field should not be empty');
    return false;
  } else if (age < 18) {
    ageCheck.html('Club member must be 18 years old');
    return false;
  }
  ageCheck.hide();

  return true;
}

export default validateClientForm;
