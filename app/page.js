"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <h1>Hello, World!</h1>
      <p>Heure serveur/client actuelle : {now ? now.toLocaleTimeString() : "..."}</p>
      <p>
        Compteur : {count}{" "}
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
      </p>
    </div>
  );
}
