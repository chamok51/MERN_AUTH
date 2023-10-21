import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './config.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 5000

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.get('/', (req,res)=>{
  res.send("Hello World)
})
app.use('/api/v1/', authRoutes)
app.use('/api/v1/', userRoutes)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`server is listening to port ${port}`)
})
