import userRouter from "./UserRoutes";
import taskRouter from "./TaskRoutes";

import { Router } from "express";

const routes : Router = Router();

routes.use('/users', userRouter)
routes.use('/tasks', taskRouter)

export default routes