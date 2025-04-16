"use client";
import { useEffect, useState } from "react";

const CounterDisplay = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = () => {
      fetch("/api/counter")
        .then((res) => res.json())
        .then((data) => setCount(data.count))
        .catch((err) => console.error("Fetch error", err));
    };

    fetchCount();
    const interval = setInterval(fetchCount, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-3xl text-white p-10">
      📟 Current Counter: <span className="font-bold">{count}</span>
    </div>
  );
};

export default CounterDisplay;
