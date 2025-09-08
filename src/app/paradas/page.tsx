"use client"
import React from "react";
import { useRouter } from "next/navigation";

const stops = [
  {
    name: "Parque da Aclimação",
    distance: "1,1 km",
    tags: ["iluminacao"],
    amenities: ["Sombra", "Bebedouro", "Áreas abertas"],
  },
  {
    name: "Posto Shell Vergueiro",
    distance: "1,6 km",
    tags: ["banheiro", "iluminacao", "24h"],
    amenities: ["Banheiro", "Iluminação", "Lanchonete"],
  },
  {
    name: "Base PRF (simulado)",
    distance: "3,8 km",
    tags: ["24h", "iluminacao"],
    amenities: ["Atendimento 24h", "Área segura"],
  },
  {
    name: "Área de descanso Liberdade",
    distance: "2,4 km",
    tags: ["iluminacao"],
    amenities: ["Estacionamento", "Segurança"],
  }
];

export default function ParadasSeguras() {
  const router = useRouter();
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-[#0f2630]">
      <header className="w-full flex items-center justify-between px-4 py-4 shadow-sm bg-[#122d37] border-b border-[rgba(255,255,255,.12)]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl text-[#e9f1f4]">FELPI</span>
        </div>
        <button
          onClick={() => router.push("/analise")}
          className="px-7 py-2 rounded-full bg-[#e9f1f4] text-[#122d37] font-bold shadow hover:bg-[#bfe9f7] transition"
        >
          Voltar
        </button>
      </header>
      <main className="flex flex-col items-center justify-center w-full flex-1">
        <h2 className="text-center font-extrabold text-2xl md:text-3xl mb-6 text-[#e9f1f4] font-montserrat">
          Paradas Seguras — Região FIAP Aclimação
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 w-full">
          {stops.map((stop) => (
            <div
              key={stop.name}
              className="rounded-2xl bg-gradient-to-b from-[#173844] to-[#122d37] border border-[rgba(255,255,255,.12)] p-7 shadow-lg flex flex-col gap-3 items-center w-[300px] h-[200px]"
            >
              <div className="flex flex-col items-center justify-center w-full h-full">
                <span className="font-extrabold text-lg text-[#f2eadf] text-center">
                  {stop.name}
                </span>
                <span className="font-bold text-[#cfe1e6] text-center">{stop.distance}</span>
              </div>
              <div className="flex gap-2 justify-center mt-4 w-full">
                <button className="btn w-full h-12 px-6 py-3 rounded-full border border-[#f2eadf] bg-[#f2eadf] text-[#0b1416] font-semibold text-base shadow">
                  Rota
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
