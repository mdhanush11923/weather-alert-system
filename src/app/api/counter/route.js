// app/api/counter/route.ts
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { count } = body;

  console.log("✅ Received count:", count);

  return NextResponse.json({ message: "Count received", count });
}

export function GET() {
  return NextResponse.json({ message: "Send a POST request with count." });
}
