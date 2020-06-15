const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./app/models');

const app = express();

var corsOptions = {
	origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type 
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// database sequelize
db.sequelize.sync({force: true});

// root route
// app.get('/', (req, res) => {
// 	res.json({ message: 'Welcome to Mauricio application'});
// });

require('./app/routes/task.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log('Server is running on port', PORT, '.');
});