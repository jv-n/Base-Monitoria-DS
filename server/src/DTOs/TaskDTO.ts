import { z } from "zod"

export const Task = z.object({
    title: z.string(),
    description: z.string().optional(),
    userId: z.string(),
    completed: z.boolean().optional(),
})

export const TaskUpdate = Task.partial()