import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDb.js';
import userRouter from './route/useroute.js'
import bcrypt from "bcrypt"
import nodemailer from "nodemailer";
import categoryRouter from './route/categoryroute.js';
import productRouter from './route/productroute.js';
import cartRouter from './route/cartroute.js';
import myListRouter from './route/myList.route.js'

dotenv.config();

const app = express();


app.use(
  cors({
    origin: "http://localhost:5175",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
); // ✅ this should close here

// VERY IMPORTANT — handle preflight
app.options("/", cors());


// app.options('/*', cors());

app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy: false
}));

const PORT = process.env.PORT || 8000;


app.get("/", (req, res) => {
    res.json({
        message: `Server is running on port ${process.env.PORT}`
    });
});

app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter);
app.use('/api/myList', myListRouter);


// Connect DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("✅ Server running on port", PORT);
    });
});