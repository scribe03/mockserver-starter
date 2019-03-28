'use strict';

const dictionaries = require('./../../mock/cv/dictionaries').prepare();

exports.getById = function (db) {
    return (req, res) => {
        res.jsonp(dictionaries[req.params.id] ? dictionaries[req.params.id] : []);
    }
};
