import http from './base-http-service';

const createClassroom = (classroom) => http.post('/classroom', classroom)
  .then(response => response.data);

const listClassroom = () => http.get('/classroom')
  .then(response => response.data);

const deleteClassroom = (id) => http.delete(`/classroom/${id}`);

const detailClassroom = (id) => http.get(`/classroom/${id}`);

const editClassroom = (id, classroomStudents) => http.put(`/classroom/${id}`, classroomStudents);

const searchUserByEmail = (userData) => http.post('/user', userData)
  .then(response => response.data);

export default {
  createClassroom,
  listClassroom,
  deleteClassroom,
  detailClassroom,
  editClassroom,
  searchUserByEmail
}