import express from 'express'; 
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/message.controller.js';


const router = express.Router(); 


//for fetching sidebar users 
router.get("/user", protectRoute, getUsersForSidebar);

//for geting message of a specific user 
router.get('/:id', protectRoute, getMessages); 

//for seding message to a specific user 
router.post('/send/:id', protectRoute, sendMessage); 




export default router; 