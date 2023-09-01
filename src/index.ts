import { app } from "./app"
import { userRouter } from "./controller/routes/userRouter"
import { taskRouter } from "./controller/routes/taskRouter"
import { friendRouter } from "./controller/routes/friendRouter"

app.use('/user', userRouter )
app.use('/task', taskRouter )
app.use('/friend', friendRouter )
app.use('/unfriend', friendRouter )