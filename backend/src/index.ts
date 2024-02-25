import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRouter from './controllers/users';
import authRouter from './controllers/auth';
import cookieParser from 'cookie-parser';

mongoose.connect(process.env.MONGODB_CONNECTION as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({credentials: true, origin: process.env.FRONTEND_URL}));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(3001, () => {
    console.log('server running on localhost:3001');
})