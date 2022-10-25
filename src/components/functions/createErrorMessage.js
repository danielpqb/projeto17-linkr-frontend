export default function createErrorMessage(error, form) {
  const code = error.response.status;
  const body = error.response.data.message;

  let message = `Error ${code}\n\n
    ${body}`;

  //If Joi patterns not safitisfied
  if (code === 422) {
    const { name, email, password, imageUrl } = form;

    switch (error.response.data.joiErrors[0].context.key) {
      case "name":
        if (!name.match(/^[a-zA-Z0-9]*$/g)) {
          message = `Name must have only letters and numbers.`;
        }
        break;

      case "email":
        if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)) {
          message = `"${email}"\n\n is not a valid email.`;
        }
        break;

      case "password":
        if (!password.match(/^(?=.*[0-9])(?=.*[a-z]).{8,32}$/i)) {
          message = `Password must have:\n\n
          - At least one letter.\n
          - At least one number.\n
          - Length from 8 to 32.`;
        }
        break;

      case "imageUrl":
        if (
          !imageUrl.match(
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\\/+~#=!$¨&*()]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()]*)$/i
          )
        ) {
          message = `"${imageUrl}"\n\n is not a valid URL.`;
        }
        break;

      default:
        break;
    }
  }
  return message;
}
