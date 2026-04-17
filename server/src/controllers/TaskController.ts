import { type Request, type Response, type NextFunction } from "express";

import { TaskRepository, UserRepository } from "../repositories";
import { Task, TaskUpdate } from "../DTOs";
import { parse } from "node:path";

const taskRepository = TaskRepository;

function parseId(id: string | string[] | undefined): string {
    return id ? (id as string) : "";
}

export class TaskController {

    /*
        Explicação rápida dessa leve diferença no Task Controller
        Como fiz um modelo onde task precisa ser obrigatoriamente de algum usuário
        a função create, do repository alem dos dados de títulos precisa conectar a task
        a um user existente, por isso, precisa de um connect (que conecta duas funções diferentes no prisma)
        Além disso, para evitar erros com usuários não existentes, faz-se um tratamento de erros antes de
        criar a tak verificando se o usuário existe
    */

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = Task.parse(req.body);
            const userExists = await UserRepository.findById(data.userId)
            if(!userExists) return res.status(404).json({message: "User doesn't exists"})
            const task = await taskRepository.create({
                ...data,
                user: { connect: { id: data.userId } },
            });
            res.status(201).json({
                message: "Task created",
                task
            });
        } catch (error) {
            next(error);
        }
    }

    async findAll( req: Request, res: Response, next: NextFunction) {
        try {
            const tasks = await taskRepository.findAll();
            res.status(200).json(tasks);
        } catch (error) {
            next(error);
        }
    }

    async findByUser (req: Request, res:Response, next: NextFunction){
        try{
            const userId = parseId(req.params.userId);
            const tasks = await taskRepository.findByUserId(userId);
            if(!tasks) return res.status(404).json({message: "User not found/hasn't tasks"})
            res.status(200).json(tasks)

        } catch(error){
            next(error)
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(req.params.id);
            const task = await taskRepository.findById(id);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(req.params.id);
            const data = TaskUpdate.parse(req.body);
            const exists = await taskRepository.findById(id);
            if (!exists) {
                return res.status(404).json({ message: "Task not found" });
            }
            const task = await taskRepository.update(id, data);
            res.status(200).json({
                message: "Task updated",
                task
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(req.params.id);
            const exists = await taskRepository.findById(id);
            if (!exists) {
                return res.status(404).json({ message: "Task not found" });
            }
            const task = await taskRepository.delete(id);
            res.status(200).json({
                message: "Task deleted",
                task
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteByUser(req: Request, res: Response, next: NextFunction){
        try{
            const userId = parseId(req.params.userId);
            const existsTasks = await taskRepository.findByUserId(userId)
            if(!existsTasks) return res.status(404).json({message: "Tasks not found for user"})
            const tasks = await taskRepository.deleteByUser(userId);
            res.status(200).json({
                message: "Tasks deleted",
                tasks
            })
        } catch(error){

        }
    }

    async deleteAll(req: Request, res: Response, next: NextFunction){
        try{
            const tasks = await taskRepository.deleteAll();
            res.status(200).json({
                message: "deleted all tasks",
                tasks
            })
        }catch(error){
            next(error)
        }
    }
}

export default new TaskController();
