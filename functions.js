const fs = require('fs');

function JSONparser(callback) {
    fs.readFile('./users.json', function(err, data){
        if (err) {
            throw err
        }
        userData = JSON.parse(data);
        callback();
    });
}
function JSONwriter(req, callback) {
    let formData = req.body;
    userData.push(formData);
    fs.writeFile('./users.json', JSON.stringify(userData), function(err) {
        if (err) {
            throw err;
        }
        callback();
    });
}

function JSONsearcher(req, callback) {
    let searchRequest  = req.body.searchfield.split(' ');
    searchRequest.forEach((e) => {
         searchRequest[searchRequest.indexOf(e)] = e[0].toUpperCase() + e.substring(1).toLowerCase();
    });
    searchFiltered = [];
    let searchResults = searchRequest.forEach((e) => {
        for(let i = 0; i < userData.length; i++) {
             if(userData[i].firstname == e || userData[i].lastname == e) {
                searchFiltered.push(userData[i]);
            }
        }
    });
    callback();
}

module.exports = {
    parser: JSONparser,
    writer: JSONwriter,
    searcher: JSONsearcher
}
