export const validateBody = (body) => {
  let ERRORS = [];
  if (body.length > 250) {
    ERRORS.push(`Use a maximum 250 characters.`);
  }
  return ERRORS;
};
