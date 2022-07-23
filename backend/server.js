var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require("cors");
var fileUpload = require('express-fileupload');

 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cors());
app.use(fileUpload());

 
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
    
    let name = req.body.name;
    let email = req.body.email;
    
    if (!name) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }
    
    dbConn.query("INSERT INTO users (name,email) VALUES (?,?) ", [name, email], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});
//  Update user with id
app.put('/update-user/:id', function (req, res) {
 
    let user_id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
 
    if (!user_id || !name || !email) {
        return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
    }
 
    dbConn.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email , user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
    });
});
//  Delete user
app.delete('/delete-user/:_id', function (req, res) {
    let user_id = req.params._id;
 
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
    });   
}); 
app.post('/upload', function (req, res) {
    
    let file = req['files'].thumbnail;
    
    if (!file) {
        return res.status(400).send({ error:true, message: 'Passou por aqui' });
    }else{
        return res.send({ error: false, data: JSON.stringify(file), message: 'Passou por aqui' });
    }
    
});
// set port
const PORT = process.env.NODE_DOCKER_PORT_BACKEND || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})
module.exports = app;