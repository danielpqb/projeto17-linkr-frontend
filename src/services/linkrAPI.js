import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function postSignUp(user) {
  return axios.post(`${BASE_URL}/sign-up`, user);
}

function postSignIn(user) {
  return axios.post(`${BASE_URL}/`, user);
}

function createPost({ userId, text, link }) {
  if (!text) {
    return axios.post(`${BASE_URL}/create-post`, { userId, link });
  }

  return axios.post(`${BASE_URL}/create-post`, { userId, text, link });
}

function createHashtag({title}) {
  return axios.post(`${BASE_URL}/create-hashtag`, {title});
}

function createPostsHashtags(body) {
  return axios.post(`${BASE_URL}/create-posts-hashtags`, body);
}

function getPosts() {
  return axios.get(`${BASE_URL}/posts`);
}

function getHashtags() {
  return axios.get(`${BASE_URL}/hashtags`);
}

export {
  postSignUp,
  postSignIn,
  createPost,
  createHashtag,
  createPostsHashtags,
  getPosts,
  getHashtags,
};
