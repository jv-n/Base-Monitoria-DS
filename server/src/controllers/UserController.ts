import { type Request, type Response, type NextFunction } from "express";

import { TaskRepository, UserRepository } from "../repositories";
import { UpdateUser, User } from "../DTOs";

const userRepository = UserRepository;

function parseId(id: string | string[] | undefined){
    return id ? (id as string) : ""
}

export class UserController {

    async create( req: Request, res: Response, next: NextFunction){
        try{
            const data = User.parse(req.body);

            const exists = await userRepository.findByEmail(data.email);
            if(exists){
                return next({
                    status: 400,
                    message: "User with this email already exists"
                })
            }

            const user = await userRepository.create(data);

            res.status(201).json(user);

        } catch (error){
            next(error);
        }
    }

    async findAll( req: Request, res: Response, next: NextFunction){
        try{
            const users = await userRepository.findAll();
            res.status(200).json(users);
        } catch(error){
            next(error)
        }
    }
    
    
    async findById( req: Request, res: Response, next: NextFunction){
        
        const id  = parseId(req.params.id)
        const user = await userRepository.findById(id);
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(201).json(user);

    }

    async findByEmail(req: Request, res: Response, next: NextFunction){
        
        const email  = parseId(req.params.email)
        const user = await userRepository.findByEmail(email);
        if(!user){
            return res.status(404).json({
                message: "User with this email not found"
            })
        }

        res.status(201).json(user);
    }

    async update(req: Request, res: Response, next: NextFunction){
        try{
            
            const id = parseId(req.params.id);
            const data = UpdateUser.parse(req.body)
            const exists = await userRepository.findById(id);
            if(!exists){
                return res.status(404).json({
                    message: "User not found"
                })
            }

            const user = await userRepository.update(id, data)
            res.status(200).json(user);

        } catch (error){
            next(error)
        }

    }


    async delete (req: Request, res: Response, next: NextFunction){
        try{
            
            const id  = parseId(req.params.id)
            const user = await userRepository.findById(id);
            if(!user){
                return res.status(404).json({
                    message: "User not found"
                })
            }

            const deletedUser = await userRepository.delete(id)

            res.status(200).json(deletedUser);
        } catch (error){
            next(error)
        }
    }

    async deleteAll (req: Request, res: Response, next: NextFunction){
        try{
            const users = await userRepository.deleteAll()
            res.status(200).json({
                message: "Deleted all users",
                users
            }) 

        }catch(error){
            next(error)
        }
    }

}

export default new UserController();