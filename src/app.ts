import express, {Express} from 'express'
import cors from 'cors'
import healthRouter from "./controller/routes/healthRouter";

export const app: Express = express()

app.use(express.json())
app.use(cors())
app.use(healthRouter);

app.listen(process.env.PORT || 3003, () => {
    console.log(`Server running on port ${process.env.PORT || 3003}`)
 })