var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({
     extended: true
 }));
 // default route
 app.get('/', function (req, res) {
     return res.send({ error: true, message: 'hello' })
 });

// set port
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})
 module.exports = app;
