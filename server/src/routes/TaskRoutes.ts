import { Router } from "express";
import TaskController from "../controllers/TaskController";

const taskRouter : Router = Router();

/*Comentário importante:
    A ordem das rotas aqui importa,
    uma rota /"fixo"/:parametro (exemplo: /find/:email) deve vir antes de
    uma rota /:parametro (exemplo: /:id) para o roteador não se "confundir"
    Além disso lembrem que não pode haver rotas do mesmo tipo com o mesmo metodo
    i.e. rota /:id e rota /:email, devem ser algo como /:id e /email/:id e etc. 
*/

taskRouter.route('/').get(
    TaskController.findAll
)
taskRouter.route('/').post(
    TaskController.create
)

taskRouter.route('/user/:userId').get(
    TaskController.findByUser
)

taskRouter.route('/:id').get(
    TaskController.findById
)

taskRouter.route('/:id').patch(
    TaskController.update
)

taskRouter.route('/user/:userId').delete(
    TaskController.deleteByUser
)

taskRouter.route('/:id').delete(
    TaskController.delete
)

//rota pra facilitar testes não recomendo integrar ela no código
taskRouter.route('/').delete(
    TaskController.deleteAll
)

export default taskRouter