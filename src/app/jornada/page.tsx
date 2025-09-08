"use client";
import { useEffect, useState } from "react";

export default function Respirar() {
  const fullText = "Iniciando sua jornada com o Felpi… mantenha uma respiração 4–2–6 por 10 segundos.";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 90);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex items-center justify-center min-h-screen px-4" id="rest">
      <div className="flex flex-col items-center gap-6 p-8 rounded-[var(--radius)] max-w-xl w-full">
        <h2 className="text-5xl sm:text-6xl font-bold text-accent mb-2 animate-fade-up" style={{textTransform: 'none'}}>Respire</h2>
        <p className="text-xl text-muted subtitle text-center font-mono whitespace-pre">
          {displayed}
          <span className="inline-block w-2 h-6 align-middle bg-accent animate-pulse ml-1" />
        </p>
      </div>
    </section>
  );
}
