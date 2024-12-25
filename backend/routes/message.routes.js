import express from 'express'
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();



//to get messages between current user and provides id user 
router.get('/:id', protectRoute, getMessages); 


router.post('/send/:id', protectRoute, sendMessage); 

//protectroute will verify and provide authorization before sending msgs 

export default router; 