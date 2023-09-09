import{ collection, addDoc, getDocs, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import {db} from "../../../firebase";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
  try{
    await prisma.$connect();
  } catch (err) {
    return Error("Error connecting to database");
  }
}

export const GET = async(req: Request, res: NextResponse) => {
  try{
    await main();
    const pins = await prisma.pins.findMany();
    return NextResponse.json({message: "Success", pins}, {status: 200});
  } catch (err) {
    return NextResponse.json({message: "Error", err}, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
}

export const POST = async(req: Request, res: NextResponse) => {
  try{
    const {latitude, longitude, description} = await req.json();
    
    await main();
    const pin = await prisma.pins.create({data: {latitude, longitude, description}});
    return NextResponse.json({message: "Success", pin},{status: 201});
  } catch (err) {
    return NextResponse.json({message: "Error", err}, {status: 500});
  }finally {
    await prisma.$disconnect();
  }
}