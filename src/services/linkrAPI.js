import axios from "axios";

const BASE_URL = "https://linkr-heroku.herokuapp.com";

function postSignUp(user) {
  return axios.post(`${BASE_URL}/sign-up`, user);
}

function postSignIn(user) {
  return axios.post(`${BASE_URL}/`, user);
}

export { postSignUp, postSignIn };
