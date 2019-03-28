'use strict';

var faker = require('faker');
var dictionaries = require('./dictionaries').prepare();

var data = [
    {
        id: 1,
        name: 'Adam',
        surname: 'Bielan',
        age: 45,
        identification_data: {
          pesel: 123123123,
          nip: 345345,
          regon: 45646456
        },
        emails: ['adam.bielan@wp.pl'],
        developer_skills: [
          {
            code: 'LANG_PHP',
            level: 3,
            time_of_use: 1
          }
        ]
    },
    {
        id: 2,
        name: 'Anna',
        surname: 'Bocian',
        age: 45,
        identification_data: {
          pesel: 222333444,
          nip: 6777755,
          regon: 777222333
        },
        emails: ['anna.bocian@wp.pl'],
        developer_skills: [
          {
            code: 'LANG_PHP',
            level: 3,
            time_of_use: 1
          }
        ]
    }
];

exports.prepare = function () {

    for (var i = 0; i < 50; i++) {
      let person = {
          id: (data.length + 1),
          name: faker.name.firstName(),
          surname: faker.name.firstName(),
          age: faker.random.number({min: 18, max: 100}),
          identification_data: {
            pesel: faker.random.number({min: 10000, max: 1000000}),
            nip: faker.random.number({min: 10000, max: 1000000}),
            regon: faker.random.number({min: 10000, max: 1000000}),
          }
      };

      let emails = [];
      for (var ii = 0; ii <= faker.random.number({min: 1, max: 5}); ii++) {
        emails.push(faker.internet.email());
      }

      let developerSkills = [];
      for (var ii = 0; ii <= faker.random.number({min: 1, max: 5}); ii++) {
        developerSkills.push({
          code: dictionaries.developer_skills[ parseInt(faker.random.number({min: 0, max: 13}), 10) ].code,
          level: faker.random.number({min: 1, max: 5}),
          time_of_use: faker.random.number({min: 1, max: 10})
        });
      }

      person.emails = emails;
      person.developer_skills = developerSkills;

      data.push(person);
    }

    return data;
};
