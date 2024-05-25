import express from 'express'
import dotenv from 'dotenv'
import connectDB from './src/db/index.js'
import cors from 'cors'
import cookieParser from "cookie-parser";
dotenv.config( { path: "./.env"})
connectDB()


const app = express()
const port = process.env.PORT

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json())
app.use( express.urlencoded( { extended: true } ) )
app.use(cookieParser());


//import routes
import userRoute from './src/routes/user.route.js'
import todoRoute from './src/routes/todo.route.js'
app.use('/api/v1/user', userRoute)
app.use('/api/v1/todo', todoRoute)

app.listen( port, () => {
    console.log(`Server is running on port ${port}`)
})