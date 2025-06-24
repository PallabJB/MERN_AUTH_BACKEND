import express from 'express';
import {config} from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {connection} from './database/dbconnection.js'
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import userRouter from './routes/userRouter.js'
import { removeUnverifiedAccounts } from './automation/removeUnverifiedAccounts.js';


export const app = express();
config({path: './config.env'});

const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-authentication-made-by-pj.netlify.app",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin: " + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/v1/user', userRouter)

removeUnverifiedAccounts();

connection();

app.use(errorMiddleware)