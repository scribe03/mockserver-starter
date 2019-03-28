'use strict';

exports.count = function (db) {
    return (req, res) => {
        res.json((db.get('persons').value() || []).length);
    }
};
