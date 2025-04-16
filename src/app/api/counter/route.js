let latestCount = 0;

export async function POST(request) {
  try {
    const body = await request.json();
    const { count } = body;

    if (typeof count !== "number") {
      return new Response(JSON.stringify({ error: "Invalid count" }), {
        status: 400,
      });
    }

    latestCount = count;
    return new Response(JSON.stringify({ message: "Count received", count }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error parsing JSON" }), {
      status: 400,
    });
  }
}

export async function GET() {
  return new Response(JSON.stringify({ count: latestCount }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
