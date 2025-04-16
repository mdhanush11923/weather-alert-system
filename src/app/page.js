"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const countRef = ref(db, "/count");
    const unsubscribe = onValue(countRef, (snapshot) => {
      const val = snapshot.val();
      if (val !== null) setCount(val);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="text-center mt-10 text-3xl">
      📈 Count: <strong>{count}</strong>
    </div>
  );
}
