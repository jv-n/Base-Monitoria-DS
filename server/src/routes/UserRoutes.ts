import { Router } from "express";
import { UserController } from "../controllers";

const userRouter : Router = Router()

/*Comentário importante:
    A ordem das rotas aqui importa,
    uma rota /"fixo"/:parametro (exemplo: /find/:email) deve vir antes de
    uma rota /:parametro (exemplo: /:id) para o roteador não se "confundir"
    Além disso lembrem que não pode haver rotas do mesmo tipo com o mesmo metodo
    i.e. rota /:id e rota /:email, devem ser algo como /:id e /email/:id e etc. 
*/

userRouter.route('/').get(
    UserController.findAll
);

userRouter.route("/find/:email").get(
    UserController.findByEmail
);

userRouter.route('/:id').get(
    UserController.findById
);

userRouter.route('/').post(
    UserController.create
);

userRouter.route("/:id").patch(
    UserController.update
);

userRouter.route("/:id").delete(
    UserController.delete
);
userRouter.route('/').delete(
    UserController.deleteAll
)

export default userRouter;
