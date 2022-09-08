const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB', error.message));

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3 },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => /(\d{3}|\d{2})-(\d*)/.test(v),
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;