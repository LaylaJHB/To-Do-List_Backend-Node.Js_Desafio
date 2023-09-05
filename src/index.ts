import { app } from "./app"
import { userRouter } from "./controller/routes/userRouter"
import { taskRouter } from "./controller/routes/taskRouter"

app.use('/user', userRouter )
app.use('/task', taskRouter )
console.log("oi")