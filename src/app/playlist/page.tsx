"use client"
import React from "react";
import { useRouter } from "next/navigation";

const tracks = [
  {id:1, title:'Respira (Piano)', mood:'respiracao', duration:180, desc:'pulsos suaves, foco na saída do ar'},
  {id:2, title:'Horizonte',       mood:'calma',       duration:200, desc:'ambiente leve para relaxar'},
  {id:3, title:'Rota Serena',     mood:'calma',       duration:220, desc:'pads longos e estáveis'},
  {id:4, title:'Focus Drift',     mood:'foco',        duration:240, desc:'batidas mínimas para concentração'},
  {id:5, title:'Maré Baixa',      mood:'noite',       duration:210, desc:'grave macio para desacelerar'},
  {id:6, title:'Neblina',         mood:'respiracao',  duration:190, desc:'respiração guiada sutil'},
];

export default function Playlist() {
  const router = useRouter();
  function fmt(secs: number) {
    const min = Math.floor(secs / 60);
    const s = secs % 60;
    return `${min}:${s.toString().padStart(2, "0")}`;
  }
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
          Playlist Calmante
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 w-full">
          {tracks.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl bg-gradient-to-b from-[#173844] to-[#122d37] border border-[rgba(255,255,255,.12)] p-7 shadow-lg flex flex-col gap-3 items-center w-[320px] h-[180px]"
            >
              <div className="flex flex-col items-center justify-center w-full">
                <span className="font-extrabold text-lg text-[#f2eadf] text-center">
                  {t.title}
                </span>
                <span className="text-xs text-[#e9f1f4] mt-1 text-center">
                  {t.mood.toUpperCase()} • {fmt(t.duration)}
                </span>
                <span className="text-sm text-[#b8c7cd] mt-1 text-center">
                  {t.desc}
                </span>
              </div>
              <div className="flex gap-2 justify-center mt-4 w-full">
                <button className="btn w-full h-10 px-4 py-2 rounded-full border border-[#f2eadf] bg-[#f2eadf] text-[#0b1416] font-semibold text-base shadow">
                  Tocar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
