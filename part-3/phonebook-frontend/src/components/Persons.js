import Person from './Person';
import services from '../services/phonebook';

const Persons = ({ persons, setPersons, filter }) => {
  const filterNames = (person) => {
    if (filter) {
      const filterValue = filter.toLowerCase();
      return person.name.toLowerCase().includes(filterValue);
    }
    return true;
  };

  const handleDelete = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      services.deletePerson(personToDelete.id);
      setPersons((prev) =>
        prev.filter((person) => person.id !== personToDelete.id),
      );
    }
  };

  return (
    <div>
      {persons.filter(filterNames).map((person) => (
        <Person
          key={person.id}
          person={person}
          handleDelete={() => handleDelete(person)}
        />
      ))}
    </div>
  );
};

export default Persons;
