// Declarations
const express = require('express');
const fs = require('fs');
const jsonSuite = require('./functions.js');
const bodyParser = require('body-parser');
const app = express();
const myport = 3000;

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.listen(myport, function() { console.log(`Now listening on port ${myport}`); });

// Routes GET
app.get('/', function(req, res) {
    res.redirect('users');
});
app.get('/users', function(req, res) {
    jsonSuite.parser(() => {
        res.render('users', { users: userData });
    });
});
app.get('/search', function(req, res) {
    jsonSuite.parser(() => {
        res.render('search', { users: userData });
    });
});
app.get('/add', function(req, res) {
    jsonSuite.parser(() => {
        res.render('add', { users: userData });
    });
});
app.post('/searchresults', function(req, res) {
    jsonSuite.searcher(req, () => {
        res.render('searchresults', {searchusers: searchFiltered, searchRequest: req.body.searchfield});
    });
});
app.post('/adduser', function(req, res) {
    jsonSuite.writer(req, () => {
        res.redirect('users');
    });
});


