export const countAge = birthDateValue => {
  const unixYear = 1970;
  const diff = Date.now() - new Date(birthDateValue).getTime();

  return new Date(diff).getUTCFullYear() - unixYear;
};
