import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const response = axios.get(baseUrl);
  return response.then((response) => response.data);
};

const createNew = (newPerson) => {
  const response = axios.post(baseUrl, newPerson);
  return response.then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updatePerson = (id, updatedPerson) => {
  const response = axios.put(`${baseUrl}/${id}`, updatedPerson);
  return response.then((response) => response.data);
};

const services = {
  getAll,
  createNew,
  deletePerson,
  updatePerson,
};

export default services;
