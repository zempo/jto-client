export const validateFrontMessage = (frontMessage) => {
  let ERRORS = [];
  if (frontMessage.length > 100) {
    ERRORS.push(`Please limit the title to 100 characters`);
  }
  return ERRORS;
};

export const validateInsideMessage = (insideMessage) => {
  let ERRORS = [];
  if (insideMessage.length > 650) {
    ERRORS.push(`Please limit the inner message to 650 characters.`);
  }
  return ERRORS;
};

export const validateTheme = (theme) => {
  const themeRegex = /^\S*\b(cursive|cursive-plus|handwritten-bold|handwritten|indie|kiddo|pen|quill|roboto|sharpie|typed)\b/;
  const spaceRegex = /^\S*$/;

  let ERRORS = [];
  if (!themeRegex.test(theme) && !spaceRegex.test(theme)) {
    ERRORS.push(`Please supply a valid theme.`);
  }
  return ERRORS;
};
