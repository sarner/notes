'use strict';

import path from 'path';
import fs from 'fs';
import http from 'http';
import https from 'https';
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
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (request, response, next) {
    if (request.secure) {
        next();
    } else {
        response.redirect('https://' + request.headers.host + request.url);
    }
});

/* TODO: The secret should be in a (unversioned) config file or better be a private key or set as an environment variable*/
const jwtSecret = 'EQnäcyj+VaMvZG@Dj#gHbTz<Guj6p§ä{Q==V<?VXFjZsÜ:öBt6,HdMAmG~WäÖhEt';
app.set('jwt-secret', jwtSecret);
app.set('jwt-sign', {expiresIn: '1d', audience: 'self', issuer: 'notes'});
app.set('jwt-validate', {secret: jwtSecret, audience: 'self', issuer: 'notes'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', indexRoutes);
app.use('/api/users', usersRoutes);
app.use(jwt(app.get('jwt-validate'))); // after this middleware a token is required!
app.use('/api/notes', notesRoutes);
app.use(function (err, request, response, next) {
    if (err.name === 'UnauthorizedError') {
        response.status(401).json('No or invalid token provided!');
    } else {
        response.setHeader('Content-Type', 'text/html');
        response.status(404).send('Page not found!');
    }
});

const options = {
    key: fs.readFileSync('encryption/private.key'),
    cert: fs.readFileSync('encryption/certificate.crt')
};
const host = '127.0.0.1';
const httpPort = 80;
const httpsPort = 443;
http.createServer(app).listen(httpPort);
https.createServer(options, app).listen(httpsPort, host, function () {
    console.log(`App listening at https://${host}/`);
});