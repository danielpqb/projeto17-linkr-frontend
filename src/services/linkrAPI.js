import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const headerCreator = (token) => {
  return {headers: {Authorization: `Bearer ${token}`}}
};

function getTimelinePosts(token){
  return axios.get(`${BASE_URL}/posts`, headerCreator(token));
}

function postSignUp(user) {
  return axios.post(`http://localhost:4000/signup`, user);
}

function postSignIn(user) {
  return axios.post(`${BASE_URL}/`, user);
}

function getSearchUsers(filter) {
  return axios.get(`${BASE_URL}/searchUsers`, {headers: filter});
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
  getSearchUsers,
  createPost,
  createHashtag,
  createPostsHashtags,
  getPosts,
  getHashtags, 
  getTimelinePosts
};
