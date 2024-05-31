function validateClientForm(firstNameValue, lastNameValue, ageValue) {
  if (firstNameValue.trim().length === 0) {
    $('#firstNameCheck').show();
    $('#firstNameCheck').html('This field should not be empty');

    return false;
  }
  $('#firstNameCheck').hide();

  if (lastNameValue.trim().length === 0) {
    $('#lastNameCheck').show();
    $('#lastNameCheck').html('This field should not be empty');

    return false;
  }
  $('#lastNameCheck').hide();

  if (
    isNaN(ageValue) ||
    Number.parseInt(ageValue) < 18 ||
    ageValue.trim().length === 0
  ) {
    $('#ageCheck').show();
    $('#ageCheck').html(
      'Club member field should contain only numbers and cannot be less than 18'
    );
    return false;
  }
  $('#ageCheck').hide();

  return true;
}

export default validateClientForm;
