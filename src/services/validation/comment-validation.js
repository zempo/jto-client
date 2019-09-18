export const validateBody = (body) => {
  let ERRORS = [];
  if (body.length > 250) {
    ERRORS.push(`Keep it less than 250 characters, please.`);
  }
  return ERRORS;
};
