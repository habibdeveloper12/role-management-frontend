import * as yup from "yup";
import { regExpression } from "./regexForm";
import { messages } from "./message";

export const formValidationLogin = yup.object({
  email: yup
    .string()
    .required(messages.email)
    .matches(regExpression.emailRegex.mailFormat, messages.email),

  password: yup
    .string()
    .required(messages.password)
    .matches(regExpression.passwordRegex, messages.password),
});
export const formValidationSignUp = yup.object({
  name: yup
    .string()
    .required(messages.name)
    .matches(regExpression.nameRegex, messages.name),
  email: yup
    .string()
    .required(messages.email)
    .matches(regExpression.emailRegex.mailFormat, messages.email),

  password: yup
    .string()
    .required(messages.password)
    .matches(regExpression.passwordRegex, messages.password),
  confirmPass: yup
    .string()
    .required(messages.password)
    .matches(regExpression.passwordRegex, messages.confirmPass),
});
