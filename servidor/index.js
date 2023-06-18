
//Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

//Importamos la conexion a la db
const conectarDB  = require('./config/db');

// Express APIs
const user = require('./routes/user');


//Ejecutamos la funcion que conecta con la db
conectarDB();

// Express settings
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());

app.use(express.json());
app.use('/api/books', require('./routes/book'));
// Serve static resources
app.use('/public', express.static('public'));


app.use('/api', user)


// Define PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Conectado al puerto ' + port)
})

// Express error handling
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Algo ha salido mal..'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});