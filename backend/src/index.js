import express from 'express'; 
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import grpmessagingRoutes from './routes/group.route.js'
import cors from "cors"

import { connectDb } from './lib/db.js';
import { app  , server } from './lib/socket.js';
dotenv.config(); 

// const app = express(); will delete after socker server creation 


const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true ,
  }

))


//authentication routes
app.use('/api/auth', authRoutes); 
//messaging routes 
app.use('/api/message', messageRoutes); 

//grpmessaging routes
app.use('/api/grp-messaging', grpmessagingRoutes);



server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
  connectDb(); 
});