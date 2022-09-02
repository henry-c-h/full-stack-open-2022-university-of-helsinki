const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

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
  response.json(persons);
});

app.get('/info', (request, response) => {
  const summary = `Phonebook has info for ${persons.length} people`;
  const time = new Date();
  response.send(
    `<p> ${summary} </p>
    <p> ${time} </p>`,
  );
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) return response.status(404).end();
  response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const generateId = () => {
  return Math.floor(Math.random() * 1000000);
};

app.post('/api/persons', (request, response) => {
  const newPerson = request.body;

  if (!newPerson.name || !newPerson.number)
    return response.status(400).json({
      error: 'name or number missing',
    });
  if (persons.find((person) => newPerson.name === person.name))
    return response.status(400).json({ error: 'name must be unique' });

  newPerson.id = generateId();
  persons = [...persons, newPerson];
  response.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
