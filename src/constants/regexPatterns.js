const regexPatterns = {
  name: /^[a-z0-9]{3,20}$/i,
  email: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
  password: /^(?=.*[0-9])(?=.*[a-z]).{8,32}/i,
  url: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
};

export { regexPatterns };
