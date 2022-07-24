var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require("cors");
var fileUpload = require('express-fileupload');
var fs = require('fs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function (req, res, next) {
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
        return res.status(400).send({ error: true, message: 'Please provide user' });
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

    dbConn.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, user_id], function (error, results, fields) {
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

    let file = req['files'].file;
    let previous_file_name = req.body.file_name;



    if (!file) {
        return res.status(400).send({ error: true, message: 'Passou por aqui' });
    } else {
        let dir = './image/image/';
        if (previous_file_name) {
            fs.unlinkSync(dir + previous_file_name + '.jpg');
        }
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        let name_file = (new Date()).getTime().toString(36);
        fs.createWriteStream(dir + name_file + '.jpg').write(file.data);
        return res.send({ error: false, data: name_file, message: 'Passou por aqui' });
    }

});

app.get('/image/:name_file', function (req, res) {

    let name_file = req.params.name_file;

    fs.readFile(
        `../backend/image/image/${name_file}.jpg`,

        function (err, image) {
            if (err) {
                throw err;
            }

            res.setHeader('Content-Type', 'image/jpg');
            res.setHeader('Content-Length', ''); // Image size here
            res.setHeader('Access-Control-Allow-Origin', '*'); // If needs to be public
            res.send(image);
        }
    );

});

app.get('/produtos', function (req, res) {
    dbConn.query('SELECT * FROM produtos', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Produtos list.' });
    });
});
app.get('/read-produto/:id', function (req, res) {

    let produto_id = req.params.id;

    if (!produto_id) {
        return res.status(400).send({ error: true, message: 'Please provide produto_id' });
    }

    dbConn.query('SELECT * FROM produtos where id=?', produto_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'produtos list.' });
    });

});
// Add a new produto  
app.post('/add-produto', function (req, res) {

    let nome = req.body.nome
    let imagem = req.body.imagem
    let descricao = req.body.descricao
    let estoque = req.body.estoque
    let status = req.body.status
    let preco = req.body.preco

    if (!nome) {
        return res.status(400).send({ error: true, message: 'Please provide produto' });
    }

    dbConn.query("INSERT INTO produtos (nome,imagem,descricao,estoque,status,preco) VALUES (?,?,?,?,?,?) ", [nome, imagem, descricao, estoque, status, preco], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New produto has been created successfully.' });
    });
});
//  Update produto with id
app.put('/update-produto/:id', function (req, res) {

    let produto_id = req.params.id;
    let nome = req.body.nome
    let imagem = req.body.imagem
    let descricao = req.body.descricao
    let estoque = req.body.estoque
    let status = req.body.status
    let preco = req.body.preco




    if (!produto_id) {
        return res.status(400).send({ error: produto_id, message: 'Please provide produto and produto_id' });
    }

    dbConn.query("UPDATE produtos SET nome = ?, imagem = ?, descricao = ?, estoque = ?, status = ?, preco = ? WHERE id = ?", [nome, imagem, descricao, estoque, status, preco, produto_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'produto has been updated successfully.' });
    });
});
//  Delete produto
app.delete('/delete-produto/:_id', function (req, res) {
    let produto_id = req.params._id;

    if (!produto_id) {
        return res.status(400).send({ error: true, message: 'Please provide produto_id' });
    }

    dbConn.query('SELECT imagem FROM produtos where id=?', produto_id, function (error, results, fields) {
        if (error) throw error;
        let value_of_image = null;
        value_of_image = results[0];
        let dir = './image/image/';
        if (value_of_image.imagem) {
            fs.unlinkSync(dir + value_of_image.imagem + '.jpg');
        }
        return true;
    });


    dbConn.query('DELETE FROM produtos WHERE id = ?', [produto_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Produto has been updated successfully.' });
    });
});
// set port
const PORT = process.env.NODE_DOCKER_PORT_BACKEND || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})
module.exports = app;