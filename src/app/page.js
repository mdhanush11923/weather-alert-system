"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/counter");
        const data = await res.json();
        setCount(data.count);
      } catch (err) {
        console.error("Failed to fetch count:", err);
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">ESP8266 Counter</h1>
      <p className="text-xl">Count: {count !== null ? count : "Loading..."}</p>
    </div>
  );
}
