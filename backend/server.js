var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
 
 
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
// connection configurations
var dbConn = mysql.createConnection({
    host: process.env.MYSQLDB_HOST,
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.MYSQLDB_DATABASE
});
 
// connect to database
dbConn.connect(); 
// Retrieve all users 
app.get('/users', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    dbConn.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});
// Retrieve user with id 
app.get('/read-user/:id', function (req, res) {
 
    let user_id = req.params.id;
 
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
 
    dbConn.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.' });
    });
 
});
// Add a new user  
app.post('/add-user', function (req, res) {
 
    let user = req.body.user;
 
    if (!user) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }
 
    dbConn.query("INSERT INTO users SET ? ", { user: user }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});
//  Update user with id
app.put('/update-user', function (req, res) {
 
    let user_id = req.body.user_id;
    let user = req.body.user;
 
    if (!user_id || !user) {
        return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
    }
 
    dbConn.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
    });
});
//  Delete user
app.delete('/delete-user', function (req, res) {
 
    let user_id = req.body.user_id;
 
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
    });
}); 
// set port
const PORT = process.env.NODE_DOCKER_PORT_BACKEND || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})
module.exports = app;