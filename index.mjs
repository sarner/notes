'use strict';

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';

import {indexRoutes} from './routes/index-routes';
import {usersRoutes} from './routes/users-routes';
import {notesRoutes} from './routes/notes-routes';

const app = express();

app.use('/externals', express.static(path.join(path.resolve('./node_modules'))));
app.use(express.static(path.join(path.resolve('./src'))));

app.use(bodyParser.json());

/* TODO: The secret should be in a (unversioned) config file or better be a private key or set as an environment variable*/
const jwtSecret = 'EQnäcyj+VaMvZG@Dj#gHbTz<Guj6p§ä{Q==V<?VXFjZsÜ:öBt6,HdMAmG~WäÖhEt';
app.set('jwt-secret', jwtSecret);
app.set('jwt-sign', {expiresIn: '1d', audience: 'self', issuer: 'notes'});
app.set('jwt-validate', {secret: jwtSecret, audience: 'self', issuer: 'notes'});

app.use(bodyParser.json());

app.use('/', indexRoutes);
app.use('/users', usersRoutes);
app.use(jwt(app.get('jwt-validate'))); // after this middleware a token is required!
app.use('/notes', notesRoutes);
app.use(function (err, request, response, next) {
    if (err.name === 'UnauthorizedError') {
        response.status(401).json({error: 'No or invalid token provided!'});
    } else {
        response.setHeader('Content-Type', 'text/html');
        response.status(404).send('Page not found!');
    }
});

const host = '127.0.0.1';
const port = 1234;
app.listen(port, host, function () {
    console.log(`App listening at http://${host}:${port}/`);
});