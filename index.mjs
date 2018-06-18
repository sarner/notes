'use strict';

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import {indexRoutes} from "./routes/index-routes";
import {notesRoutes} from './routes/notes-routes';

const app = express();

app.use('/externals', express.static(path.join(path.resolve('./node_modules'))));
app.use(express.static(path.join(path.resolve('./src'))));

app.use(bodyParser.json());

app.use('/', indexRoutes);
app.use('/notes', notesRoutes);
app.use(function (request, response, next) {
    response.setHeader('Content-Type', 'text/html');
    response.status(404).send('Page not found!');
});

const host = '127.0.0.1';
const port = 1234;
app.listen(port, host, function () {
    console.log(`App listening at http://${host}:${port}/`);
});