import http from './base-http-service';

const login = (user) => http.post('/login', user)
  .then(response => response.data);

const register = (user) => http.post('/register', user)
  .then(response => response.data);

const logout = () => http.get('/logout')
  .then(response => response.data);

const editProfile = (data, id) => http.put(`/profile/${id}`, data)
  .then(response => response.data);

export default {
  login,
  register,
  logout,
  editProfile
}