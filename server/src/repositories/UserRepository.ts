import { Prisma, type User } from "../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";

class UserRepository{

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return await prisma.user.create({ data })
    };
    async findAll(): Promise<User[]> {
        return await prisma.user.findMany();
    };

    /*
        Comentário que esqueci, você pode escolher retornar as tasks que o usuário possui
        ao adicionar esse include: { tasks: true } no findUnique (na verdade, você pode fazer isso no
        findMany também, mas por questões de legibilidade e um pouquinho de privacidade, faz mais sentido só colocar no findUnique)
    */

    async findById(id: string): Promise <User | null> {
        return await prisma.user.findUnique({ where: { id }, include: { tasks: true }});
    };
    async findByEmail(email: string): Promise<User|null>{
        return await prisma.user.findUnique({ where: { email }});
    };
    async update(id: string, data: Prisma.UserUpdateInput){
        return await prisma.user.update({ where: { id }, data});
    };
    
    async delete(id: string){
        return await prisma.user.delete({ where: { id }});
    };

    async deleteAll(): Promise<any>{
        return await prisma.user.deleteMany({})
    }

}

export default new UserRepository();