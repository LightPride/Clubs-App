export const getCurrentDate = () => {
  const dtToday = new Date();
  const correctGetMonth = 1;
  const minDoubleDigit = 10;
  const leadingZero = '0';

  let month = dtToday.getMonth() + correctGetMonth;
  let day = dtToday.getDate();
  const year = dtToday.getFullYear();

  if (month < minDoubleDigit) month = leadingZero + month.toString();
  if (day < minDoubleDigit) day = leadingZero + day.toString();

  const maxDate = `${year}-${month}-${day}`;
  return maxDate;
};
