'use strict';

import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/registration', function (request, response) {
    response.sendFile(path.join(path.resolve('./src/registration.html')));
});
router.get('/login', function (request, response) {
    response.sendFile(path.join(path.resolve('./src/login.html')));
});
router.get('/', function (request, response) {
    response.sendFile(path.join(path.resolve('./src/index.html')));
});
router.get('/edit', function (request, response) {
    response.sendFile(path.join(path.resolve('./src/edit.html')));
});

export const indexRoutes = router;