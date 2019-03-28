'use strict';

exports.count = function (db) {
    return (req, res) => {
        res.json((db.get('certifications').value() || []).length);
    }
};
