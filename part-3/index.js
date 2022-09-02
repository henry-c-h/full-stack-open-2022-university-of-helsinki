require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/Person');

const app = express();

// let persons = [
//   {
//     id: 1,
//     name: 'Arto Hellas',
//     number: '040-123456',
//   },
//   {
//     id: 2,
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//   },
//   {
//     id: 3,
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//   },
//   {
//     id: 4,
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122',
//   },
// ];

// parse body content
app.use(express.json());

app.use(cors());
app.use(express.static('build'));

// configure logging
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
);

// routes
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

app.get('/info', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      const summary = `Phonebook has info for ${persons.length} ${
        persons.length === 1 ? 'person' : 'people'
      }`;
      const time = new Date();
      response.send(
        `<p> ${summary} </p>
      <p> ${time} </p>`,
      );
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  // ----- saved to variable
  // const id = Number(request.params.id);
  // const person = persons.find((person) => person.id === id);
  // if (!person) return response.status(404).end();
  // response.json(person);

  // ----- saved to database
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;

  // --- saved to variable
  // persons = persons.filter((person) => person.id !== id);
  // response.status(204).end();

  // saved to database
  // returns null if person to be removed is no longer in database
  Person.findByIdAndRemove(id)
    .then((result) => {
      if (result) return response.status(204).end();
      return response.status(404).json({ error: 'person not in database' });
    })
    .catch((error) => next(error));
});

// const generateId = () => {
//   return Math.floor(Math.random() * 1000000);
// };

app.post('/api/persons', (request, response, next) => {
  const newPerson = request.body;
  if (!newPerson.name || !newPerson.number)
    return response.status(400).json({
      error: 'name or number missing',
    });

  // ----- saved to a variable
  // if (persons.find((person) => newPerson.name === person.name))
  //   return response.status(400).json({ error: 'name must be unique' });

  // newPerson.id = generateId();
  // persons = [...persons, newPerson];
  // response.json(newPerson);

  // ----- saved to database
  Person.find({ name: newPerson.name }).then((result) => {
    if (result.length > 0) {
      return response
        .status(400)
        .json({ error: `${newPerson.name} already added` });
    }

    const person = new Person(newPerson);
    person
      .save()
      .then((savedPerson) => {
        console.log(`${person.name} saved to phonebook`);
        response.json(savedPerson);
      })
      .catch((error) => next(error));
  });
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;
  Person.findByIdAndUpdate(request.params.id, body, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
