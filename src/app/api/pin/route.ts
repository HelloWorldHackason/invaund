import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function main(){
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("Could not connect to database");
  }
}

//get all pins
export const GET = async() => {
  try{
    await main();
    const pins = await prisma.pin.findMany();
    return NextResponse.json({message: "Success", pins}, {status: 200});
  } catch (err) {
    return NextResponse.json({message: "Error", err}, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
}

//set a pin
export const POST = async(req: Request, res: NextResponse) => {
  try{
    const {latitude, longitude, description, pictureSrc, permissionType} = await req.json();

    await main();
    const pin = await prisma.pin.create({
      data: {
        latitude,
        longitude,
        description,
        pictureSrc,
        permissionType
      }
    });

    return NextResponse.json({message: "Success", pin}, {status: 201});
  } catch (err) {
    return NextResponse.json({message: "Error", err}, {status: 500});
  }finally {
    await prisma.$disconnect();
  }
}