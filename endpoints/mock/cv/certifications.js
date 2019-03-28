'use strict';

var faker = require('faker');

var data = [
    {
        id: 1,
        personId: 1,
        name: faker.name.jobArea()
    },
    {
        id: 2,
        personId: 1,
        name: faker.name.jobArea()
    }
];

exports.prepare = function () {

    for (let i = 3; i < 53; i++) {
        let personId = i % 2 ? (i - 1) : i;
        data.push({
            id: (data.length + 1),
            personId: personId,
            name: faker.name.jobArea()
        });
    }

    return data;
};
