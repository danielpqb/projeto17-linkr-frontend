import axios from 'axios';
const API_URL = process.env.REACT_APP_API_BASE_URL;
const api = axios.create({
  baseURL: API_URL,
});

export async function handlePostLike(type, postId, userId) {
  try {
    if (type) {
      await api.post(`likes/${postId}/${userId}`);
      return;
    } else {
      await api.delete(`likes/${postId}/${userId}`);
      return;
    }
  } catch (err) {
    console.error('⚠ Error liking post: ', err);
  }
}
