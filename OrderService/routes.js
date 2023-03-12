import express from 'express';
const router = express.Router()
import { verifyToken } from './auth.js';
import fetchElementById, { createNewElement, deleteElement, updateElement } from './controller.js'

router.get('/', verifyToken , fetchElementById )
router.post('/', createNewElement )
router.put('/', updateElement )
router.delete('/:id', deleteElement )


export default router