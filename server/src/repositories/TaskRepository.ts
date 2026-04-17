import { Prisma, type Task } from "../../generated/prisma/browser";
import { prisma } from "../../lib/prisma"

export class TaskRepository {
    async create(data: Prisma.TaskCreateInput): Promise<Task> {
        return await prisma.task.create({ data });
    }

    async findAll(): Promise<Task[] | null> {
        return await prisma.task.findMany();
    }

    async findById(id: string): Promise<Task | null> {
        return await prisma.task.findUnique({ where: { id } });
    }

    async findByUserId(userId: string): Promise<Task[] | null> {
        return await prisma.task.findMany({ where: { userId }})
    }

    async update(id: string, data: Prisma.TaskUpdateInput): Promise<Task | null> {
        return await prisma.task.update({ where: { id }, data });
    }

    async delete(id: string): Promise<Task | null> {
        return await prisma.task.delete({ where: { id } });
    }

    //use Promise <Task[]>
    // ou desative o eslint (quando for buildar) para a próxima linha
    async deleteByUser(userId: string): Promise<any> {
        return await prisma.task.deleteMany({ where: {userId} })
    }

    async deleteAll(): Promise<any>{
        return await prisma.task.deleteMany({})
    }
}

export default new TaskRepository();