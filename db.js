'use strict';

// endpoints

// mock
var users = require('./endpoints/mock/users');
var posts = require('./endpoints/mock/posts');
var comments = require('./endpoints/mock/comments');
var summary = require('./endpoints/mock/summary');
var persons = require('./endpoints/mock/cv/persons');
var companies = require('./endpoints/mock/cv/companies');
var dictionaries = require('./endpoints/mock/cv/dictionaries');
var certifications = require('./endpoints/mock/cv/certifications');

// custom route
var routeSummary = require('./endpoints/route/summary');
var routeDictionaries = require('./endpoints/route/cv/dictionaries');
var routeCompaniesCount = require('./endpoints/route/cv/companies-count');
var routePersonsCount = require('./endpoints/route/cv/persons-count');
var routeCertificationsCount = require('./endpoints/route/cv/certifications-count');

// prepare data object
var dataPrepare = function() {
    return {
        posts: posts.prepare(),
        comments: comments.prepare(),
        users: users.prepare(),
        summary: summary.prepare(), // router GET

        // CV
        persons: persons.prepare(),
        companies: companies.prepare(),
        dictionaries: dictionaries.prepare(),
        certifications: certifications.prepare(),
    };
};

var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router(dataPrepare());
var middlewares = jsonServer.defaults({noCors: true});

// router.render = function (req, res) {
//   res.jsonp({
//    data: res.locals.data
//   });
// }

var db = router.db;

server.use(middlewares);
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
   });

// GET: /summary
// GET: /summary/?userId=1
server.get('/summary', routeSummary.get(db));
server.get('/summary/:id', routeSummary.getById(db));
// CV
server.get('/dictionaries/:id', routeDictionaries.getById(db));
server.get('/companies/count', routeCompaniesCount.count(db));
server.get('/persons/count', routePersonsCount.count(db));
server.get('/certifications/count', routeCertificationsCount.count(db));

server.use(jsonServer.rewriter({
    "/posts/:postId/comments": "/comments/?postId=:postId",
    "/posts/:postId/comments/:commentId": "/comments/:commentId",
    "/users/:userId/posts": "/posts/?userId=:userId",
    "/users/:userId/posts/:postId": "/posts/:postId"
}));

server.use(router)
server.listen(2000, function () {});
