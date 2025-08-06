import express from 'express';
import connectDB from './db/database.js';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import categoryRouter from './routes/category.route.js';
import blogRouter from './routes/blog.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT;



// DataBase Connction
connectDB();

app.use(
    cors({
      origin: "http://localhost:5173", // Frontend origin
      credentials: true, // To allow cookies
    })
  );

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/blog', blogRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/category', categoryRouter)


app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT} 🌐`)
})