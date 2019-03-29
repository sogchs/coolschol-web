import http from './base-http-service';

const listColumns = () => http.get('/columns')
  .then(response => response.data);

const createColumn = (column) => http.post('/columns', column);

const deleteColumn = (id) => http.delete(`/columns/${id}`);

const createCard = (card) => {
  const data = new FormData();
  Object.keys(card).forEach(key => {
    data.append(key, card[key]);
  })

  return http.post('/cards', data);
}

const deleteCard = (id) => http.delete(`/cards/${id}`);

export default {
  listColumns,
  createColumn,
  deleteColumn,
  createCard,
  deleteCard
};