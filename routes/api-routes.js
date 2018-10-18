// Require all models
const db = require('../models/applist');

// 'app' contains the Express application
module.exports = function (app) {

     // Route for retrieving all gDocs
     app.get('/api/applist', function (req, res) {
        db.find({})
            .then(function (db) {
                res.json(db);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Route for saving a gDoc
    app.post('/add', function (req, res) {
        db.create(req.body)
            .then(function (db) {
                res.json(db);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Route for opening an existing gDoc
    app.get('/get/:docId', function (req, res) {
        db.findOne({_id: req.params.docId})
            .then(function (db) {
                res.json(db);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Route for deleting a gDoc
    app.delete('/delete/:id', function (req, res) {
        db.deleteOne({ _id: req.params.id })
            .then(function (db) {
                res.json(db);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Route for updating a gDoc
    app.put(`/api/update/:id`, function (req, res) {
        // db.findOneAndUpdate({itemID: req.body.itemID}, {$set: {itemCount: req.body.itemCount}})
        // db.findOneAndUpdate({ _id: req.params.id }, {$set: {docContent: req.body.docContent}})
        db.findOneAndUpdate({ docId: req.body.docId }, {$set: {docContent: req.body.docContent}})
            .then(function (db) {
                res.json(db);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

};