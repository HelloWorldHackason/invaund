import React from "react";
import firestore  from "../../firebase";
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await firestore.collection("publicData").get();
  if (res.empty) return [];
  console.log(res.docs);
  return NextResponse.json(res.docs.map((doc : any) => doc.data()));
}