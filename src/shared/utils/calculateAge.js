import { differenceInYears } from 'date-fns';

export const calculateAge = (birthDateValue) => {
  const age = differenceInYears(new Date(), birthDateValue);
  return age;
};
