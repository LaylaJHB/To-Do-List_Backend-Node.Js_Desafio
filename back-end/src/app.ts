import express, {Express} from 'express'
import cors from 'cors'

export const app: Express = express()

app.use(express.json())
app.use(cors())



app.listen(process.env.PORT || 3003, () => {
    console.log(`Server running on port ${process.env.PORT || 3003}`)
 })