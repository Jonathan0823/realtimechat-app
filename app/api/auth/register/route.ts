import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const { username, email, password } = await req.json();
  try {
    const user = await prisma.user.create({
      data: {
        name: username,
        email,
        password,
      },
    });
    return NextResponse({user});
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went Wrong", { status: 500 });
  }
}