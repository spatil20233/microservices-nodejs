import express from 'express';
const router = express.Router()
import { verifyToken } from './auth.js';
import fetchElementById, { createNewElement, deleteElement, updateElement } from './controller.js'

// http://localhost:4002/product-proxy/products
router.get('/', verifyToken , fetchElementById )
router.post('/',verifyToken, createNewElement )
router.put('/', verifyToken, updateElement )
router.delete('/:id',verifyToken, deleteElement )


export default router