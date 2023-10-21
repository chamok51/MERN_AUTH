import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`mongodb connected to host ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit()
  }
}

export default connectDB
