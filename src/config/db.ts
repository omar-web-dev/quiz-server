// connect to database
import mongoose from 'mongoose';
import { config } from 'dotenv';
config()
const dbConnect = async () => {
    // Connect to database dev or prod
    const env = process.env.PROD === 'true' ? 'prod' : 'dev'
    const uri = process.env[`MONGO_URI_${env.toUpperCase()}`]

    if (!uri) {
        throw new Error('MONGO_URI must be defined')
    }

    try {
        await mongoose.connect(uri)
        console.log('🚀 Connected to database')
    } catch (error) {
        console.log(error)
    }
}
export { dbConnect }


