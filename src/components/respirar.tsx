"use client";

export default function Respirar() {
  return (
    <section className="flex items-center justify-center min-h-screen px-4" id="rest">
      <div className="flex flex-col items-center gap-6 p-8 rounded-[var(--radius)] max-w-xl w-full">
        <h2 className="text-5xl sm:text-6xl font-bold text-accent mb-2" style={{textTransform: 'none'}}>Respire</h2>
        <p className="text-xl text-muted subtitle text-center">Iniciando sua jornada com o Felpi… mantenha uma respiração 4–2–6 por 10 segundos.</p>
      </div>
    </section>
  );
}
