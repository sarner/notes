'use strict';

import express from 'express';
import {notesCtrl} from '../controller/notes-controller';

const router = express.Router();

router.get('/', notesCtrl.getNotes.bind(notesCtrl));
router.post('/', notesCtrl.addNote.bind(notesCtrl));
router.get('/:id', notesCtrl.getNoteById.bind(notesCtrl));
router.put('/:id', notesCtrl.updateNote.bind(notesCtrl));
router.delete('/:id', notesCtrl.deleteNote.bind(notesCtrl));

export const notesRoutes = router;