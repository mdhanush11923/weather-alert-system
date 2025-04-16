"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [count, setCount] = useState();

  useEffect(() => {
    fetch("/api/counter")
      .then((res) => res.json())
      .then((data) => {
        if (data.count) {
          setCount(data.count);
        }
      });
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">🔢 ESP8266 Counter</h1>
      {count !== null ? (
        <p className="text-2xl">Current count: {count}</p>
      ) : (
        <p>Loading count...</p>
      )}
    </main>
  );
}
