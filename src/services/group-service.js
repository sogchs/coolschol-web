import http from './base-http-service';

const createGroup = (group) => http.post('/group', group)
  .then(response => response.data);

const listGroups = (id) => http.get(`/group/${id}`)
  .then(response => response.data);

const deleteGroup = (id) => http.delete(`/group/${id}`)

export default {
  createGroup,
  listGroups,
  deleteGroup
}