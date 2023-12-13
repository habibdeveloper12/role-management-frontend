export const regExpression = {
  passwordRegex: /.{6,}/,
  emailRegex: {
    mailFormat: /[a-zA-Z]{2,4}$/,
    // mailFormat:/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,63})$/,
    twoAt: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  nameRegex: /^[a-z ,.'-]+$/i,
};
