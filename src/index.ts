import express, { Application, Request, Response, NextFunction } from 'express';
import { Server } from 'http'
import createHttpError from 'http-errors'
import { config } from 'dotenv'
import errorHandler from './middlewares/errorHandler';
import { dbConnect } from './config/db';
import { apiBaseUrl, currentApiVersion } from './config/apiConfig';
import { authGuard } from './middlewares/authGuard';
import cors from 'cors'

// make sure root path 





const PORT: Number = Number(process.env.PORT) || 4000;
const app: Application = express();


// middlewares
config()
app.use(express.json())
app.use(cors())



// Connect to database
dbConnect() // async function

// Routes 
app.get('/', (req: Request, res: Response) => {
    res.send({ success: true, message: 'Welcome to Quiz API' })
})

app.use(`${apiBaseUrl}user`, require(`./routes/${currentApiVersion}UserRoute`))
app.use(`${apiBaseUrl}auth`, require(`./routes/${currentApiVersion}AuthRoute`))
app.use(`${apiBaseUrl}quiz-add`, require(`./routes/${currentApiVersion}QuizRoute`))
app.use(`${apiBaseUrl}my-quiz`, require(`./routes/${currentApiVersion}MyQuizRoute`))
app.use(`${apiBaseUrl}category`, require(`./routes/${currentApiVersion}CategoryRoute`))


// Error Handler
app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound())
})


// Error Handler
app.use(errorHandler);

// Start Server
const server: Server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} `)
})