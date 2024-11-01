"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";
// import nodeMailer from 'nodemailer'
import type { SifaUser } from "@prisma/client"


export const handleRegisterUser = async (data: FormData): Promise<{ error: boolean; message: string; } | undefined> => {
    try {
        const firstname = data.get("firstname")?.valueOf() as string
        const lastname = data.get("lastname")?.valueOf() as string
        const email = data.get("email")?.valueOf() as string || ""
        const phone = data.get("phone")?.valueOf() as string
        const state = data.get("state")?.valueOf() as string
        const otherStates = data.get("otherStates")?.valueOf() as string

        console.log({ firstname, lastname, email, phone, state, otherStates })

        const findUser = await prisma.user.findFirst({
            where: { phone: (`+234${phone.toLowerCase()}`).toLowerCase() },
            orderBy: { createdAt: "desc" }
        })
        if (findUser) {
            return { error: true, message: `This phone number is already registered with us. Please, check and try again` }
        }
        else {
            await prisma.sifaUser.create({
                data: { firstname, lastname, email: email.toLowerCase(), phone: `+234${phone.toLowerCase()}`, state: state === "Others" ? otherStates : state }
            })
            revalidatePath("/")
            return { error: false, message: `Congratulations ${firstname} ${lastname}. Your registration is successful.` }
        }
    } catch (error) {
        console.log({ error })
        return { error: true, message: `Something went wrong. We could not send the mail...Please, try again` };
    }
}

export const fetchUsers = async (): Promise<{ error: boolean; message: string; users: SifaUser[] } | undefined> => {
    try {
        const users = await prisma.user.findMany() as SifaUser[]
        if (users.length) {
            return { error: false, message: 'Users record retrieved successfully', users }
        }
        else {
            return { error: true, message: 'There is no record of registered users in this database', users }
        }
    } catch (error) {
        console.log('error', error)
        return { error: true, message: "Something went wrong. Please, try again.", users: [] }
    }
}