"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(null);
  const [now, setNow] = useState(null);
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let unsub;
    let cancelled = false;
    (async () => {
      const claude = window.claude;
      if (!claude) return;
      const db = await claude.use("db");
      if (!db || cancelled) return;
      setDbReady(true);
      const ref = db.doc("counter/main");
      unsub = ref.onSnapshot((snap) => {
        const data = snap.data();
        setCount(data && typeof data.value === "number" ? data.value : 0);
      });
    })();
    return () => {
      cancelled = true;
      if (unsub) unsub();
    };
  }, []);

  async function handleIncrement() {
    const claude = window.claude;
    if (!claude) return;
    const db = await claude.use("db");
    if (!db) return;
    const ref = db.doc("counter/main");
    const snap = await ref.get();
    const data = snap.data();
    const current = snap.exists && typeof data.value === "number" ? data.value : 0;
    await ref.set({ value: current + 1 });
  }

  return (
    <div>
      <h1>Hello, World!</h1>
      <p>Heure actuelle : {now ? now.toLocaleTimeString() : "..."}</p>
      <p>
        Compteur (persisté via la base de l&apos;Artifact) :{" "}
        {count === null ? (dbReady ? "..." : "indisponible ici") : count}{" "}
        <button onClick={handleIncrement} disabled={!dbReady}>
          +1
        </button>
      </p>
    </div>
  );
}
