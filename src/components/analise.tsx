export default function Analise() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-panel">
      {/* Header FELPI fixo no topo */}
      <header className="w-full flex items-center justify-between px-4 py-5 shadow-sm bg-[#122d37] border-b border-[rgba(255,255,255,.12)]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl text-[#e9f1f4]">FELPI</span>
        </div>
        <button className="px-7 py-2 rounded-full bg-[#e9f1f4] text-[#122d37] font-bold shadow hover:bg-[#bfe9f7] transition">
          Início
        </button>
      </header>
      <main className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="w-full flex justify-center mb-6">
          <p className="text-lg md:text-xl text-[#e9f1f4] italic font-normal text-center leading-relaxed">
            “Acredite em você! O caminho é feito de pequenos passos.”
          </p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl p-4 md:p-6">
          <section className="flex flex-col justify-center items-center bg-[#122d37] border border-[rgba(255,255,255,.12)] rounded-xl p-3 min-h-[440px] w-full">
            <div className="flex flex-col md:flex-row items-center gap-10 w-full">
              {/* Gráfico circular SVG aumentado */}
              <div className="relative w-full max-w-[28rem] h-[28rem] flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 420 420" className="block">
                  <circle
                    cx="210"
                    cy="210"
                    r="170"
                    stroke="#183c4a"
                    strokeWidth="44"
                    fill="none"
                  />
                  <circle
                    cx="210"
                    cy="210"
                    r="170"
                    stroke="#7de3f3"
                    strokeWidth="44"
                    fill="none"
                    strokeDasharray="1068"
                    strokeDashoffset="267"
                    style={{ transition: 'stroke-dashoffset 1s' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white">Neutro</span>
                  <span className="text-base text-[#e9f1f4] mt-2 text-center">
                    FELPI está aqui com você
                  </span>
                </div>
              </div>
              {/* Lista de estados */}
              <div className="flex flex-col gap-5 min-w-[220px] w-full max-w-sm">
                {[
                  { label: 'Calma', value: 62, color: 'bg-[#7de3f3]' },
                  { label: 'Foco', value: 58, color: 'bg-[#7de3f3]' },
                  { label: 'Estresse', value: 34, color: 'bg-[#e9f1f4]' },
                  { label: 'Sonolência', value: 22, color: 'bg-[#183c4a]' },
                  { label: 'Tristeza', value: 18, color: 'bg-[#183c4a]' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <span className="w-24 text-[#e9f1f4] text-base">
                      {item.label}
                    </span>
                    <div className="h-4 w-28 rounded-full bg-[#183c4a] flex items-center">
                      <div
                        className={`h-4 rounded-full ${item.color}`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                    <span className="text-[#e9f1f4] font-mono text-base">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="flex flex-col justify-center items-center bg-[#122d37] border border-[rgba(255,255,255,.12)] rounded-xl p-4 min-h-[400px] w-full">
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-[#e9f1f4]">
                  Nível emocional
                </span>
                <span className="text-lg font-bold text-[#e9f1f4]">Baixo</span>
              </div>
              <div className="w-full h-4 rounded-full bg-gradient-to-r from-[#f87171] via-[#fbbf24] to-[#34d399] relative mb-2">
                <div
                  className="absolute top-0 left-[18%] h-4 w-1 bg-white rounded-full"
                  style={{ boxShadow: '0 0 2px #fff' }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-[#e9f1f4] text-sm font-medium">
                <span>Baixo</span>
                <span>Médio</span>
                <span>Alto</span>
              </div>
            </div>
            <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="w-full py-3 rounded-full bg-[#e9f1f4] text-[#122d37] font-bold shadow hover:bg-[#bfe9f7] transition">
                Chamadas de Emergência
              </button>
              <button className="w-full py-3 rounded-full bg-[#e9f1f4] text-[#122d37] font-bold shadow hover:bg-[#bfe9f7] transition">
                Paradas Seguras
              </button>
              <button className="w-full py-3 rounded-full bg-[#e9f1f4] text-[#122d37] font-bold shadow hover:bg-[#bfe9f7] transition">
                Guia de Respiração
              </button>
              <button className="w-full py-3 rounded-full bg-[#e9f1f4] text-[#122d37] font-bold shadow hover:bg-[#bfe9f7] transition">
                Playlist Calmante
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
