export default function createMessage(error) {
  const code = error.response.status;
  const body = error.response.data.message;

  let message = `Error ${code}\n\n
    ${body}`;

  //If Joi patterns not safitisfied
  if (code === 422) {
    // const { name, email, password, imageUrl } = form;
    //Validate fields
  }
  return message;
}
