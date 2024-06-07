function countAge(birthDateValue) {
  var unixYear = 1970;
  var diff = Date.now() - new Date(birthDateValue).getTime();

  return new Date(diff).getUTCFullYear() - unixYear;
}

export default countAge;
