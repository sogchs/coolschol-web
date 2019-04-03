import http from './base-http-service';

const listEvent = (id) => http.get(`/calendar/${id}`)
  .then(response => response.data);

const createEvent = (dataEvent) => http.post('/calendar', dataEvent);

const deleteEvent = (id) => http.delete(`/calendar/${id}`);

const detailEvent = (id) => http.get(`/calendar/event/${id}`)
.then(response => response.data);

const editEvent = (id, dataEvent) => http.put(`/calendar/${id}`, dataEvent)

export default {
  listEvent,
  createEvent,
  deleteEvent,
  detailEvent,
  editEvent
};