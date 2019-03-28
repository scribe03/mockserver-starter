'use strict';

var faker = require('faker');

var data = [
    {
        id: 1,
        name: faker.company.companyName(),
        address: {
          countryCode: faker.address.countryCode(),
          state: faker.address.state(),
          city: faker.address.city(),
          zipCode: faker.address.zipCode(),
          streetName: faker.address.streetName()
        }
    },
    {
        id: 2,
        name: faker.company.companyName(),
        address: {
          countryCode: faker.address.countryCode(),
          state: faker.address.state(),
          city: faker.address.city(),
          zipCode: faker.address.zipCode(),
          streetName: faker.address.streetName()
        }
    }
];

exports.prepare = function () {

    for (var i = 0; i < 50; i++) {
        data.push({
            id: (data.length + 1),
            name: faker.company.companyName(),
            address: {
              countryCode: faker.address.countryCode(),
              state: faker.address.state(),
              city: faker.address.city(),
              zipCode: faker.address.zipCode(),
              streetName: faker.address.streetName()
            }
        });
    }

    return data;
};
