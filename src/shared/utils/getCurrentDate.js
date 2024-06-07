function getCurrentDate() {
  var dtToday = new Date();
  var correctGetMonth = 1;
  var minDoubleDigit = 10;
  var leadingZero = '0';

  var month = dtToday.getMonth() + correctGetMonth;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();

  if (month < minDoubleDigit) month = leadingZero + month.toString();
  if (day < minDoubleDigit) day = leadingZero + day.toString();

  var maxDate = year + '-' + month + '-' + day;
  return maxDate;
}

export default getCurrentDate;
