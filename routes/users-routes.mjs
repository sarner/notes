'use strict';

import express from 'express';
import {usersCtrl} from '../controller/users-controller';

const router = express.Router();

router.post('/register', usersCtrl.register.bind(usersCtrl));
router.post('/login', usersCtrl.login.bind(usersCtrl));

export const usersRoutes = router;