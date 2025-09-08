"use client";
import { useRouter } from "next/navigation";

const emergencyPhones = [
  {
    label: "Polícia",
    desc: "Ocorrências / Segurança",
    number: "190",
  },
  {
    label: "SAMU",
    desc: "Atendimento Médico",
    number: "192",
  },
  {
    label: "Bombeiros",
    desc: "Incêndio / Resgate",
    number: "193",
  },
];

const supportPhones = [
  {
    label: "Psicólogo 24h",
    desc: "Atendimento imediato",
    badge: "Disponível",
    number: "0800 000 000",
    tel: "+550800000000",
  },
  {
    label: "Mãe",
    desc: "(11) 98888-0000",
    tel: "+5511988880000",
  },
  {
    label: "Pai",
    desc: "(11) 97777-0000",
    tel: "+5511977770000",
  },
  {
    label: "Amigo de confiança",
    desc: "(11) 96666-0000",
    tel: "+5511966660000",
  },
];

export default function Emergencia() {
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
        <div className="wrap w-full max-w-3xl mx-auto grid gap-8 mt-8">
          <h1 className="title font-montserrat font-extrabold text-2xl md:text-3xl text-center mb-2 text-[#e9f1f4]">Atendimento de Emergência</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-[#122d37] border border-[rgba(255,255,255,.12)] rounded-2xl p-6">
              <h3 className="section-title font-bold text-lg text-[#e9f1f4] mb-2">Telefones Úteis</h3>
              {emergencyPhones.map((item) => (
                <div className="row grid grid-cols-[1fr_auto] items-center gap-3 p-3 border border-[rgba(255,255,255,.12)] rounded-xl bg-[rgba(255,255,255,.04)] mb-2" key={item.label}>
                  <div>
                    <strong className="text-[#e9f1f4]">{item.label}</strong><br />
                    <small className="subtitle text-[#b8c7cd]">{item.desc}</small>
                  </div>
                  <a
                    className="btn primary px-4 py-2 rounded-full bg-[#f2eadf] text-[#0b1416] font-bold border border-[rgba(255,255,255,.12)] shadow"
                  >
                    {item.number}
                  </a>
                </div>
              ))}
            </div>
            <div className="card bg-[#122d37] border border-[rgba(255,255,255,.12)] rounded-2xl p-6">
              <h3 className="section-title font-bold text-lg text-[#e9f1f4] mb-2">Apoio Emocional & Família</h3>
              {supportPhones.map((item) => (
                <div className="row grid grid-cols-[1fr_auto] items-center gap-3 p-3 border border-[rgba(255,255,255,.12)] rounded-xl bg-[rgba(255,255,255,.04)] mb-2" key={item.label}>
                  <div>
                    <strong className="text-[#e9f1f4]">{item.label}</strong>
                    {item.badge && (
                      <span className="badge ml-2 px-2 py-1 rounded-full border border-[rgba(255,255,255,.12)] bg-[rgba(255,255,255,.06)] font-semibold text-xs text-[#e9f1f4]">{item.badge}</span>
                    )}
                    <br />
                    <small className="subtitle text-[#b8c7cd]">{item.desc}</small>
                  </div>
                  <a
                    className="btn primary px-4 py-2 rounded-full bg-[#f2eadf] text-[#0b1416] font-bold border border-[rgba(255,255,255,.12)] shadow"
                  >
                    {item.tel ? "Ligar" : item.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
