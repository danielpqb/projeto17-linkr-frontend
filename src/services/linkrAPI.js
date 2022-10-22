import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function createHeader() {
  const auth = localStorage.getItem("userToken");
  const config = { headers: { Authorization: `Bearer ${auth}` } };
  return config;
}
const config = createHeader();

function getTimelinePosts() {
  return axios.get(`${BASE_URL}/posts`, config);
}

function postSignUp(user) {
  return axios.post(`${BASE_URL}/signup`, user);
}

function postSignIn(user) {
  return axios.post(`${BASE_URL}/signin`, user);
}

function getUserDataByToken(token) {
  const _token = "Bearer " + token;

  return axios.get(`${BASE_URL}/users/me`, {
    headers: { Authorization: _token },
  });
}

function getSearchUsers(filter) {
  return axios.get(`${BASE_URL}/searchUsers`, { headers: filter });
}

function createPost({ userId, text, link }) {
  if (!text) {
    return axios.post(`${BASE_URL}/create-post`, { userId, link }, config);
  }

  return axios.post(`${BASE_URL}/create-post`, { userId, text, link }, config);
}

function createHashtag({ title }) {
  return axios.post(`${BASE_URL}/create-hashtag`, { title }, config);
}

function createPostsHashtags(body) {
  return axios.post(`${BASE_URL}/create-posts-hashtags`, body, config);
}

function getPosts() {
  return axios.get(`${BASE_URL}/posts`, config);
}

function getAllPosts() {
  return axios.get(`${BASE_URL}/all-posts`, config);
}

function getHashtags() {
  return axios.get(`${BASE_URL}/hashtags`, config);
}

export {
  postSignUp,
  postSignIn,
  getUserDataByToken,
  getSearchUsers,
  createPost,
  createHashtag,
  createPostsHashtags,
  getPosts,
  getAllPosts,
  getHashtags,
  getTimelinePosts,
};
