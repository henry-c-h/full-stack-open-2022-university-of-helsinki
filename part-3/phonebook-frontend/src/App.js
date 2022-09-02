import { useState, useEffect } from 'react';
import services from './services/phonebook';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import './app.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState({ isError: false, content: '' });

  useEffect(() => {
    services.getAll().then((persons) => setPersons(persons));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} setPersons={setPersons} />
    </div>
  );
};

export default App;
