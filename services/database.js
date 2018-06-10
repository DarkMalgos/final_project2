const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'mysql-bonne-franquette.alwaysdata.net',
    user     : '158558',
    password : 'totolola42',
    database : 'bonne-franquette_bdd'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected')
});

function sendQuery(query, callback) {
    connection.query(query, function (error, results, fields) {
        if(error){
            callback(error)
        }else {
            callback(null, results)
        }
    })
}

module.exports =({
    sendQuery: sendQuery
});