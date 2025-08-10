import { z } from "zod";

export const CreateUserSchema = z.object({
    email: z.email(),
    password: z.string().min(3).max(30),
    name: z.string().min(3).max(30),
})

export const SignInUserSchema = z.object({
    password: z.string().min(3).max(30),
    email: z.email()
})

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(30),
})
