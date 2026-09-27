"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(null);
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch("/api/counter")
      .then((res) => res.json())
      .then((data) => setCount(data.count));
  }, []);

  async function handleIncrement() {
    const res = await fetch("/api/counter", { method: "POST" });
    const data = await res.json();
    setCount(data.count);
  }

  return (
    <div>
      <h1>Hello, World!</h1>
      <p>Heure serveur/client actuelle : {now ? now.toLocaleTimeString() : "..."}</p>
      <p>
        Compteur (persisté en SQLite) : {count === null ? "..." : count}{" "}
        <button onClick={handleIncrement}>+1</button>
      </p>
    </div>
  );
}
