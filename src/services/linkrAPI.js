import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const headerCreator = (token) => {
  return {headers: {Authorization: `Bearer ${token}`}}
};

function getTimelinePosts(token){
  return axios.get(`${BASE_URL}/posts`, headerCreator(token));
}

function postSignUp(user) {
  return axios.post(`${BASE_URL}/sign-up`, user);
}

function postSignIn(user) {
  return axios.post(`${BASE_URL}/`, user);
}

export { postSignUp, postSignIn, getTimelinePosts };
