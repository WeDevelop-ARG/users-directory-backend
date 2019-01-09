const express = require('express');
const faker = require('faker');

const PORT = 3000;
const app = express();

let _people = [];
const getPeople = () => {
  if (_people.length === 0) {
    for (let i = 0; i <= faker.random.number({ min: 10, max: 50 }); i++) {
      _people.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phoneNumber: faker.phone.phoneNumber(),
        jobTitle: faker.name.jobTitle(),
        avatarUrl: faker.random.image()
      });
    }
  }

  return _people;
};

const findPeopleByName = (name) => {
  const people = getPeople();

  const sanitizedName = name && name.trim();

  return people.filter((person) => {
    if (person.firstName.includes(sanitizedName)) return true;
    if (person.lastName.includes(sanitizedName)) return true;

    return false;
  });
};

app.get('/people', (req, res) => res.send(getPeople()));

app.get('/people/by-name/:name', (req, res) => {
  const { name } = req.params;

  if (!name) return res.status(400).send('Bad request');

  res.send(findPeopleByName(name));
});

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
