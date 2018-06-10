'use strict';

const path = require('path');
const express = require('express');

const app = express();

app.use('/externals', express.static(path.join(__dirname, '/node_modules')));
app.use(express.static(path.join(__dirname, '/src')));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.listen(1234, function () {
    console.log('App listening on port 1234!');
});