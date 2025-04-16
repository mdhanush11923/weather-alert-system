let latestCount = 0;

export async function POST(request) {
  latestCount++; // <-- increment on backend
  return new Response(
    JSON.stringify({ message: "Count received", count: latestCount }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function GET() {
  return new Response(JSON.stringify({ count: latestCount }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
