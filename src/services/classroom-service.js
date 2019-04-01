import http from './base-http-service';

const createClassroom = (classroom) => http.post('/classroom', classroom)
  .then(response => response.data);

const listClassroom = () => http.get('/classroom')
  .then(response => response.data);

const deleteClassroom = (id) => http.delete(`/classroom/${id}`);

const detailClassroom = (id) => http.get(`/classroom/${id}`)
  .then(response => response.data);

const editClassroom = (id, classroom) => http.put(`/classroom/${id}`, classroom)
  .then(response => response.data);

const searchUserByEmail = (userEmail) => http.post('/user', userEmail)
  .then(response => response.data);

const createChecklist = (checklistData) => http.post('/classroom/checklist', checklistData);

const createScore = (scoreData) => http.post('/classroom/score', scoreData);

const getChecklist = (id) => http.get(`/classroom/checklist/${id}`)
  .then(response => response.data);
  

export default {
  createClassroom,
  listClassroom,
  deleteClassroom,
  detailClassroom,
  editClassroom,
  searchUserByEmail,
  createChecklist,
  createScore,
  getChecklist
}