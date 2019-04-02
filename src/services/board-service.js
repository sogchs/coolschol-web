import http from './base-http-service';

const listColumns = (id) => http.get(`/column/${id}`)
  .then(response => response.data);

const createColumn = (column) => http.post('/column', column);

const deleteColumn = (id) => http.delete(`/column/${id}`);

const createCard = (card) => {
  const data = new FormData();
  Object.keys(card).forEach(key => {
    data.append(key, card[key]);
  })

  return http.post('/card', data);
}

const deleteCard = (id) => http.delete(`/card/${id}`);

export default {
  listColumns,
  createColumn,
  deleteColumn,
  createCard,
  deleteCard
};