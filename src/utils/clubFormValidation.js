function validateClubForm(clubNameValue, clubLocationValue) {
  if (clubNameValue.trim().length === 0) {
    $('#clubNameCheck').show();
    $('#clubNameCheck').html('This field should not be empty');

    return false;
  }
  $('#clubNameCheck').hide();

  if (clubLocationValue.trim().length === 0) {
    $('#clubLocationCheck').show();
    $('#clubLocationCheck').html('This field should not be empty');

    return false;
  }
  $('#clubLocationCheck').hide();

  return true;
}

export default validateClubForm;
