import http from './base-http-service';

const createClassroom = (classroom) => http.post('/classroom', classroom)
  .then(response => response.data);

const listClassroom = () => http.get('/classroom')
  .then(response => response.data);

const deleteClassroom = (id) => http.delete(`/classroom/${id}`)

export default {
  createClassroom,
  listClassroom,
  deleteClassroom
}