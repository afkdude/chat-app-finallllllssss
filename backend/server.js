import express from 'express';          
import dotenv from "dotenv";            
import cookieParser from 'cookie-parser'; 
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

import messageRoutes from './routes/message.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';


const app = express();
const PORT = process.env.PORT || 5000;

// Configure dotenv to read environment variables from .env file
dotenv.config();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Middleware to parse cookies from incoming requests
app.use(cookieParser());


// All authentication-related requests will be handled by authRoutes
app.use('/api/auth', authRoutes);

// All message-related requests will be handled by messageRoutes
app.use('/api/messages', messageRoutes);

//all user related routes will be handled by userRoutes

app.use("/api/users", userRoutes); 

app.listen(PORT, () => {
  // Establish connection to the MongoDB database
  connectToMongoDB();

  console.log(`Server running on ${PORT}`);
});
