import axios from 'axios';
const API_URL = 'http://localhost:4000';
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
