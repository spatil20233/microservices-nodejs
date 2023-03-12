import express from 'express';
import { verifyToken } from './auth.js'
const router = express.Router()

import fetchElementById, { register, deleteElement, updateElement , login, logout } from './controller.js'

// http://localhost:4002/user-proxy/users
router.get('/', verifyToken ,fetchElementById )
router.post('/register', register )
router.post('/login', login )
router.put('/',verifyToken ,updateElement )
router.delete('/:id', verifyToken , deleteElement )
router.get('/logout', verifyToken , logout )


export default router