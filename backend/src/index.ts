import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRouter from './controllers/users';

mongoose.connect(process.env.MONGODB_CONNECTION as string);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/api/users", userRouter);

app.listen(3001, () => {
    console.log('server running on localhost:3001');
    
})