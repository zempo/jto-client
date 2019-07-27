export const validateUsername = (username) => {
  // eslint-disable-next-line
  const REGEX_USERNAME = /(^[A-Za-z0-9\-\_]+$)/;
  let ERRORS = [];

  if (!REGEX_USERNAME.test(username) && username.length < 3) {
    ERRORS.push(`Can only be letters, numbers, underscores, or hyphens (No extra spaces).`);
    ERRORS.push(`Must be 3+ characters`);
  } else if (!REGEX_USERNAME.test(username) && username.length > 72) {
    ERRORS.push(`Can only be letters, numbers, underscores, or hyphens (No extra spaces).`);
    ERRORS.push(`Must be less than 72 characters`);
  } else if (!REGEX_USERNAME.test(username)) {
    ERRORS.push(`Can only be letters, numbers, underscores, or hyphens (No extra spaces).`);
  } else if (username.length < 3) {
    ERRORS.push(`Must be 3+ characters`);
  } else if (username.length > 72) {
    ERRORS.push(`Must be less than 72 characters`);
  } else {
    ERRORS = [];
  }

  return ERRORS;
};

export const validatePwd = (pwd) => {
  // eslint-disable-next-line
  const REGEX_PWD = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
  let ERRORS = [];

  if (!REGEX_PWD.test(pwd) && pwd.length < 8 && (pwd.startsWith(" ") || pwd.endsWith(" "))) {
    ERRORS.push(`Must be longer than 8 characters.`);
    ERRORS.push(`Must contain at least 1 upper case letter, number and special character.`);
    ERRORS.push(`Must not contain extra spaces`);
  } else if (!REGEX_PWD.test(pwd) && pwd.length > 72 && (pwd.startsWith(" ") || pwd.endsWith(" "))) {
    ERRORS.push(`Must be less than 72 characters.`);
    ERRORS.push(`Must contain at least 1 upper case letter, number and special character.`);
    ERRORS.push(`Must not contain extra spaces`);
  } else if (!REGEX_PWD.test(pwd) && pwd.length < 8) {
    ERRORS.push(`Must be longer than 8 characters.`);
    ERRORS.push(`Must contain at least 1 upper case letter, number and special character.`);
  } else if (!REGEX_PWD.test(pwd) && pwd.length > 72) {
    ERRORS.push(`Must be less than 72 characters.`);
    ERRORS.push(`Must contain at least 1 upper case letter, number and special character.`);
  } else if (!REGEX_PWD.test(pwd) && (pwd.startsWith(" ") || pwd.endsWith(" "))) {
    ERRORS.push(`Must contain at least 1 upper case letter, number and special character.`);
    ERRORS.push(`Must not contain extra spaces`);
  } else if (!REGEX_PWD.test(pwd)) {
    ERRORS.push(`Must contain at least 1 upper case letter, number and special character.`);
  } else if (pwd.length < 8) {
    ERRORS.push(`Must be longer than 8 characters.`);
  } else if (pwd.length > 72) {
    ERRORS.push(`Must be less than 72 characters.`);
  } else if (pwd.startsWith(" ") || pwd.endsWith(" ")) {
    ERRORS.push(`Must not contain extra spaces`);
  } else {
    ERRORS = [];
  }

  return ERRORS;
};

export const validateName = (fullname) => {
  let ERRORS = [];
  if (fullname.length > 90) {
    ERRORS.push(`Full names shall be abbreviated to 90 characters based on Minnesota Statutory Law.`);
    ERRORS.push(
      ` Please reach out to our support team if you would like to create an account for the kitten who walks across your keyboard.`
    );
  } else {
    ERRORS = [];
  }
  return ERRORS;
};

export const validateEmail = (email) => {
  // eslint-disable-next-line
  let REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let ERRORS = [];

  if (!REGEX_EMAIL.test(email)) {
    ERRORS.push(`Must use valid email`);
  } else {
    ERRORS = [];
  }
  return ERRORS;
};
