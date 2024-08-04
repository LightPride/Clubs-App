import { DateTime } from 'luxon';

export const calculateAge = (birthDateValue) => {
  const birthDate = DateTime.fromJSDate(birthDateValue);
  const age = DateTime.now().diff(birthDate, 'years').years;

  return Math.floor(age);
};
