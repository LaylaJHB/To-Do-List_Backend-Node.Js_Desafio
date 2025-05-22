import { app } from "./app"
import { userRouter } from "./controller/routes/userRouter"
import { taskRouter } from "./controller/routes/taskRouter"
import healthRouter from "./controller/routes/healthRouter";

app.use('/user', userRouter )
app.use('/task', taskRouter )
app.use('/health', healthRouter);
