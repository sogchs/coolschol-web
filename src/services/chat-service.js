import http from './base-http-service';

const listMessages = (localUser, otherUser) => http.get(`/chat/${localUser}/${otherUser}`)
  .then(response => response.data);

  const createMessage = (message) => http.post('/chat', message)
  .then(response => response.data);

export default {
  listMessages,
  createMessage
}