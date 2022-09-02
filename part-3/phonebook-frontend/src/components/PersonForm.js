import { useState } from 'react';
import services from '../services/phonebook';

const PersonForm = ({ persons, setPersons, setMessage }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`,
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        services
          .updatePerson(existingPerson.id, updatedPerson)
          .then((updatedPerson) => {
            setPersons((prev) =>
              prev.map((person) =>
                person.id === existingPerson.id ? updatedPerson : person,
              ),
            );
            setMessage({
              isError: false,
              content: `Updated ${updatedPerson.name}`,
            });
            setTimeout(() => setMessage({ isError: false, content: '' }), 5000);
          })
          .catch((error) => {
            if (error.response.status === 404) {
              setMessage({
                isError: true,
                content: `Information of ${updatedPerson.name} has already been removed from server`,
              });
              setTimeout(
                () => setMessage({ isError: false, content: '' }),
                5000,
              );
              setPersons((prev) =>
                prev.filter((person) => person.id !== updatedPerson.id),
              );
            } else if (error.response.status === 400) {
              setMessage({
                isError: true,
                content: `${error.response.data.error}`,
              });
              setTimeout(
                () => setMessage({ isError: false, content: '' }),
                5000,
              );
            }
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      services
        .createNew(newPerson)
        .then((newPerson) => {
          setPersons((prev) => [...prev, newPerson]);
          setMessage({ isError: false, content: `Added ${newPerson.name}` });
          setTimeout(() => setMessage({ isError: false, content: '' }), 5000);
        })
        .catch((error) => {
          setMessage({
            isError: true,
            content: `${error.response.data.error}`,
          });
          setTimeout(() => setMessage({ isError: false, content: '' }), 5000);
        });
    }
    setNewName('');
    setNewNumber('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        name:{' '}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{' '}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
