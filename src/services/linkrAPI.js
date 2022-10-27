import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function createHeader() {
  const auth = localStorage.getItem("userToken");
  const config = { headers: { Authorization: `Bearer ${auth}` } };
  return config;
}

function getTimelinePosts() {
  const config = createHeader();

  return axios.get(`${BASE_URL}/posts`, config);
}

function getHashtagPosts(hashtag) {
  const config = createHeader();

  return axios.get(`${BASE_URL}/posts/hashtag/${hashtag}`, config);
}

function getUserPosts(userId) {
  return axios.get(`${BASE_URL}/posts/${userId}`);
}

function getTrendingHashtags() {
  const config = createHeader();

  return axios.get(`${BASE_URL}/trending`, config);
}

function getUserFollows() {
  const config = createHeader();
  
  return axios.get(`${BASE_URL}/userfollows`, config);
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

function getUserById(id) {
  const config = createHeader();

  return axios.get(`${BASE_URL}/user/${id}`, config)
}

function getSearchUsers(filter) {
  const auth2 = localStorage.getItem("userToken");
  const config2 = `Bearer ${auth2}`;

  return axios.get(`${BASE_URL}/searchUsers`, {
    headers: { filter: filter, Authorization: config2 },
  });
}

function createPost({ userId, text, link }) {
  const config = createHeader();
  
  if (!text) {
    return axios.post(`${BASE_URL}/create-post`, { userId, link }, config);
  }

  return axios.post(`${BASE_URL}/create-post`, { userId, text, link }, config);
}

function createHashtag({ title }) {
  const config = createHeader();

  return axios.post(`${BASE_URL}/create-hashtag`, { title }, config);
}

function createPostsHashtags(body) {
  const config = createHeader();

  return axios.post(`${BASE_URL}/create-posts-hashtags`, body, config);
}

function getPostDataById(id) {
  const config = createHeader();

  return axios.get(`${BASE_URL}/posts/post/${id}`, config);
}

function getCommentsDataByPostId(postId, userId) {
  return axios.get(`${BASE_URL}/comments/data/${postId}/${userId}`);
}

function postNewComment(body, token) {
  const _token = "Bearer " + token;

  return axios.post(`${BASE_URL}/comment`, body, { headers: { Authorization: _token } });
}

function getPosts() {
  const config = createHeader();

  return axios.get(`${BASE_URL}/posts`, config);
}

function getAllPosts() {
  const config = createHeader();

  return axios.get(`${BASE_URL}/all-posts`, config);
}

function getHashtags() {
  const config = createHeader();

  return axios.get(`${BASE_URL}/hashtags`, config);
}

function updatePostText(postId, text) {
  const config = createHeader();

  return axios.put(`${BASE_URL}/posts/${postId}`, text, config);
}

function updatePostHashtags(postId, hashtags) {
  const config = createHeader();

  return axios.put(`${BASE_URL}/posts/${postId}/hashtags`, hashtags, config);
}

function isFollowed(id) {
  const config = createHeader();

  return axios.get(`${BASE_URL}/follow/${id}`, config);
}

function followUser(id) {
  const config = createHeader();

  return axios.post(`${BASE_URL}/follow/${id}`, {}, config);
}

function unfollowUser(id) {
  const config = createHeader();

  return axios.delete(`${BASE_URL}/follow/${id}`, config);
}

export {
  postSignUp,
  postSignIn,
  getUserDataByToken,
  getUserById,
  getSearchUsers,
  createPost,
  createHashtag,
  createHeader,
  createPostsHashtags,
  getPostDataById,
  getCommentsDataByPostId,
  postNewComment,
  getPosts,
  getAllPosts,
  getUserPosts,
  getHashtags,
  getTimelinePosts,
  getTrendingHashtags,
  getHashtagPosts,
  updatePostText,
  updatePostHashtags,
  isFollowed,
  followUser,
  unfollowUser,
  getUserFollows
};
