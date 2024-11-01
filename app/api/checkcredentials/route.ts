import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { compare } from "bcryptjs";

export async function POST (req: Request){
    try{
        const {email, password} = await req.json();
        const user = await prisma.user.findUnique({
            where: {email}
        });
        if (!user) {
            throw new NextResponse("No user found", {status: 404});
        }

        if (!user.password) {
            throw new NextResponse("User password is null", {status: 500});
        }

        const valid = await compare(password, user.password);

        if (!valid) {
            throw new NextResponse("Incorrect password", {status: 401});
        }

        return new NextResponse("Success", {status: 200});
    } catch {
       return new NextResponse("An error occurred. Please try again.", {status: 500});
    }
}