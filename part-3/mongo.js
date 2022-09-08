const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>',
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://henrybo:${password}@cluster0.t9mqy.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

mongoose.connect(url).then((result) => {
  console.log('conntected to mongoDB');

  if (process.argv.length === 5) {
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    });
    person.save().then((person) => {
      console.log(`added ${person.name} number ${person.number} to phonebook`);
      mongoose.connection.close();
    });
  }

  if (process.argv.length === 3) {
    Person.find({}).then((result) => {
      result.forEach((person) =>
        console.log(`${person.name} ${person.number}`),
      );
      mongoose.connection.close();
    });
  }
});