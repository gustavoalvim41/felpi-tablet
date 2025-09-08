"use client";
import { useRouter } from "next/navigation";

export default function Inicio() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/jornada");
    setTimeout(() => {
      router.push("/analise");
    }, 8000); // 8 segundos
  };

  return (
    <section
      className="flex items-center justify-center min-h-screen bg-panel"
      id="splash"
    >
      <div className="flex flex-col items-center gap-6 p-8 rounded-[var(--radius)] bg-soft">
        <h1
          className="text-8xl font-bold text-accent title"
          style={{ fontFamily: "Geist, Arial, sans-serif" }}
        >
          FELPI
        </h1>
        <p
          className="text-2xl font-extralight text-muted subtitle"
          style={{ fontFamily: "Geist, Arial, sans-serif" }}
        >
          Seu copiloto emocional
        </p>
        <button
          className="btn primary px-6 py-2 rounded-[var(--radius)] bg-white text-black font-bold shadow border border-[var(--line)]"
          type="button"
          onClick={handleStart}
        >
          Iniciar
        </button>
      </div>
    </section>
  );
}
