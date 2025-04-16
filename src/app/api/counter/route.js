let latestCount = 0;

export default function handler(req, res) {
  if (req.method === "POST") {
    const { count } = req.body;
    if (typeof count === "number") {
      latestCount = count;
      console.log("Received count:", count);
      return res.status(200).json({ ok: true, latestCount });
    }
    return res.status(400).json({ error: "Invalid payload" });
  }

  // For GET requests, return the current count
  res.status(200).json({ latestCount });
}
