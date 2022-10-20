import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function postSignUp(user) {
  return axios.post(`${BASE_URL}/sign-up`, user);
}

function postSignIn(user) {
  return axios.post(`${BASE_URL}/`, user);
}

function getSearchUsers(filter) {
  return axios.get(`${BASE_URL}/searchUsers`, {headers: filter});
}

export { postSignUp, postSignIn, getSearchUsers };
