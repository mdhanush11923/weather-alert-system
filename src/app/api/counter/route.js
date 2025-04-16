let counter = 0;

export async function GET() {
  return Response.json({ count: counter });
}

export async function POST(req) {
  const body = await req.json();
  if (typeof body.count === "number") {
    counter = body.count;
    return Response.json({ message: "Updated", count: counter });
  } else {
    return new Response("Invalid", { status: 400 });
  }
}
